function template(str, vars) {
	if (!vars) {
		vars = {};
	}

	var rawCommand = function(str) {
		return str.trim();
	};

	var tagPos = {}, argv, substrs = {}, rep;

	while ((tagPos.bb = str.search(/\[\[(.*?)\]\]/)) != -1) {
		rep = '';
		tagPos.be = str.indexOf(']]', tagPos.bb);
		substrs.btag = str.substring(tagPos.bb+2, tagPos.be);

		var argv = substrs.btag.split(' ');
		argv = argv.filter(function(item) {
			return item != '';
		});

		tagPos.eb = str.indexOf('[[/'+argv[0]+']]', tagPos.be+2);
		if (tagPos.eb > -1) {
			tagPos.ee = str.indexOf(']]', tagPos.eb);
		}
		substrs.inner = str.substring(tagPos.be+2, tagPos.eb);
		//substrs.etag = str.substring(tagPos.eb+2, tagPos.ee);

		if (tagPos.eb > -1) {
			switch (argv[0]) {
			case 'each':
				if (argv.length == 4 && argv[2] == 'in') {
					var extVars = deepClone(vars);
					for (var key in vars[argv[3]]) {
						extVars[argv[1]] = vars[argv[3]][key];
						rep += template(substrs.inner, extVars);
					}
					break;
				} // else default
			case 'repeat':
				if (argv.length == 2 && parseInt(argv[1]) != NaN) {
					for (var i=0; i<parseInt(argv[1]); i++) {
						rep += substrs.inner;
					}
					break;
				}
			default:
				rep = rawCommand(substr.inner);
			}
		} else if (vars[argv[0]] === undefined) {
			rep = rawCommand(argv[0]);
		} else {
			rep = vars[argv[0]];
		}

		str = str.substring(0, tagPos.bb) +
			rep +
			str.substring(
				tagPos.eb > -1 ?
					tagPos.ee+2 :
					tagPos.be+2
			);

		tagPos.eb = null;
		tagPos.ee = null;
	}

	return str;
}
