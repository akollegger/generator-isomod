'use strict';

<%= _.camelize(moduleName) %> = require('../dist/<%= _.slugify(moduleName) %>');

describe 'IsoClassy that you know who I am', () ->

  it 'should by default be named San Diego', () ->
    ic = new <%= _.camelize(moduleName) %>.IsoClassy()
    ic.name.should.equal("San Diego")

