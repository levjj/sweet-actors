var expect = require('expect.js');
var Actor = require('../lib/actors').Actor;

describe('dummy actor', function() {

  actor A1 { }

  it('should be an actor', function() {
    var a = new A1();
    expect(a).to.be.an(Actor);
    expect(a).to.have.property('send');
    expect(a).to.have.property('receive');
  });
});

// describe('trivial actor', function() {

//     var called;

//     actor A2 [
//       "foo" => { called = true; }
//     ]

//     beforeEach(function() {
      
//     });

//     it('should receive a foo message', function() {
//         var a2 = new A2();
//         called = false;
//         a2 @ "foo";

//         expect(called).to.be(true);
//     }


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

