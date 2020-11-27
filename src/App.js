import React from 'react'
import './App.css'
import {
	BrowserRouter as Router,
	Redirect,
	Switch,
	Route,
} from 'react-router-dom'
import {Link} from 'react-router-dom'
import Vl1 from './Vl1'
import Home from './Home'
import Article from './Article'

function App() {
	return (
		<div
			css={`
				margin: 0 auto;
			`}
		>
			<Router>
				<header
					css={`
						margin-left: 1rem;
						a {
							text-decoration: none;
							color: inherit;
						}
					`}
				>
					<Link to="/accueil/alpha">
						<h1>
							vélo
							<span css="border-radius: .3rem; padding: .1rem .6rem ;margin-left: .2rem; background: black; color: white">
								libre
							</span>
						</h1>
					</Link>
				</header>
				<Switch>
					<Route path="/vl1">
						<Vl1 />
					</Route>
					<Route path="/documentation/:id" ><Article /></Route>
					<Route path="/accueil/alpha" ><Home /></Route>
					<Route path="/"><Redirect to="accueil/alpha" /></Route>
				</Switch>
			</Router>
		</div>
	)
}

export default App
