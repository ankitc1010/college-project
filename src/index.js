import { h, render } from 'preact'
import Home from './components/Home'
import Area from './components/Area'
import NotFound from './components/NotFound'
import Router from 'preact-router'
import AsyncRoute from 'preact-async-route'
import init from './registerServiceWorker'
import 'preact/debug'
import './style.scss'

init()
const App = () => (
	<Router>
		<Home path="/" />
		<Area path="/area/:q" />
		<NotFound default />
	</Router>
)

render(<App />, document.body)
