'use strict'

define [ 
  './iso-classy'
  ], 
( isoClassy
  ) ->

  # This class is an assembly and namespace for the isomorphic module.
  <%= _.camelize("-"+moduleName) %> =

    # @property[String] Current version.
    VERSION: '<%= moduleVersion %>'

    # Example class attached to the namespace
    IsoClassy: isoClassy

    # Example function in the namespace
    random: () ->
      return Math.floor((Math.random()*10)+1)

