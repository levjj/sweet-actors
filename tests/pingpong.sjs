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

var timeout = 20;

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

describe('ping pong actors', function() {

    var a1;
    var a2;
    var system;

    actor A1 {
        "start" => {
            for (var i = 0; i < 10; i++) {
                a2 ~ "ping";
            }
        },
        "pong" => {
            if (!this.pongs) this.pongs = 0;
            this.pongs++;
        }
    }

    actor A2 {
        "ping" => {
            if (!this.pings) this.pings = 0;
            this.pings++;
            sender ~ "pong";
        },
    }


    beforeEach(function() {
        a1 = new A1();
        a2 = new A2();
        system = new System();
        system.register(a1);
        system.register(a2);
    });

    it('should send each other 10 pings and pongs', function(done) {
        a1 ~ "start";
        system.start();
        setTimeout(function() {
            expect(a1.pongs).to.be(10);
            expect(a2.pings).to.be(10);
            done();
        }, timeout);
    });

    it('should send each other 30 pings and pongs', function(done) {
        a1 ~ "start";
        system.start();
        a1 ~ "start";
        setTimeout(function() { a1 ~ "start"; }, 1);
        setTimeout(function() {
            expect(a1.pongs).to.be(30);
            expect(a2.pings).to.be(30);
            done();
        }, timeout*2);
    });
});

