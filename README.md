Sweet Actors
============

A set of [sweet.js](http://sweetjs.org) macros for writing
actors in a [Scala](http://scala-lang.org)-like syntax.

This is based on the [SimpleActors](https://github.com/ajlopez/SimpleActors)
JavaScript library.

Examples
--------

    actor A1(a2) {
        "start" => {
            for (var i = 0; i < 100; i++) {
                a2 ~ "ping";
            }
        },
        "pong" => { console.log("pong"); }
    }

    actor A2 {
        "ping" => {
            console.log("ping");
            sender ~ "pong";
        },
        "stop" => { console.log("stop"); }
    }

    var a2 = new A2();
    var a1 = new A1(a2);
    a1 ~ "start";


Installation
------------

    $ npm install

Tests
-----

    $ npm test
