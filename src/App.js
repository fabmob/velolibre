import React from 'react'
import './App.css'
import {
	BrowserRouter as Router,
	Redirect,
	Switch,
	Route,
} from 'react-router-dom'
import Vl1 from './Vl1'
import Home from './Home'

function App() {
	return (
		<div
			css={`
				margin: 0 auto;
			`}
		>
			<Router>
				<header css="margin-left: 1rem">
					<h1>
						vélo
						<span css="border-radius: .3rem; padding: .1rem .6rem ;margin-left: .2rem; background: black; color: white">
							libre
						</span>
					</h1>
				</header>
				<Switch>
					<Route path="/vl1" component={Vl1} />
					<Route path="/" component={Home} />
				</Switch>
			</Router>
		</div>
	)
}

export default App
