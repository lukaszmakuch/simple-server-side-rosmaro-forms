module.exports = {

  'Test rendering composites': browser => {
    browser
      .reset()
      .url('http://localhost:3000')
      .waitForElementVisible('body', 1000)
      .assert.visible('.name-of-a-dog')
      .assert.visible('.name-of-a-cat')
      .assert.visible('input[value="log in as dog"]')
      .assert.visible('input[value="log in as cat"]')
      .end()
  },

  'Test logging in as a cat': browser => {
    browser
      .reset()
      .url('http://localhost:3000')
      .waitForElementVisible('.name-of-a-cat', 1000)
      .setValue('.name-of-a-cat', 'Meower')
      .click('input[value="log in as cat"]')
      .waitForElementVisible('.cat-says', 1000)
      .assert.containsText('.cat-says', 'Meow Meow Meower')
      .end()
  },

  'Test logging in as a dog': browser => {
    browser
      .reset()
      .url('http://localhost:3000')
      .waitForElementVisible('.name-of-a-dog', 1000)
      .setValue('.name-of-a-dog', 'WoofWoofer')
      .click('input[value="log in as dog"]')
      .waitForElementVisible('.dog-says', 1000)
      .assert.containsText('.dog-says', 'Woof Woof WoofWoofer')
      .end()
  },

  'Test error when the csrf token is missing': browser => {
    browser
      .reset()
      .url('http://localhost:3000')
      .waitForElementPresent('input[name="_csrf"]', 1000)
      .alterCsrfToken('not a valid token')
      .click('input[value="log in as dog"]')
      .assert.containsText('body', 'invalid csrf token')
      .end()
  },

  'Test setting different name of the csrf token field': browser => {
    browser
      .url('http://localhost:3000/different_token_field_name')
      .waitForElementPresent('input[name="token_field"]', 1000)
      .assert.value('input[name="token_field"]', 'token_value')
      .end()
  }

}
