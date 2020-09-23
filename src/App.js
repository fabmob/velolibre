import React from 'react'
import './App.css'
import {
	BrowserRouter as Router,
	Redirect,
	Switch,
	Route,
} from 'react-router-dom'

function App() {
	return (
		<div
			css={`
				margin: 0 auto;
				max-width: 800px;
			`}
		>
			<Router>
				<header>
					<h1>Vélo libre</h1>
					<img css="max-height: 400px" src="https://i.imgur.com/vVlpvHR.jpg" />
				</header>
				<div>
					<p>Un vélo aussi libre qu'un logiciel libre.</p>
				</div>
			</Router>
		</div>
	)
}

export default App
