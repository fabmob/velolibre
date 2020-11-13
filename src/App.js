import React from 'react'
import './App.css'
import {
	BrowserRouter as Router,
	Redirect,
	Switch,
	Route,
} from 'react-router-dom'
import velos from './velos.yaml'

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
				<div css="display:flex; max-width: 90vw; margin: 0 auto; flex-wrap: wrap; justify-content: center">
					<p css="max-width: 50rem;font-size: 400%">
						Un vélo aussi libre qu'un logiciel libre.
					</p>
				</div>
				<ul
					css={`
						display: flex;
						flex-wrap: wrap;
						list-style-type: none;
						justify-content: space-evenly;
						margin-bottom: 2rem;
						a {
							text-decoration: none;

							color: inherit;
						}
						li {
							margin: 1rem;
							height: 24rem;
							background: white;
							padding: 0.4rem 1rem;
							border: 4px solid black;
							border-radius: 0.3rem;
							display: flex;
							flex-direction: column;
							align-items: center;
							justify-content: center;
						}
						button {
							padding: 0.1rem 0.3rem;
							border: none;
							background: black;
							color: white;
							font-size: 140%;
							cursor: pointer;
						}
					`}
				>
					{velos.map(({ nom, statut, prix, image, grisé }) => (
						<a href={grisé ? '' : '/nom'}>
							<li
								css={`
									${grisé ? 'border: 1px dashed grey !important;' : ''}
								`}
							>
								<h2>{nom}</h2>
								<p>{statut}</p>
								<p>{prix}</p>
								{image && <img src={require('./' + image).default} />}
								{!grisé && <button>CONSTRUIRE</button>}
							</li>
						</a>
					))}
				</ul>
			</Router>
		</div>
	)
}

export default App
