'use strict';

var repl = require("repl");
var <%= _.camelize(moduleName) %> = require("../dist/<%= _.slugify(moduleName) %>");

module.exports = function(program) {

	program
		.command('shell')
		.version('0.0.1')
		.description('Interactive shell')
		.action(function(/* Args here */){
      var local = repl.start('(<%= _.camelize(moduleName) %>) ');
      local.context.<%= _.camelize(moduleName) %> = <%= _.camelize(moduleName) %>;
		});
	
};