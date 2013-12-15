var expect = require('expect.js');
var Actor = require('../lib/actors').Actor;
var System = require('../lib/actors').System;

describe('dummy actor', function() {

    actor DummyActor { }

    it('should be an actor', function() {
        var a = new DummyActor();
        expect(a).to.be.an(Actor);
        expect(a).to.have.property('send');
        expect(a).to.have.property('receive');
    });
});

var timeout = 10;

describe('trivial actor', function() {

    var called;
    var a;
    var system;

    actor TrivialActor {
        "foo" => { called++; }
    }

    beforeEach(function() {
        a = new TrivialActor();
        system = new System();
        system.register(a);
        called = 0;
    });

    it('should receive and handle a foo message', function(done) {
        expect(a.inbox.first).to.equal(null);
        expect(a.inbox.last).to.equal(null);
        a ~ "foo";
        expect(a.inbox.first).to.be.ok();
        expect(a.inbox.first).to.equal(a.inbox.last);
        system.start();
        setTimeout(function() {
            expect(called).to.be(1);
            done();
        },timeout);
    });

    it('should ignore a bar message', function(done) {
        a ~ "bar";
        system.start();
        setTimeout(function() {
            expect(called).to.be(0);
            done();
        },timeout);
    });

    it('should receive and handle multiple foo messages', function(done) {
        a ~ "foo";
        a ~ "foo";
        system.start();
        setTimeout(function() {
            expect(called).to.be(2);
            done();
        },timeout);
    });
});

// actor a2 [
//     "ping" => {
//         console.log("ping");
//         sender ! "pong";
//     },
//     "stop" => { console.log("stop"); }
// ]

// actor a1 [
//     "start" => {
//         for (var i = 0; i < 100; i++) {
//             a2 ! "ping";
//         }
//     },
//     "pong" => { console.log("pong"); }
// ]

// a1.send("start");
// new System([ping, pong]).start();

