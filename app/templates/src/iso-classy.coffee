'use strict'

define [], () ->

  #
  # An example IsoMod Class
  #
  class IsoClassy

    #
    # Constructs a new IsoClassy
    #
    #     var ic = new IsoClassy( "San Diego" )
    #
    # @param {String} name the name classy object.
    constructor: (@name = "San Diego") ->

    toString: () ->
      return @name

  return IsoClassy
