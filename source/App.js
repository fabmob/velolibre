import React from 'react'
import {
	BrowserRouter as Router,
	Redirect,
	Switch,
	Route,
} from 'react-router-dom'
import { Link } from 'react-router-dom'
import Vl1 from './Vl1'
import Home from './Home'
import Article from './Article'
import News from './News'

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
						a {
							text-decoration: none;
							color: inherit;
						}
					`}
				>
					<nav
						css={`
							text-align: center;
							margin: 0 0 3rem;
							display: flex;
							align-items: center;
							justify-content: flex-start;
							overflow-x: scroll;
							@media (min-width: 800px) {
								overflow-x: visible;
							}
							a {
								margin: 1rem;
							}
							h1 {
								margin: 0;
								display: inline;
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
						<Link to="/documentation/à-propos">À propos</Link>
						<Link to="/documentation/index">Documentation</Link>
						<Link to="/nouveautés">Nouveautés</Link>
					</nav>
				</header>
				<Switch>
					<Route path="/vélos/vl1">
						<Vl1 />
					</Route>
					<Route path="/documentation/:id">
						<Article />
					</Route>
					<Route path="/accueil/alpha">
						<Home />
					</Route>
					<Route path="/nouveautés">
						<News />
					</Route>
					<Route path="/">
						<Redirect to="accueil/alpha" />
					</Route>
				</Switch>
			</Router>
		</div>
	)
}

export default App
