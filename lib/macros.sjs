macro actor {
  case { $actor $name:ident { $($msg:lit => { $body ... } ) (,) ... } } => {
    var lActor = makeIdent("Actor", #{$actor});
	letstx $lActor = [lActor];
    return #{
      function $name() {};
      var act = function(sender, msg) {
        $(if (msg == $msg) { $body ... } else ) ... { return "unsupported"; }
      }
      $name.prototype = new $lActor(act);
    }
  }
}

export actor

macro ~ {
  case { ~ $msg:expr (,) ... } => {
    return #{.send(this, $msg (,) ...) }
  }
}

export ~
