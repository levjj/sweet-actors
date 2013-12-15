macro actor {
  case { $actor $name:ident { $($msg:expr => $body) (,) ... } } => {
	letstx $lActor = [makeIdent("Actor", #{$actor})];
    var patterns = #{$($msg { $body } ) ...};
    var res = #{
        function $name() {};
        var act = function(sender, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8)
    };
    var all = [];
    var cond = #{true};
    var body = [];
    for (var i = 0; i < patterns.length; i++) {
      if (patterns[i].token.type == parser.Token.Identifier) {
        // bind identifier
      } else if (patterns[i].token.value != "{}") {
        // match
        cond = cond.concat(#{ && arg1 == });
        cond.push(patterns[i]);
      } else {
        // next case
        body = body.concat(patterns[i].token.inner);
        all = all.concat(withSyntax($cond = [makeDelim("()", cond, #{$actor})],
                                    $cbody = [makeDelim("{}", body, #{$actor})]) {
            return #{ if $cond $cbody else }
        });
        cond = #{true};
        body = [];
      }
    }
    all = all.concat(#{ { return "unsupported"; } });
    res.push(makeDelim("{}", all, #{$actor}));
    res = res.concat(#{ $name.prototype = new $lActor(act); });
    return res;
  }
}

export actor

macro ~ {
  case { ~ $msg:expr (,) ... } => {
    return #{.send(this, $msg (,) ...) }
  }
}

export ~
