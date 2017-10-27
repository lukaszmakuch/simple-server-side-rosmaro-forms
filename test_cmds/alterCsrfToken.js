exports.command = function(newValue) {
  return this.executeAsync(function (newValue, done) {
    document.querySelectorAll("input[name='_csrf']").forEach(
      elem => elem.value = newValue
    )
    done(true);
  }, [newValue])
}
