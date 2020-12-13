import {Link} from 'react-router-dom'
import Composant from './Composant'
export default  ({ vélo, chosen, notChosen, prixTotal }) => (
	<div>
		<header>
			<p>{vélo.description}</p>
		</header>
		<p>
			Prix provisoire : <strong>{prixTotal} €</strong>
			<Link to="/vélos/vl1/assembler">
				<button css="margin: 1rem">Assembler</button>
			</Link>
		</p>
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
