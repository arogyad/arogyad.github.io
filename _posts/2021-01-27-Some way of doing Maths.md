---
layout: post
title: Some way of doing Maths
published: true
---

I had this idea of making a program of some sort that would solve your mathematical problems on the fly. I came up with this idea because of this GitHub repo [https://github.com/vdoubleu/Math-Equation-Solver](https://github.com/vdoubleu/Math-Equation-Solver). The author of this repo had made a web app that accepts a .jpg or .png file and solves the mathematical problem. I wanted to do something of this sort but with my twist so I made this web app which has a small canvas on the center of the screen where you preferably draw mathematical operations, however you can draw anything but it won't do anything, and the app tries it's best to recognize the mathematical operations and solve the problem. The backend is written in python, flask as the micro-web framework, and fastai as the deep learning framework. The frontend is written javascript, which was tough cause I didn't have any exposure to javascript before this project. The entire implementation can be found on my GitHub or at [https://github.com/arogydhl/HandwrittenEquationSolverWebApp](https://github.com/arogydhl/HandwrittenEquationSolverWebApp). This blog is just an introduction to the project and in future blogs, I will explain more about the frontend and the backend.

## The Frontend:

Okay, let's talk about the frontend which is far from being called attractive but I am proud of javascript for holding to such sloppy programming. The drawing canvas where you draw the mathematical operations is a 'canvas' element (surprised?). In layman's terms, the canvas records the movement of the mouse, converts it into an image then sends it to the backend for processing. The javascript for this project is a mess, it isn't written following the best practices but it does the work, so yeah I am not really going to change it (or maybe I will I don't really know). However, the one thing I really want to change is the way the website looks, it looks really dull. I don't know much CSS, so it will take me a while to push a new version with better aesthetics.

## The Backend:

The backend is written entirely in python using flask as the micro-web framework. I found out about flask when I was searching for easy ways of making dynamic websites. I had this other alternative as well, Django, but it seemed really intimidating. So the backend accepts the image as a base64 encoded bytes and returns decoded bytes, which in this case is an image. The benefit of this method is that the image doesn't need to be saved in drive and can be sent without any intermediate saving and loading, which would have made the program slow. These decoded bytes are then sent to the classification model. The model identifies the mathematical operations and numbers, then a list containing all these operations is sent to the math_lib which performs the mathematical operations.

## Things I have to change:

The first thing that I have to change, which I have already pointed out, is the aesthetic of the website. I also want to add more mathematical operations such as derivative and trigonometric functionality. The integration function calculates the integration between 0 and 1, which isn't that interesting unless you want to calculate the integration of a function between 0 and 1. I also have the task of making the javascript more readable as sometimes it is difficult even for me to read my own codes.

## Things I used:

1) The dataset can be found at [https://www.kaggle.com/xainano/handwrittenmathsymbols](https://www.kaggle.com/xainano/handwrittenmathsymbols). This is an excellent dataset if you are planning to do some computer vision task incorporating mathematics.

2) Fastai as the major deep learning model, the transfer learning functionality provided by fastai makes it one of the most beautiful libraries.

3) Flask as the micro-web framework, however, I am planning to learn Django and transfer this model to Django.

You can contact me at my email address provided in the [About](https://arogydhl.github.io/about/) section. The next blog will be about the frontend of the project.
