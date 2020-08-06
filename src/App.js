import React from 'react'
import ecotrain from './ecotrain sur un pont.png'
import './App.css'
// On définit une liste de règles publicodes
import { résultat, engine } from './Calcul.js'
import { Documentation } from 'publicodes'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

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
				<Documentation engine={engine} documentationPath={'/documentation'} />
				{/* Composants de l'app */}
			</Router>
		</div>
	)
}

export default App
