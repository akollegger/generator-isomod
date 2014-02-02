var <%= _.camelize(moduleName) %> = require('../dist/<%= _.slugify(moduleName) %>');

console.log('I so mod!');

var classyObject = new <%= _.camelize(moduleName) %>.IsoClassy();

console.log('Stay classy, ', classyObject.toString());

console.log('Random number:', <%= _.camelize(moduleName) %>.random());

console.log('Library version:', <%= _.camelize(moduleName) %>.VERSION);