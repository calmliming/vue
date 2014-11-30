var prefixes = ['-webkit-', '-moz-', '-ms-']
var importantRE = /!important;?$/

module.exports = {

  bind: function () {
    var prop = this.arg
    if (!prop) return
    if (prop.charAt(0) === '$') {
      // properties that start with $ will be auto-prefixed
      prop = prop.slice(1)
      this.prefixed = true
    }
    this.prop = prop
  },

  update: function (value) {
    var prop = this.prop
    if (prop) {
      // cast possible numbers/booleans into strings
      if (value != null) {
        value += ''
      }
      var isImportant = importantRE.test(value)
        ? 'important'
        : ''
      if (isImportant) {
        value = value.replace(importantRE, '').trim()
      }
      this.el.style.setProperty(prop, value, isImportant)
      if (this.prefixed) {
        var i = prefixes.length
        while (i--) {
          this.el.style.setProperty(
            prefixes[i] + prop,
            value,
            isImportant
          )
        }
      }
    } else {
      if (typeof value === 'object') {
        for(var key in value) {
          this.el.style[key] = value[key];
        }
      } else {
        this.el.style.cssText = value
      }
    }
  }

}