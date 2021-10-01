---
title: Lifetime is so goodd!!!
date: 2021-06-10
---

The lifetime parameter in a function/object is something that I had never seen before (I have used a lot of programming languages though). The way that ***Rust***(Yes, I will bold and italicize every time I write ***Rust***) has the concept of lifetime wasn't that initiative to me at first; I spent a good amount of time trying to understand the basics of lifetime and here is what I have understood; these are just the surface of a mammoth iceberg. 

Lifetime are useful when we pass arguments through reference. Lifetime parameters are required to tell the compiler in *whose* lifetime should the value returned by reference should exist in. Before talking about  lifetimes let's look at what a dangling pointer is. 

Let's first look at a C++ example:
```cpp
#include <iostream>

int& foo(int& x, int& y) {
    if (x < y) {
        return x;
    } else {
        return y;
    }
}
int main() {
    int a = 20;
    int *p;
    {
        int b = 10;
        p = &foo(a,b);
        std::cout << &b << std::endl;
    }
    std::cout << p << std::endl;
}
```
```
Output: 0x7ffee8693884
	0x7ffee8693884
```  
 The above problem looks deliberate and it is; this is a classic example of dangling pointer. The pointer `*p` refers to the memory address the `b` used to point to. This can sort of behavior is undefined, in my particular system `*p` points to the original value of `b`. 

Now, let's see how   ***Rust*** hopes to solve such dangling pointers. Let's look at an example:

```rust
fn foo(x: &i32, y: &i32) -> &i32 {
    if x < y {
        x
    } else {
        y
    }
}

fn main() {
    let k: i32 = 100;
    let _x;
    {
        let p: i32 = 200;
        _x = foo(&k, &p);
    }
    println!("{}",_x);
}
```
This will not compile. The compiler will give us an error that  the lifetime of the reference is ambiguous as ***Rust*** doesn't know what the lifetime of the reference is. Let's add the lifetime, shall we?

Lifetime is the, as the name suggests, tells the compiler up to whose lifetime the returned value should exist. Lifetime is declared as a generic parameter in function name: `fn foo<'a>`. This tells the compiler that there is a lifetime `'a ` such that the reference returned exists in it. It's complicated for me to explain it, here is an example:

```rust
fn foo<'a>(x: &'a i32, y: &'a i32) -> &'a i32 {
    if x < y {
        x
    } else {
        y
    }
}
fn main() {
    let k: i32 = 100;
    let _x;
    {
        let p: i32 = 200;
        _x = foo(&k, &p);
    }
    println!("{}",_x);
}
```
The above code tells the compiler: Please find a lifetime `'a` such that no dangling pointer is formed. Here, we are explicitly saying the compiler that there is a lifetime `'a` such that the entire program is valid. Here, it look fine. The function `foo()` gets two reference and since k is smaller than p, returns reference to `k` right? Sadly this is wrong.

Remember the time I said ***Rust*** is strict, I really meant it. Since all three of them ,the two parameters and the reference return,have been explicitly declared to be available in a lifetime `'a`, the compiler searches for such lifetime. However, this isn't available here. The variable `p` goes out of scope at the end of the closing curly bracket after the two lines, and `_x` is still being used after the lifetime of `p`, this might cause a dangling pointer, so ***Rust*** just gives an Error!! Even though `_x` points to `k`, the lifetime of reference returned to `_x` is the lifetime of smallest parameter that is passed in the function.  

So to fix this code, we could have restructure the code:
```rust
fn foo<'a>(x: &'a i32, y: &'a i32) -> &'a i32 {
    if x < y {
        x
    } else {
        y
    }
}
fn main() {
    let k: i32 = 100;
    let _x;
    let p: i32 = 200;
    _x = foo(&k, &p);
    println!("{}",_x);
}
```
This will work as `_x` is available for the entire lifetime of the smallest lifetime of the parameter to the function from where it gets its reference return. 

Or, something like this.
```rust
fn foo<'a>(x: &'a i32, y: &'a i32) -> &'a i32 {
    if x < y {
        x
    } else {
        y
    }
}
fn main() {
    let k: i32 = 100;
    let p;
    let x_ref;
    {
        p: i32 = 200;
        x_ref = foo(&k, &p);
    }
    println!("{}", x_ref);
}
```
Here, the returned reference exists for the entire lifetime of `k`.

The lifetime of returned reference type should be one of parameter's lifetime. If the lifetime on the returned type isn't the lifetime one of the function parameter, it is an error.

This is a very bad, high level overview of lifetime, great amount of features about lifetime are yet to be discussed. You can read more about it from the references below:
 -  <a href="https://doc.rust-lang.org/book/ch10-03-lifetime-syntax.html" target='_blank'>The Rust Programming Language Book (Chapter 10)</a> 
 - <a href="https://doc.rust-lang.org/rust-by-example/scope/lifetime/explicit.html" target='_blank'>Rust by Example (Explicit Annotations)</a>  
