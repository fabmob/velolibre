import { Link } from 'react-router-dom'
import { imageResizer } from './utils'

import { articles } from './Étape'

export default () => (
	<div css="p {margin: .3rem 0}">
		<p>Suivez pas à pas ce guide, et vous aurez un vélo.</p>
		<ul>
			{articles.map((a) => (
				<li key={a.id}>
					<Link to={'/vélos/vl1/montage/' + a.id}>{a.id}</Link>
				</li>
			))}
		</ul>
	</div>
)
