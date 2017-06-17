import {make_form_view} from './../src/forms'
const view = make_form_view()
import {safeHtml} from 'common-tags'

export const login_for_dogs = view(() => ({

  render() {
    return safeHtml`
      <input type="text" class="name-of-a-dog" name="${this.pname('name')}">
      <input type="submit" value="log in as dog">
    `
  },

  handle(params) {
    this.follow("logged_in_as_a_dog", {...this.context, name: params['name']})
  }

}))

export const login_for_cats = view(() => ({

  render() {
    return safeHtml`
      <input type="text" class='name-of-a-cat' name="${this.pname('name')}">
      <input type="submit" value="log in as cat">
    `
  },

  handle(params) {
    this.follow("logged_in_as_a_cat", {...this.context, name: params['name']})
  }

}))

export const welcome_dog = view(() => ({

	render() {
    return safeHtml`<span class="dog-says">Woof Woof ${this.context.name}!</span>`;
	},

	handle(params) {}

}))

export const welcome_cat = view(() => ({

	render() {
    return safeHtml`<span class="cat-says">Meow Meow ${this.context.name}!</span>`;
	},

	handle(params) {}

}))
