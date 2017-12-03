const {By, until} = require('selenium-webdriver');
const makeTest = require('./makeTest');

test('rendering composites', makeTest(async ({waitForPresent}) => {
  await waitForPresent('.name-of-a-dog');
  await waitForPresent('.name-of-a-cat');
  await waitForPresent('input[value="log in as dog"]');
  await waitForPresent('input[value="log in as cat"]');
}));

test('logging in as a cat', makeTest(async ({setValue, click, getText}) => {
  await setValue('.name-of-a-cat', 'Meower');
  await click('input[value="log in as cat"]');
  const msg = await getText('.cat-says');
  expect(msg).toEqual('Meow Meow Meower!'); 
}));

test('logging in as a dog', makeTest(async ({setValue, click, getText}) => {
  await setValue('.name-of-a-dog', 'WoofWoofer');
  await click('input[value="log in as dog"]');
  const msg = await getText('.dog-says');
  expect(msg).toEqual('Woof Woof WoofWoofer!'); 
}));

test('error when the csrf token is missing', makeTest(async ({setIncorrectCsrfToken, click, getText}) => {
  await setIncorrectCsrfToken();
  await click('input[value="log in as cat"]');
  const msg = await getText('body');
  expect(msg).toContain('invalid csrf token'); 
}));

test('setting different name of the csrf token field', makeTest(async ({go, getAttr}) => {
  await go('/different_token_field_name');
  const token = await getAttr('input[name="token_field"]', 'value');
  expect(token).toEqual('token_value');
}));