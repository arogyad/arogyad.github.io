---
title: Autograd in Rust
date: Aug 12, 2021
author: Arogya Dahal
published: True
---

# Introduction
In my quest for learning ***Rust***, I had started writing a machine learning library. Machine learning is pretty interesting , but deep learning takes the cake when it comes to the weirdness. One main thing that is required for a deep learning library is a auto differentitation engine. An autodiff engine is a piece of code that sits on top and creates a graph for how the backward propagation should be done. I wanted a autograd library for my project so tried writing it. I was more interested in dynamic graphsish autograd style something like that of <a href="https://pytorch.org/" target='_blank'> pytorch </a> rather than the static graph of tensorflow. Pytorch specifically creates a <a href="https://en.wikipedia.org/wiki/Directed_acyclic_graph" target='_blank'>DAG graph</a>. The reverse topilogically sorted Directed Graph (DAG) is ,then, used to create a graph for backward propagation. <a href="https://pytorch.org/tutorials/beginner/blitz/autograd_tutorial.html" target="_blank">Here</a> is a link for further reading on the autograd of pytorch. This blog is quite long as there is a lot to talk about.

# Background
The implementation is heavly inspired from <a href="https://github.com/geohot/tinygrad/" target="_blank"> tinygrad </a>  and pytorch. The implementation shown here is an extremely small part, and a great deal of other fields and methods are yet to be added. Here, we will be creating a autograd library in rust. We will be using `f64` values, but we can easily replace that with anything else. The use of `f64` here is just for easier explanation. One difference when compared to the tinygrad's implementation is that, due to the nature of no garbage collection language, we don't need to store the `parents` and the `saved_tensor` in two objects, but we will get to that point in the future.

# "Tensor" Class
It gives me immense guilt to call the "Tensor" struct here as the "Tensor" as the bar for something to be called a tensor is too high. It is nothing but the absolute minimum that we require to create and show a autograd engine. The "Tensor" struct is defined as such:
```rust
// /src/tensor.rs/Tensor
pub struct Tensor<'a> {
    pub data: f64,
    pub grad: Cell<f64>,
    pub _ctx: Option<Box<&'a dyn Function>>,
}
```
This isn't much but this does the work done, atleast for the explanation.  The `_ctx` is the context field, which stores the process of creation of the `self` tensor, other are self explanatory. You might be wondering why the `_ctx` is a `Box<&' dyn Function>` and not a generic-it is easier to read and simpler this way, using generics will increase the complexity without much gain (also I don't know if will generics work). The `Tensor` declares a `new` static function which is self explantory. You can check out the code on my <a href="https://github.com/arogyad/autograd" target="_blank">github</a>. We will talk about other functions as we go along the way.

## Where does the "_ctx" comes from ?!
The `_ctx` is an object which implements the `Function` trait. The function trait is defined as such
```rust
// /src/ftrait.rs/Function
pub trait Function {
    fn apply(&self) -> Tensor;
    fn backward(&self, grad: f64) -> [f64; 2];
    fn forward(&self) -> f64;
    fn parents(&self) -> [&Tensor; 2];
}
```
The `parents` function returns the parent inside of the struct, which implements the `Function` trait. This is important for the creation of graph during backward propagation. The function trait here is defined for binary operations, but we could have made it for other operations as well by using maybe a const generic type( `<const X: i32>` )?! `Apply` performs the `forward` function and returns the required tensor containing its own context(We will see this later). The `backward` function performs the backward computation,i.e it calculates the grad based on the incoming `grad`(chain rule). We will implement the `Function` trait for multiplication type. We won't be overriding any operator functions such as `*` operator. This will show us the bare metal, how things are working. Lets look at the implementation of `Mul`. `Forward` and `Backward` are trivial so we will be looking at the `apply` function's implementation. `Mul` struct is defined as
```rust
// /src/Function.rs/Mul
pub struct Mul<'a> {
    parents: [&'a Tensor<'a>; 2],
}

// Inside the impl block of Mul for Function
fn apply(&self) -> Tensor {
    let _ret = Tensor::new(self.forward(), Some(Box::new(self)));
    _ret
} 
``` 
So, `apply` return a `Tensor` with the value from the `self.forward()` and `_ctx` equal to `Some(Box::new(self))`. The context stores the its `parents`, this is how we know where a `Tensor` come from, and this is how we can create a backward graph.

# Backward
The backward pass consists of the creation of a DAG graph using the final tensor, and going up the graph and supplying everyone with their `grad` value. A filter would be good to limit whose grad to calculate,pass in the `backward` function,so this is left to the reader as an exercise(Calculate the grad if require_grad is `true`?). We <a href="https://en.wikipedia.org/wiki/Topological_sorting" target="_blank">topo</a> sort it. 
```rust
fn _deepwalk(node: &'a Tensor<'a>, nodes: &'_ mut Vec<&'a Tensor<'a>>) {
    if let Some(n) = &node._ctx {
        for i in n.parents() {
            Self::_deepwalk(i, nodes);
        }
        nodes.push(node);
    }
}
```
This is a recursive toposorter?(Completely inspired from<a href="https://github.com/geohot/tinygrad/" target="_blank"> here</a>) which looks readable, unlike the one written in python(no hard feelings! I am extremely bad at reading python), and is pretty good without a filter for visited(I didn't get it why the visited is necessary there, I cannot read python so I am having a hard time understanding it). And, we calculate the backward pass gradients and provide it to the necessary `Tensor`. I don't want this to be page to be conjusted with codes, so please check it out on the github repo. The loop in the `backward` function of the `Tensor` loops in reverse topo order every tensor inside the vec returned by `self.walk()`(Refer to github). We then apply the chain rule with every tensor getting it's grad from the tensor after(or is it before?) it. This is how the autograd process works, pretty simple; however, my explanation might have made it harder. We can expand this to use a `array` or `vec` or arrayfire's array, which is the library I am using for my project <a href="https://github.com/arogyad/Candle" target="_blank">Candle</a>. And finally lets look at how all this things occur. Lets write a test for a linear equation with the comments acting as the explanation. Thank you for reading!!
```rust
#[test]
fn linear_test() {
    // We create two tensors
    let a = Tensor::new(2.0, None); // '_ctx' as None as this is formed by you and me not an operation 
    let b = Tensor::new(3.0, None); // Same

    // Lets create a multiplication context which will contain tensor 'a' and 'b' as its parents
    let c_ctx = Mul::new([&a, &b]);

    // Lets create the Tensor with the context 'c_ctx'
    let c = c_ctx.apply();

    // Let's create the bais 
    let d = Tensor::new(4.0, None); // Same as before the `_ctx` as None

    // Lets create a addition context and apply it to obtain the final output y
    let e_ctx = Add::new([&c, &d]);
    let mut e  = e_ctx.apply();

    // Backpropagation
    e.backward();

    // Will this assertion work?!
    assert!(a.grad.get() == 3.0); // The grads are inside Cell btw
    assert!(b.grad.get() == 2.0); // It was done to make the grad changing easier
} 
```
