macro recv {
  case { $recv $msg (,) ... => $body } => {
    var patterns = #{$msg ...};
    var cond = #{true};
    var body = [];
    for (var i = 0; i < patterns.length; i++) {
      if (patterns[i].token.type == parser.Token.Identifier) {
        // bind identifier
        body = body.concat(withSyntax($nam = [patterns[i]],
                                      $i = [makeValue(i+1)]) {
          return #{ var $nam = arguments[$i]; }
        });
      } else if (patterns[i].token.value != "{}") {
        // match argument
        cond = cond.concat(withSyntax($i = [makeValue(i+1)]) {
          return #{ && arguments[$i] == }
        });
        cond.push(patterns[i]);
      }
    }
    body = body.concat(#{$body});
    return withSyntax($cond = [makeDelim("()", cond, #{$recv})],
                      $cbody = [makeDelim("{}", body, #{$recv})]) {
        return #{ if $cond $cbody else }
    }
  }
}

macro actor {
  case { $actor $name:ident { $($spec (,) ... => $spbody) (,) ... } } => {
    return withSyntax($lActor = [makeIdent("Actor", #{$actor})]) {
      return #{
        function $name() { $lActor.call(this); };
        $name.prototype = Object.create($lActor.prototype);
        $name.prototype.constructor = $name;
        $name.prototype.act = function(sender) {
          $( recv $spec (,) ... => $spbody ) ...
          { return "unsupported"; }
        };
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
