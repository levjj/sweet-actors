function Queue() {}

Queue.prototype.push = function(item) {
    var ni = [item, null];
    if (this.last) {
        this.last[1] = ni;
    } else {
        this.first = ni;
    }
    this.last = ni;
};

Queue.prototype.shift = function() {
    if (!this.first) return null;
    var i = this.first[0];
    this.first = this.first[1];
    return i;
};

function Actor(act) {
    this.inbox = new Queue();
    this.act = act;
}

Actor.prototype.send = function(n) {
    this.inbox.push(n);
};

Actor.prototype.receive = function() {
    var ni = this.inbox.shift();
    if (!ni) return false;
    this.act(ni);
    return true;
};

function System(actors) {
    this.actors = actors;
}

System.prototype.process = function() {
    var len = this.actors.length;
    for (var i = 0; i < len; i++) {
        if (this.actors[i].receive()) {
            return true;
        }
    }
    return false;
};

System.prototype.run = function() {
    if (this.process()) {
        setTimeout(this.run.bind(this), 0);
    }
};

System.prototype.start = function() {
    setTimeout(this.run.bind(this), 0);
};

exports.Actor = Actor;
exports.System = System;
