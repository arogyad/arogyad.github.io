---
title: Polynomial Features Extraction 
date: 2021-07-15
---

Polynomial regression adds a new feature to the normal linear regression. Something very simple and requires only one change from the classic linear regression. Polynomial regression is useful if the explanatory variable and the dependent variables are related in not linear way. For example: We need food to get energy but if we eat a lot we get tired so, a parabolic pattern is formed; When we have food in a healthy amount, we get the maximum energy,but if the opposite happens we get lazy and might go to bed faster. By the way, the last sentence is absolutely, scientifically correct and is perfect representation of polynomial representation. Polynomial is still linear in that the term that we are predicting ($$\theta$$) is linear. So polynomial regression is linear regression with polynomial features of the data. (By the way, I get the ideas for the blogs from <a href="https://pbs.twimg.com/media/DyfDnBnWsAAJ456.jpg" target="_blank">here</a>.)

## Little Maths

Yup, I am blatantly ripping off the math from Wikipedia, some books for this explanation(Pardon me!),and a little of my own contributions(however, I keep it to the minimum as I am most probably wrong). All of the steps will remain the same when compared to linear regression. The only thing that changes is the features that will be used to predict the $$\theta$$.

Let us assume that the $$X$$ matrix, in the simplest case, is of size $$n \times 1$$. Here, $$n$$ is the number of entries or number of cases and $1$ denotes that we are predicting for only a single feature, a more complex example will be shown later. So the matrix $$X$$ can be represented as:
<span style="display:table;margin:0 auto;">
$$
X = \begin{pmatrix}
x_1 & x^2_1 & \cdots & x^m_1 \\
x_2 & x^2_2 & \cdots & x^m_2 \\
x_3 & x^2_3 & \cdots & x^m_3 \\
\vdots & \vdots & \ddots & \vdots \\
x_n & x^2_n & \cdots & x^m_n \\
\end{pmatrix} 
$$
,
$$y = X \theta$$
</span>
We will be leaving out the $$\varepsilon$$ part to make the discussion more simpler. So the final equation can be given as,
<span style="display:table;margin:0 auto;">
$$
or, 
\begin{pmatrix}
y_1 \\
y_2 \\
y_3 \\ 
\vdots \\
y_n
\end{pmatrix} =
\begin{pmatrix}
x_1 & x^2_1 & \cdots & x^m_1 \\
x_2 & x^2_2 & \cdots & x^m_2 \\
x_3 & x^2_3 & \cdots & x^m_3 \\
\vdots & \vdots & \ddots & \vdots \\
x_n & x^2_n & \cdots & x^m_n \\
\end{pmatrix} 
\begin{pmatrix}
\theta_0 \\
\theta_1 \\
\theta_2 \\
\vdots \\
\theta_m \\
\end{pmatrix}
$$
</span>
The value $$m$$ denotes that the explanatory variable $$X$$ and the dependent $$y$$ are related at $$m^{th}$$ polynomial degree(I cannot seem to word it better). For example: If $$X$$ and $$y$$ were related linearly dependent the polynomial degree($$m$$) would be 1. The example about the food would be related at polynomial degree 2.

Now when we have a explanatory variable $$X$$ having $$n$$ entries and $$p$$ features, the matrix can be given as:
<span style="display:table;margin:0 auto;">
$$
X = 
\begin{pmatrix}
x_{11} & x_{12} & \cdots & x_{1p} \\
x_{21} & x_{22} & \cdots & x_{2p} \\
\vdots & \vdots & \ddots & \vdots \\
x_{n1} & x{n2} & \cdots & x_{np} \\
\end{pmatrix}
$$
</span>
So, if this new $$X$$ was to be shown in the form as before, it would be something like this:
$$
\begin{pmatrix}
y_1 \\
y_2 \\
y_3 \\
\vdots \\
y_n
\end{pmatrix} = 
\begin{pmatrix}
x_{11} & x_{12} & \cdots & x_{1p} & x^2_{11} & x^2_{12} & \cdots & x^2_{1p} & \cdots & x^m_{1p} \\
x_{21} & x_{22} & \cdots & x_{2p} & x^2_{21} & x^2_{22} & \cdots & x^2_{2p} & \cdots & x^m_{2p} \\
\vdots & \vdots & \vdots & \vdots & \vdots & \vdots & \vdots & \vdots & \vdots & \vdots \\
x_{n1} & x_{n2} & \cdots & x_{np} & x^2_{n1} & x^2_{n2} & \cdots & x^2_{np} & \cdots & x^m_{np} \\
\end{pmatrix}
\begin{pmatrix}
\theta_1 \\
\theta_2 \\
\vdots \\
\theta_{p\times m}
\end{pmatrix}
$$
That looks like a awfully long matrix, doesn't it? Here we first raise the power of each component of the matrix $$X$$ from 1 to $$m$$ and concatenate each of those to the original matrix. The shape of the matrix we are predicting changes as well: the same of the matrix $$\theta$$ becomes $$(m*p)\times 1$$. This is still a linear regression, as the component we want to predict($$\theta$$) is linear.

Now, lets view another way of making that same $$X$$ matrix even longer. This one requires us to write it in a more *algorithmic* style.

To make this simpler, lets assume that the features $$p$$ is even,so that we can divide the matrix $$X$$ in two equal halves as such,

$$
X_1 = 
\begin{pmatrix}
x_{11} & x_{21} & \cdots & x_{1\frac{p}{2}} \\
x_{21} & x_{22} & \cdots & x_{2\frac{p}{2}} \\
\vdots & \vdots & \ddots & \vdots \\
x_{n1} & x_{n2} & \cdots & x_{n\frac{p}{2}}
\end{pmatrix} \> and \>
X_2 = 
\begin{pmatrix} 
x_{1(\frac{p}{2}+1)} & x_{1(\frac{p}{2}+2)} & \cdots & x_{1p} \\
x_{2(\frac{p}{2}+1)} & x_{2(\frac{p}{2}+2)} & \cdots & x_{2p} \\
\vdots & \vdots & \ddots & \vdots \\
x_{n(\frac{p}{2}+1)} & x_{n(\frac{p}{2}+2)} & \cdots & x_{np}
\end{pmatrix}
$$

Now we perform the binomial expansion and concatenate each term of the binomial expansion without the coefficient to the original $$X$$.

So for a polynomial degree $$m$$, the additional matrix to be concatenated can be given as:
<span style="display:table;margin:0 auto;">
$$Final \> X = ( X \cdots X_1^m \cdots X_1^{m-1}X_2^1 \cdots X_2^m )$$
</span>

Here, $$X_1^{m-1}X_2^1$$ means element wise exponent of $$X_1$$ to $$m-1$$ and $$X_2$$ to $$1$$, and the element wise multiplication of the result of exponential. The result is, then, concatenated to the original $$X$$. This is same as how polynomial feature extraction works in <a href="https://scikit-learn.org/stable/modules/generated/sklearn.preprocessing.PolynomialFeatures.html" target="_blank">sk-learn</a>.

## Coding

Programming this aforementioned process is pretty simple. We have to expand it to its binomial expansion without the coefficient, and the rest is the same as the ordinary linear regression. The feature extraction can be given as such in ***Rust***. Also this is just the follow up to my previous <a href="https://arogyad.github.io/2021/07/05/Linear-Reg/" target="_blank">blog</a>. The implementation can be written inside the `impl` block of the either `Poly`(If you want to treat is as a different type of machine learning model) or `Linear` struct (If you treat it as a feature extraction only.)
```rust
fn make_poly(data: &Array2<T>, poly: i32) -> Array2<f64> {
    let split = (data.ncols() / 2) as usize;
    let _temp = data.clone(); // This is ugly !
    let data_1 = data.slice(s![.., 0..split]);
    let data_2 = data.slice(s![.., split..split * 2]);
    for i in 1..poly + 1 {
        for j in 0..i + 1 {
            _temp = concatenate![
                Axis(1),
                *data,
                (data_1.mapv(|a| a.powi(i - j)) * data_2.mapv(|a| a.powi(j)))
            ];
        }
    }
    temp
/*
    if split % 2 != 0 {
       concatenate![Axis(1), *data, data.slice(s![.., (split*2)+1..(split*2)+1])];
     }
*/
}
```   

This looks a lot inefficient so I am looking into better way of implementing this. We first slice the `data` to two different halves and expand the two halves in binomial form as shown before. We could also check if the `split` is divisible by 2, if it is we don't do anything and if it isn't we could do all sorts of things like concatenating the number of terms remaining at last, squaring them and concatenating etc.... This is basically what polynomial regression is. Next on: Logistic Regression :)
