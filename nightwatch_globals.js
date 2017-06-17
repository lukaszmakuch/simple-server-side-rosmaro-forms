var chromedriver = require('chromedriver');
module.exports = {
  before : function(done) {
    chromedriver.start();
    console.log('started');

    done();
  },

  after : function(done) {
    chromedriver.stop();
    done();
  }
};
