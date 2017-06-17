import express from 'express'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import make_lock from 'rosmaro-process-wide-lock'
import make_storage from 'rosmaro-in-memory-storage'
import rosmaro from 'rosmaro'
import csrf from 'csurf'
import make_form_graph from './graph'
import {render_model, make_form_view} from './../src/forms.js'

const app = express()
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())
app.use(csrf({ cookie: true }))

let form
const set_new_form = () => form = rosmaro(make_form_graph(), make_storage(), make_lock())
set_new_form()

app.get('/', async (req, res) => {
	res.send(await render_model(form, req.csrfToken()))
})

app.post('/', async (req, res) => {
	await form.handle(req)
	res.redirect('/')
})

app.get('/reset', (req, res) => {
	set_new_form()
	res.end()
})

app.get('/different_token_field_name', async (req, res) => {
	const options = {
		csrf_field_name: "token_field"
	}
	const node = make_form_view(options)(() => ({
		render () {},
		handle () {}
	}))()

	const form = rosmaro(node, make_storage(), make_lock())

	res.send(await render_model(form, 'token_value'))
})

app.listen(3000, () => console.log('Form listening on port 3000!'))
