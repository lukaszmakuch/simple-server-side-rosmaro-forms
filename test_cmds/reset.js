exports.command = function() {
  this.url('http://localhost:3000')
    .executeAsync(
      function(done) {
        fetch(new Request("/reset")).then(done)
      },
      []
    )
  return this
}
