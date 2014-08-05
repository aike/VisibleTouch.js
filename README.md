VisibleTouch.js
====
Mouse click visualizer written in JavaScript

##Demo
 ![Demo](images/visibletouch.gif)

##Description
VisibleTouch.js is a JavaScript visualize program which shows mouse click action.


##How To Use
load script with [jQuery](http://jquery.com/)

    <script src="https://code.jquery.com/jquery-2.1.1.min.js"></script>

showing click ripple

    <script type="text/javascript" src="visibletouch.js"></script>
    <script type="text/javascript" src="visibletouchripple.js"></script>

 ![Ripple](images/ripple.png)

showing mouse image

    <script type="text/javascript" src="visibletouch.js"></script>
    <script type="text/javascript" src="visibletouchmouse.js"></script>

 ![Mouse](images/mouse.png)

showing both

    <script type="text/javascript" src="visibletouch.js"></script>
    <script type="text/javascript" src="visibletouchripple.js"></script>
    <script type="text/javascript" src="visibletouchmouse.js"></script>

with customize option

    <script type="text/javascript" src="visibletouch.js"></script>
    <script type="text/javascript" src="visibletouchmouse.js"></script>
    <script type="text/javascript" >
        visibletouch.option = { mousex: 50, mousey: 20, mousesize: 150 };
    </script>

mousex: mouse image left position, if negative value it means potion from right  
mousey: mouse image top position, if negative value it means potion from bottom  
mousez: mouse image size

##Demo Page
http://aikelab.net/visibletouch/

##Extra
showing fancy ripple

    <script type="text/javascript" src="visibletouch.js"></script>
    <script type="text/javascript" src="extra/visibletouchano.js"></script>

 ![Extra](images/visibletouchano.gif)

##NOTE
If you click mouse buttons during draw ripples, the click event DO NOT notify to html page.

##Credit
VisibleTouch.js is licenced under MIT License. Copyright 2014, aike (@aike1000)
