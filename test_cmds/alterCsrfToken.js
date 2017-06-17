exports.command = function(newValue) {
  this.executeAsync(function (newValue) {
    document.querySelectorAll("input[name='_csrf']").forEach(
      elem => elem.value = newValue
    )
  }, [newValue])
  return this
}
