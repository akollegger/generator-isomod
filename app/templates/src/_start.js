(function (window, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define(factory);
  } else if (typeof exports === 'object') {
    // CommonJS
    module.exports = factory();
  } else {
    // Browser globals (<%= _.camelize(moduleName) %> is your global library identifier)
    window.<%= _.camelize(moduleName) %> = factory();
  }
}(this, function () {