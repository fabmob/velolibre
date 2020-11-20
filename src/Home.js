import velos from './velos.yaml'
import { Link } from 'react-router-dom'

export default ({}) => (
	<div>
		<div css="display:flex; max-width: 90vw; margin: 0 auto; flex-wrap: wrap; justify-content: center">
			<p css="max-width: 50rem;font-size: 300%">
				Un vélo aussi libre qu'un logiciel libre.
			</p>
		</div>
		<nav
			css={`
				text-align: center;
				a {
					margin: 0 1rem;
				}
			`}
		>
			<Link to="/documentation/à-propos">À propos</Link>
			<Link to="/documentation/index">Documentation</Link>
		</nav>
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
				<Link to={grisé ? '' : '/vl1'}>
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
				</Link>
			))}
		</ul>
	</div>
)
