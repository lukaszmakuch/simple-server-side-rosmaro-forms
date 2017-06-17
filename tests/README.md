# Simple server-side Rosmaro forms
```
npm i simple-server-side-rosmaro-forms --save
```

## Creating leaves
```js
import {safeHtml} from 'common-tags'
import {make_form_view} from 'simple-server-side-rosmaro-forms'
let view
view = make_form_view()
//or if instead of "_csrf" you'd like to use "token"
view = make_form_view({
  csrf_field_name: "token"
})

const make_enter_name_leaf = view(() => ({

  render() {
    return safeHtml`
      Enter your name:
      <input type="text" name="${this.pname('name')}">
      <input type="submit">
    `
  },

  handle(params) {
    this.follow(
      "entered_name",
      {...this.context, name: params['name']}
    )
  }

}))

const enter_name_leaf = make_enter_name_leaf()
```

## Handling forms
```js
import {render_model} from 'simple-server-side-rosmaro-forms'

//... building an express app

app.post('/', async (req, res) => {
	await rosmaro_form_model.handle(req)
	res.redirect('/')
})

app.get('/', async (req, res) => {
  //you probably want to add the whole html skeleton as well
	res.send(await render_model(rosmaro_form_model, req.csrfToken()))
})
```
