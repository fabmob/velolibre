import React from 'react'
import './App.css'
import {
	BrowserRouter as Router,
	Redirect,
	Switch,
	Route,
} from 'react-router-dom'
import velos from './velos.yaml'
import composants from './composants.yaml'
import correspondance from './correspondance-icônes.yaml'

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
					<p css="max-width: 50rem;font-size: 300%">
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
							width: 12rem;
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
						li img {
							width: 90%;
						}

						button {
							padding: 0.2rem 0.5rem;
							border: none;
							background: black;
							color: white;
							font-size: 130%;
							cursor: pointer;
						}
					`}
				>
					{velos.map(({ nom, statut, prix, image, grisé }) => (
						<a href={grisé ? '' : '/nom'}>
							<li
								css={`
									${grisé
										? ` 

									border: 1px dashed grey !important;
opacity: 0.65;
									button {visibility: hidden}`
										: ''}
								`}
							>
								<h2>{nom}</h2>
								<p>{statut}</p>
								<p>{prix}</p>
								{image && <img src={require('./' + image).default} />}
								<button>CONSTRUIRE</button>
							</li>
						</a>
					))}
				</ul>

				<div
					css={`
						ul {
							list-style-type: none;
						}
						li {
							display: flex;
							margin: 1rem;
							align-items: center;
						}
						li img {
							margin-right: 1rem;
						}
					`}
				>
					<ul>
						{Object.entries(composants).map(([composant, { marque }]) => (
							<li>
								<img
									css="width: 5rem"
									src={correspondance[composant] + '.svg'}
								/>
								{marque}
							</li>
						))}
					</ul>
				</div>
			</Router>
		</div>
	)
}

export default App
