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
			`}
		>
			<Router>
				<header css="margin-left: 1rem">
					<h1>vélo<span css="border-radius: .3rem; padding: .1rem .6rem ;margin-left: .2rem; background: black; color: white">libre</span></h1>
				</header>
				<div css="display:flex; max-width: 90vw; margin: 0 auto; flex-wrap: wrap; justify-content: center" >
					<p css="max-width: 50rem;font-size: 400%">Un vélo aussi libre qu'un logiciel libre.</p>
					<img css="border-radius: .6rem;max-height: 400px" src="https://i.imgur.com/vVlpvHR.jpg" />
				</div>
					<p css="text-align: center">Bientôt chez vous.</p>
			</Router>
		</div>
	)
}

export default App
