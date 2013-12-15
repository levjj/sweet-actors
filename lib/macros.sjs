macro actor {
  case { $actor $name:ident { $($msg:lit => $val) (,) ... } } => {
    var lActor = makeIdent("Actor", #{$actor});
	letstx $lActor = [lActor];
    return #{
      function $name() {};
      $name.prototype = new $lActor (function(sender, msg) {
        $(if (msg == $msg) $val) ...
      });
    }
  }
}

macro ~ {
  case { ~ $msg:expr (,) ... } => {
    return #{.send(this, $msg (,) ...) }
  }
}

export actor;
export ~;
