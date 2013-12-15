function Queue() {
    this.first = null;
    this.last = null;
}

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
    if (!this.first) this.last = null;
    return i;
};

function Actor() {
    this.inbox = new Queue();
}

Actor.prototype.send = function(/*sender, msg...*/) {
    this.inbox.push([].slice.call(arguments));
};

Actor.prototype.receive = function() {
    var ni = this.inbox.shift();
    if (!ni) return false;
    this.act.apply(this, ni);
    return true;
};

function System() {
    this.actors = [];
}

System.prototype.register = function(actor) {
    this.actors.push(actor);
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
    } else {
        this.running = false;
    }
};

System.prototype.start = function() {
    this.running = true;
    setTimeout(this.run.bind(this), 0);
};

exports.Actor = Actor;
exports.System = System;
