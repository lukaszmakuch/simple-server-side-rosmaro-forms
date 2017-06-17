import {login_for_dogs, login_for_cats, welcome_dog, welcome_cat} from './leaves'

export default () => ({
  type: "graph",
  start: "login",
  arrows: {
    login: {
      logged_in_as_a_dog: "welcome_dog",
      logged_in_as_a_cat: "welcome_cat"
    }
  },
  nodes: {
    login: login(),
    welcome_dog: welcome_dog(),
    welcome_cat: welcome_cat()
  }
})

const login = () => ({
  type: "composite",
  nodes: [
    ["login_for_dogs", login_for_dogs()],
    ["login_for_cats", login_for_cats()]
  ]
})
