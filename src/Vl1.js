import correspondance from './correspondance-icônes.yaml'
import vélo from '../vélos/1.yaml'

export default ({}) => (
	<div>
		<div

			css={`
			max-width: 700px;
			margin: 0 auto;
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
		><h1>{vélo.nom}</h1>
			<p>{vélo.description}</p>
			<ul>
				{Object.entries(vélo.composants).map(
					([composant, {modèle, marque}]) => (
						<li>
							<img
								css="width: 5rem"
								src={'composants/' + correspondance[composant] + '.svg'}
							/>
							<div>
								<div css="text-transform: uppercase; font-size: 85%; color: #666">
									{composant}
								</div>
								<div>{marque}</div>
								<div>{modèle}</div>
							</div>
						</li>
					)
				)}
			</ul>
		</div>
	</div>
)
