import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { imageResizer } from './utils'

import { articles } from './Étape'

export default () => (
	<div css="p {margin: .3rem 0}">
		<p>Suivez pas à pas ce guide, et vous aurez un vélo.</p>
		<Summary articles={articles} />
	</div>
)

export const Summary = ({ articles }) => (
	<ul css="li {margin-top: .4rem}">
		{articles.map((a) => (
			<li key={a.id}>
				<Bubble>{a.position}</Bubble>
				<Link to={'/vélos/vl1/montage/' + a.id}>{a.id}</Link>
			</li>
		))}
	</ul>
)

const Bubble = styled.span`
	background: var(--color);
	padding: 0.2rem;
	margin: 0 0.4rem;
	border-radius: 1rem;
	width: 1.2rem;
	line-height: 1.2rem;
	color: white;
	display: inline-block;
	text-align: center;
`
