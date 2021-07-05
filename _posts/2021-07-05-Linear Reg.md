---
published: true
title: Simple Linear Regression For Simple Soul
layout: post
---
Okay! Linear regression, the basic of the regression analysis. There is surely another better implementation of linear regression in some other language that is faster and more intuitive than the one that we will be writing. So why would anyone want another linear regression implementation?. I don't have an answer to be honest, this is from a project that I am currently working in and I thought maybe I could share it here, as there lacked a connection between the implementation side and the mathematical side of linear regression.  Here we will be looking at the maths and at the same time implement that maths into code. The codes will be choppy as this is an initial prototype (classic excuse) so sorry about that!!

# Maths?!
The <a href="https://en.wikipedia.org/wiki/Linear_regression">wikipedia page</a> for linear regression is the best summary on linear regression. The maths is concrete and clear to understand as it needs only the basic understanding of matrices and linear equation. Okay! So let's get into just a bit of maths and then a bit of coding in between.

Linear regression ,as the name suggests, predicts the relation between a dependent variable $$y$$ based on a single or set of explanatory variables $$x$$ under the assumption that the data is linear.  We know that a linear equation is given as: $$y = mx + c$$ so in a linear regression we are trying to predict the $$m$$ parameter which I prefer to call $$\theta$$ as it is just the slope. So linear regression boils down to finding the slope of the given data. This is everything that you need to know tbh, other things just naturally follow as we code along. 

# Maths into C<span style="font-size: 0.5em;">ode</span> 
This blog will produce the most basic form of linear regression. Our optimizer will be <a href="https://en.wikipedia.org/wiki/Gradient_descent"> gradient descent method </a> , which is just betting against the gradient until we win or go bust. Quick formula for gradient descent (I love  writing formula in $$\LaTeX$$, sorry cannot help).

<span style="display:table;margin:0 auto;">$$x_{n+1} = x_n - \gamma_n \varDelta F(\relax{x})$$</span>

Here, $$\varDelta F\relax(x)$$ is the gradient of the function $$F \relax(x)$$, $$\gamma_n$$ is a often called a step-size. SGD is used all over the place, and it is also the father of other optimization methods like Adam. Enough with this jargon lets get writing.

Okay! So the first thing that we need is basic amount of matrix algebra. Lets say we have want to predict a dependent variable $$y$$ based on explanatory variables $$X$$. Lets say that we have $$p$$ numbers of features that we can predict our results from and there are $$n$$ number of samples. 

So the explanatory matrix ($$X$$) can be given as,

<span style="display:table;margin:0 auto;">
$$
X = {
\begin{pmatrix}
x_{11} & \cdots & x_{1p} \\
x_{21} & \cdots & x_{2p} \\
\vdots & \ddots & \vdots \\
x_{n1} & \cdots & x_{np}
\end{pmatrix}
}
$$</span>

The size of the matrix $$X$$ is $$n \times p$$ on wikipedia you will see a extra column at the beginning consisting of all $$1s$$ but we won't struggle with that here as this is a very simple implementation. In computer terms, $$X$$ is what we feed to the model to predict from. 

Lets define the $$y$$ now. So there can only be one prediction to a series of input features so the shape of prediction(dependent) matrix is $$n \times 1.$$ In matrix terms,

<span style="display:table;margin:0 auto;">
$$
y = {
\begin{pmatrix}
y_1 \\
y_2 \\
\vdots \\
y_n
\end{pmatrix}
}
$$
</span>

This is the labels that we will be sending to the model to learn from and also the prediction we get from the trained model.
Now the part that we predict, $$\theta$$. The $$\theta$$ is of shape $$p \times 1$$ so that we can multiply it with $$X$$. As for two matrices to be able to multiply with each other the number of rows on second matrix must be equal to number of columns on second matrix.  So, as a tradition here is the matrix representation.

<span style="display:table;margin:0 auto;">
$$
\theta = {
\begin{pmatrix}
\theta_1 \\
\theta_2 \\
\vdots \\
\theta_p
\end{pmatrix}
}
$$</span>

In this implementation we will be ignoring the $$\varepsilon$$ - error variable. Now combining all these things together, our final equation is given as:

<span style="display:table;margin:0 auto;">
$$y = X\theta$$
</span>

<span style="display:table;margin:0 auto;">
$${
\begin{pmatrix}
y_1 \\
y_2 \\
\vdots \\
y_n
\end{pmatrix}
} =
{
\begin{pmatrix}
x_{11} & \cdots & x_{1p} \\
x_{21} & \cdots & x_{2p} \\
\vdots & \ddots & \vdots \\
x_{n1} & \cdots & x_{np}
\end{pmatrix}
} {
\begin{pmatrix}
\theta_1 \\
\theta_2 \\
\vdots \\
\theta_p
\end{pmatrix}
}
$$
</span>

<span style="display:table;margin:0 auto;">
$$
\begin{pmatrix}
y_1 \\
y_2 \\
\vdots \\
y_n
\end{pmatrix}=
\begin{pmatrix}
x_{11}\theta_1+ x_{12}\theta_2+\cdots+x_{1p}\theta_p \\
x_{21}\theta_1+x_{22}\theta_2+\cdots+x_{2p}\theta_p \\
\vdots \\
x_{n1}\theta_1+x_{n2}+\cdots+x_{np}\theta_p
\end{pmatrix}
$$</span>

This above equation is what we are trying to predict and the shape of the matrix is $$n \times 1$$. I am sorry about being unable to name the equation, I am unable to figure out the way to do it. So this function passes through origin,but this isn't optimal. The process of adding a y-intercept will be left for the reader as an exercise. Here is a hint though.

<span style="display:table;margin:0 auto;">
$$y = X\theta + \varepsilon$$
</span>

<span style="display:table;margin:0 auto;">
$$
\begin{pmatrix}
y_1 \\
y_2 \\
\vdots \\
y_n
\end{pmatrix} = 
\begin{pmatrix}
x_{11} & \cdots & x_{1p} \\
x_{21} & \cdots & x_{2p} \\
\vdots & \ddots & \vdots \\
x_{n1} & \cdots & x_{np}
\end{pmatrix} 
\begin{pmatrix}
\theta_1 \\
\theta_2 \\
\vdots \\
\theta_p
\end{pmatrix}
+
\begin{pmatrix}
\varepsilon_1 \\
\varepsilon_2 \\
\vdots \\
\varepsilon_n \\
\end{pmatrix}
$$
</span>

Enough with the maths jargon lets get to the code. Okay so lets make a structure that will represent the linear regression. Calling it `Linear` will be good right?
```rust
pub struct Linear {
	data: Array2<f64>,
	theta: Array2<f64>,
	label: Array2<f64>
}
```
We will be using ***Rust*** and a crate called <a href="https://crates.io/crates/ndarray">`ndarray`</a>. `ndarray` is great and intuative. I had worked with `numpy` before and `ndarray` is similar to it (but not really similar). Our data structure(`Linear`) contains a `data` array, a `theta` array and a `label` array. The `label` array will be used during training. The `theta` represents the parameter that our model will learn and this `theta` will be used to predict from the given data. Lets implement the `Linear` regression struct step by step.
```rust
impl Linear {
	pub fn new(data: Array2<f64>, label: Array2<f64>)-> Self {
		let theta = Array2::from_shape_fn((data.ncols(),1),|(_,_)| rand::random());
		Linear {data, theta, label}
	}
}
```
Here we created a `new` function that creates a `Linear` struct. I couldn't create a  empty random matrix without using another crate, so here I am using a little hack(not really a hack though) to create a matrix of size $$n \times 1$$. 
Now on to the most important and the simplest part. Every code after this point will be written inside the `impl` block.
```rust
fn hypothesis(&self) -> Array2<f64> {
	let prediction = self.data.dot(&self.theta);
	prediction
}
```
Here we do our formula of matrix multiplication ($$y = X\theta$$). We haven't talked about what inner product is, but we don't need a complete definition of it here. For our sake, inner product is the dot product for vector and matrix multiplication for matrix.

```rust
fn gradient(&mut self, gamma: f64, iter: i32) {
	for _i in 1..iter{
		let delta = ((self.hypo() - &self.label).reversed_axes().dot(&self.data)).reversed_axes() * (1/self.data.nrows()) * gamma;
		self.theta = &self.theta - delta;
	}
}
```
The initialization of `delta` variable looks complex, but I promise if I had splited it into multiple lines, it would have looked even more worse. On that note, lets go step by step on how it it initialized.
The `delta` here is the vectorized form of gradient descent that we saw earlier. Okay so now a bit of maths :). 

The cost function for linear regression is defined as:

<span style="display:table;margin:0 auto;">
$$
C = \frac{1}{2m}\displaystyle\sum_{i=1}^m(h_\theta\relax(x_i)-y_i)^2
$$
</span>

This is the cost function which is the average of loss function(this is why we have $$\frac{1}{2m}$$ there. The $$2$$ doesn't matter, it is there to make the equation look prettier after we take the derivative). Here $$m$$ is the number of rows. So, the gradient descent will optimize according to this cost function. Taking the derivative wrt. each $$\theta$$. You can check out the derivation on the bottom of the page. I cannot guarantee that it is correct, as it is something I did, but it is intuitive.

<span style="display:table;margin:0 auto;">
$$
\frac{\delta C}{\delta \theta} = \frac{1}{m}\displaystyle\sum_{i=1}^m(h_\theta\relax(x_i)-y_i)x
$$
</span>

And then finally, relating this to the code above. `(self.hypo() - &self.label)` is the $$(h_\theta\relax(x_i)-y_i)$$ part. Then we `reversed_axis`, which is done to allow the multiplication between the afforementioned value and $$x$$. So this code `(self.hypo()-&self.label).reversed_axes().dot(&self.data)).reversed_axes()` is equivalent to the following expression.

<span style="display:table;margin:0 auto;">
$$
\displaystyle\sum_{i=1}^m(h_\theta\relax(x_i)-y_i)x
$$
</span>

Then, we divide it by `self.data.nrows()` as in the equation to get the final value. The extra `gamma` parameter is the step-size as in the equation
<span style="display:table;margin:0 auto;">$$x_{n+1} = x_n - \gamma_n \varDelta F(\relax{x})$$</span>
Now the final step, taking it all together. We subtract the `delta` from `self.theta` to get the new theta value. This is equivalent to the equation above. In terms of our code, the mathematical equation is given as:
<span style="display:table;margin:0 auto;">$$\theta_{n+1} = \theta_n - \gamma \frac{\delta C}{\delta \theta}$$</span>
The `iter` parameter is the number of iteration, surprised? Okay now the final part, the training. Lets create a training function.
```rust
pub fn train(&mut self, alpha: f64, iter: i32) {
        self.gradient(alpha, iter);
}
```
This calls the `gradient` function with those parameters and it's done!! To predict results after training we can create a public function named `predict` and inner product the input data with the `theta` parameter in our struct.
```rust
pub fn predict(&self, input: Array2<f64>) -> Array2<f64> {
        input.dot(&self.theta)
}
```
And this is it. Everything is done. This is the simplest linear regression, now we can train and test it. The code for training and testing it is given below:
```rust
use ndarray::{self, Array, Array2, Ix2};

fn main() {
    let data = Array::range(1.0, 15.0, 1.0).into_shape((14, 1)).unwrap();
    let label = Array::range(1.0, 15.0, 1.0).into_shape((14, 1)).unwrap();
    let mut lin = Linear::new(data, label);
    lin.train(0.01, 3);
    let data = Array::range(11.0, 25.0, 1.0).into_shape((14, 1)).unwrap();
    println!("{:?}", lin.predict(data));
}
```
There are lot of roads one can go from here. We could add a error-var or create a different optimization algorithm. Thank you for reading, have a great day(or night). 
The derivation of the loss function is given as. Here, when we derivate the $$\theta$$ is $$\theta_j$$ and the equation is $$h_\theta\relax(x_i) = \theta_j X$$  but for simplicity sake we will be putting it as $$\theta$$ and $$h_\theta\relax(x_i) = \theta X$$.

<span style="display:table;margin:0 auto;">
$$
C = \frac{1}{2m}\displaystyle\sum_{i=1}^m(h_\theta\relax(x_i)-y_i)^2
$$
</span>

$$
Taking\> derivation\> wrt \> "\theta",
$$

<span style="display:table;margin:0 auto;">
$$
\frac{\delta C}{\delta \theta} = \frac{\frac{1}{2m}\displaystyle\sum_{i=1}^m(h_\theta\relax(x_i)-y_i)^2}{\theta}
$$
</span>

<span style="display:table;margin:0 auto;">
$$
\frac{\delta C}{\delta \theta} = \frac{1}{2m}\displaystyle\sum_{i=1}^m\frac{(h_\theta\relax(x_i)-y_i)^2}{\theta}
$$
</span>

<span style="display:table;margin:0 auto;">
$$
\frac{\delta C}{\delta \theta} = \frac{1}{2m}\displaystyle\sum_{i=1}^m\frac{(h_\theta\relax(x_i)-y_i)^2}{(h_\theta\relax(x_i)-y_i)}\times\frac{(h_\theta\relax(x_i)-y_i)}{\theta}
$$
</span>

<span style="display:table;margin:0 auto;">
$$
\frac{\delta C}{\delta \theta} = \frac{1}{\cancel{2}m}\times\cancel{2}\times\displaystyle\sum_{i=1}^m(h_\theta\relax(x_i)-y_i) \lparen \frac{h_\theta\relax(x_i)}{\theta} - \frac{y_i}{\theta}\rparen
$$
</span>

$$We \> know \> h_\theta\relax(x_i) = \theta X \> and \> \frac{y_i}{\theta} = 0,$$

<span style="display:table;margin:0 auto;">
$$
\frac{\delta C}{\delta \theta} = \frac{1}{m}\displaystyle\sum_{i=1}^m(h_\theta\relax(x_i)-y_i)(\frac{\cancel{\theta} X}{\cancel{\theta}})
$$
</span>

$$So \> we \> have,$$

<span style="display:table;margin:0 auto;">
$$
\frac{\delta C}{\delta \theta} = \frac{1}{m}\displaystyle\sum_{i=1}^m(h_\theta\relax(x_i)-y_i)X
$$
</span>
