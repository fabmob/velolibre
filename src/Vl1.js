import correspondance from './correspondance-icônes.yaml'
import vélo from '../vélos/vélo1.yaml'

export default ({}) => (
	<div>
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
				{Object.entries(vélo.composants).map(
					([composant, { modèle, marque }]) => (
						<li>
							<img css="width: 5rem" src={correspondance[composant] + '.svg'} />
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
