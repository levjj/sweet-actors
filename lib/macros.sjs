macro recv {
  case { $recv $msg => $body } => {
    var patterns = #{$msg};
    var cond = #{true};
    var body = [];
    for (var i = 0; i < patterns.length; i++) {
      if (patterns[i].token.type == parser.Token.Identifier) {
        // bind identifier
      } else if (patterns[i].token.value != "{}") {
        // match
        cond = cond.concat(#{ && arguments[1] == });
        cond.push(patterns[i]);
      }
    }
    body = body.concat(#{$body});
    return withSyntax($cond = [makeDelim("()", cond, #{$recv})]) {
        return #{ if $cond $body else }
    }
  }
}

macro actor {
  case { $actor $name:ident { $($spec => $spbody) (,) ... } } => {
    return withSyntax($lActor = [makeIdent("Actor", #{$actor})]) {
      return #{
          function $name() {};
          var act = function(sender) {
              $( recv $spec => $spbody ) ...
              { return "unsupported"; }
          };
          $name.prototype = new $lActor(act);
      };
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
