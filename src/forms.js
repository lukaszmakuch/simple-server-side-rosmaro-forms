import {html} from 'common-tags'

export const make_form_view = (altered_options = {}) => proto_factory => {

  //merging options
  const default_options = {
    csrf_field_name: "_csrf"
  }
  const options = {...default_options, ...altered_options}

  //ready to use factory of a leaf
  return () => {

    //the leaf returned by the factory is going to be extended
    let leaf = proto_factory()

    //it renders just the inner part of the form, that is without <form> etc.
    leaf.render_form_body = leaf.render

    //builds a prefix which consist of the unique id of that leaf
    leaf.get_prefix = function () {
      return `params:${this.id}:`
    }

    //exposed render method takes the csrf token
    leaf.render = function (csrf_token) {
      return html`
        <form method="post">
          <input
            type="hidden"
            name="${options.csrf_field_name}"
            value="${csrf_token}"
          />
          ${this.render_form_body()}
        </form>
      `
    }

    //adds a prefix to the given parameter name
    leaf.pname = function (param) {
      return `${this.get_prefix()}${param}`
    }

    //it is supposed to be called only if there are any params for it to receive
    leaf.handle_its_params = leaf.handle

    //takes the whole request and then decides whether to call the actual handle method
    leaf.handle = function (req) {

      //returns true if the given key is meant to be received
      //by this form
      const is_param_of_this_form = key => key.startsWith(this.get_prefix())

      //turns "PREFIXkey" to "key"
      const strip_prefix = key => key.substr(this.get_prefix().length)

      //has this request been sent by this form?
      if (Object.keys(req.body).some(is_param_of_this_form)) {
        //params without prefixes
        const params = Object.keys(req.body)
          .filter(is_param_of_this_form)
          .reduce((stripped, prefixed_key) => ({
            ...stripped,
            [strip_prefix(prefixed_key)]: req.body[prefixed_key]
          }), {})
        return this.handle_its_params(params)
      }

      //this leaf is not meant to handle this request, so return nothing
    }

    return leaf
  }
}

//simply merges results of calling all the composed nodes
export const render_model = async (model, csrf_token) => {
  const rendered = await model.render(csrf_token)
  return Object.keys(rendered).reduce((html, component_key) => {
    return html + rendered[component_key]
  }, '')
}
