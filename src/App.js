import React from 'react'
import ecotrain from './ecotrain sur un pont.png'
import './App.css'
// On définit une liste de règles publicodes
import { résultat, engine } from './Calcul.js'
import { Documentation } from 'publicodes'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
	return (
		<Router>
			<header>
				<h1>Ecotrain</h1>
				<img src={ecotrain} title="L'écotrain sur un pont dans la nature" />
			</header>
			<Documentation engine={engine} documentationPath={'/documentation'} />
			{/* Composants de l'app */}
		</Router>
	)
}

export default App
