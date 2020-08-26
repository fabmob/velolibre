import React from 'react'
import ecotrain from './ecotrain sur un pont.png'
import './App.css'
// On définit une liste de règles publicodes
import { résultat, engine } from './Calcul.js'
import { Documentation } from 'publicodes'
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
					<h1>Ecotrain</h1>
					<img
						src={'/' + ecotrain}
						css="width: 20rem"
						title="L'écotrain sur un pont dans la nature"
					/>
				</header>
				<div>{résultat}</div>
				<h2>Explication du calcul</h2>
				<Switch>
					<Route path="/">
						<Redirect to="/empreinte/par-km-voyageur" />
					</Route>
				</Switch>
				<Documentation engine={engine} documentationPath={''} />
				{/* Composants de l'app */}
			</Router>
		</div>
	)
}

export default App
