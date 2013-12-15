Sweet Actors
============

A set of [sweet.js](http://sweetjs.org) macros for writing
actors in a [Scala](http://scala-lang.org)-like syntax.

Examples
--------

The `actor` keyword can be used to create new actors which have to be
instanciated like classes. Sending messages to actors is done with `~`
following by an arbitrary number of arguments.

```javascript
    var a1,a2;

    actor A1 {
        "start" => {
            for (var i = 0; i < 100; i++) {
                a2 ~ "ping";
            }
            a2 ~ "stop";
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

    a1 = new A1();
    a2 = new A2();
    a1 ~ "start";
```

Any kind of value can be send with `~`. Free variables can be used to bind
values while literals (and other expressions) match a message:

```javascript
    actor Greeter {
        "greet", someone => {
            // Ask for the name first
            someone ~ "who?";
        },
        "name!", "Jacques" => {
            // Jacques has its own routine
            sender ~ "hello", "Bonjour Jacques!";
        },
        "name!", name => {
            // All others will receive a normal greeting
            sender ~ "hello", "Hello " + name + "!";
        }
    }

    actor TestPerson {
        "name!", newName => {
            // I'm now called newName
            this.name = newName;
        },
        "who?" => {
            // Telling the sender my name
            sender ~ "name!", this.name;
        },
        "hello", msg => {
            // Print whatever was told me.
            console.log(msg);
        }
    }
```


Installation
------------

Assuming that [grunt](http://gruntjs.com/) is installed...

    npm install

Tests
-----

Tests are run with [mocha](http://visionmedia.github.io/mocha/).

    npm test

Debugging
---------

I recommend [node-inspector](https://github.com/node-inspector/node-inspector).

    npm install -g node-inspector
    node-inspector &

Debugging the application:

    node --debug-brk $(which grunt)

If source-maps support is working, you will see the actual source file and not
the generated code.
