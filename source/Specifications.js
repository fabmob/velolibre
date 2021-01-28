import { Link } from 'react-router-dom'
import Composant from './Composant'
import { Card } from './ui'
import { Markdown } from './utils'
export default ({ vélo, chosen, notChosen, prixTotal }) => (
	<div css="p {margin: .3rem 0}">
		<header>
			<p>{vélo.description}</p>
		</header>
		<p>
			Prix indicatif: <strong>{prixTotal} €</strong>
			<Link to="/vélos/vl1/commande">
				<button css="margin: .4rem 1rem">Commander</button>
			</Link>
		</p>
		<p>
			Version : <strong>{vélo.version}</strong>{' '}
			<Link css="margin: 0 .3rem" to="/documentation/avancement">
				<em>quoi ?</em>
			</Link>
		</p>
		<Actu actu={vélo.actu} />
		<h2>Les composants</h2>
		<ul>
			{chosen.map((item) => (
				<Composant item={item} />
			))}
		</ul>
		{notChosen.length != 0 && (
			<>
				<h3>Composants pas encore choisis</h3>
				<ul>
					{notChosen.map((item) => (
						<Composant item={item} />
					))}
				</ul>
			</>
		)}
	</div>
)

const Actu = ({ actu }) => (
	<Card
		color={'#fbca71'}
		css={`
			margin: 1rem;
			display: fex;
			align-items: center;
			flex-wrap: wrap;
			> figure {
				margin: 0 2rem 0 1rem;
				font-size: 200%;
			}
		`}
	>
		<figure>📢</figure>
		<div>
			<Markdown source={actu} />
		</div>
	</Card>
)
