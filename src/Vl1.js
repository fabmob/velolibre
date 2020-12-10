import correspondance from './correspondance-icônes.yaml'
import vélo from '../vélos/1.yaml'
import { Card } from './ui'
import { domain } from './utils'
import { Markdown } from './utils'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const isChosen = (c) =>
	c &&
	((c.marque && c.modèle) ||
		(c.alternatives?.length &&
			c.alternatives[0].marque &&
			c.alternatives[0].modèle))

const firstBuyLinkAttribute = (c, attribute) =>
	(c && c[attribute]) ||
	(c && c.alternatives && c.alternatives[0][attribute]) ||
	(c &&
		c.alternatives &&
		c.alternatives[0].achat &&
		c.alternatives[0].achat[0][attribute])

const getPrice = (el) => (el ? +el.replace('€', '') : 0)
export default ({}) => {
	const composants = Object.entries(vélo.composants),
		chosen = composants.filter(([, d]) => isChosen(d)),
		inclus = chosen.reduce(
			(memo, next) => [
				...memo,
				...(next[1].inclus ||
					(next[1].alternatives && next[1].alternatives[0].inclus) ||
					[]),
			],
			[]
		),
		notChosen = composants.filter(
			([c, d]) => !isChosen(d) && !inclus.find((i) => i === c)
		),
		prixTotal = chosen.reduce(
			(memo, [, c]) => memo + getPrice(firstBuyLinkAttribute(c, 'prix')),
			0
		)

	return (
		<div
			css={`
				max-width: 700px;
				padding: 0 1rem;
				margin: 0 auto;
				ul {
					list-style-type: none;
				}
				> a {
					text-decoration: none;
				}
			`}
		>
			<h1>{vélo.nom}</h1>
			<Link to="/documentation/avancement">
				<div
					css={`
						font-weight: bold;
						padding: 0.3rem 1rem;
						border-radius: 0.1rem;
						color: white;
						background: linear-gradient(
							90deg,
							rgba(2, 0, 36, 1) 0%,
							rgba(9, 9, 121, 1) 74%
						);
						text-align: center;
						border-radius: 0.3rem;
					`}
				>
					Stade actuel : conception
				</div>
			</Link>
			<p>{vélo.description}</p>
			<p>
				Prix provisoire : <strong>{prixTotal} €</strong>
				<button css="margin-left: 1rem" onClick={() => alert('Bientôt ;)')}>
					Assembler
				</button>
			</p>
			<ul css="margin-top: 3rem">
				{chosen.map((item) => (
					<Composant item={item} />
				))}
			</ul>
			<h3>Composants pas encore choisis</h3>
			<ul>
				{notChosen.map((item) => (
					<Composant item={item} />
				))}
			</ul>
		</div>
	)
}

const ComposantImage = ({ composant }) => (
	<div
		css={`
			text-align: center;
			max-width: 6rem;
			@media (min-width: 600px) {
				margin-right: 3rem;
			}
		`}
	>
		<img
			css="width: 6rem"
			src={'/composants/' + correspondance[composant] + '.svg'}
		/>
		<div css="text-transform: uppercase; font-size: 85%; color: #666">
			{composant}
		</div>
	</div>
)

const Missing = () => <div css="text-align: center; font-size: 200%">🔭</div>

const cascading = (list) =>
	list.reduce((memo, next) => {
		const first = Array.isArray(next) ? next[0] : next
		return next ? { ...memo, ...first } : memo
	}, {})
const Alternative = ({ alternative, chosen }) => {
	const { prix, url, inclus, marque, modèle, rupture } = cascading([
		alternative,
		alternative.achat,
	])

	const ruptureColor = rupture && (rupture['tailles dispo'] ? 'orange' : 'red'),
		ruptureType =
			rupture && rupture['tailles dispo'] ? 'tailles limitées' : 'rupture'

	return (
		<Card
			css={`
				margin: 1rem;
				width: 12rem;
				div {
					margin-top: 0.4rem;
				}
				${chosen && `border: 4px solid var(--color)`}
			`}
		>
			<div>
				<span css="font-size: 90%; font-weight: bold; margin-right: .4rem">
					{marque}
				</span>
				<span>{modèle}</span>
			</div>
			{inclus && (
				<div
					css={`
						ul {
							padding: 0;
							display: inline-block;
							display: flex;
							align-items: center;
							justify-content: start;
						}
						li {
							margin: 0 0.6rem;
						}
					`}
				>
					<ul>
						<li>+</li>
						{inclus.map((ci) => (
							<li>
								<img
									alt={ci}
									css="width: 2rem"
									src={'/composants/' + correspondance[ci] + '.svg'}
								/>
							</li>
						))}
					</ul>
				</div>
			)}
			<div>
				<div>
					<span css="background: var(--lighterColor); padding: .1rem .3rem; border-radius: .3rem; margin-right: .3rem">
						{prix}
					</span>
					{rupture && (
						<span
							css={`
								color: ${ruptureColor};
							`}
						>
							{ruptureType}
						</span>
					)}
				</div>
				<div>
					{domain(url) && (
						<a href={url} target="_blank">
							{domain(url)}
						</a>
					)}
				</div>
			</div>
		</Card>
	)
}

const ComposantChoices = ({ data, composant }) => {
	if (!data) return <Missing />

	const alternatives = data.alternatives || (data.modèle ? [data] : [])

	const Alternatives = !alternatives.length ? (
		<Missing />
	) : (
		<div
			css={`
				> div {
					whitespace: nowrap;
					display: flex;
					flex-wrap: wrap;
				}
				@media (max-width: 800px) {
					overflow-y: hidden;
					overflow-x: scroll;
					height: 16rem;
					max-width: 90vw;
					> div {
						whitespace: nowrap;
						display: flex;
						flex-wrap: nowrap;
					}
				}
			`}
		>
			<div>
				{alternatives.map((alternative, i) => (
					<Alternative {...{ alternative, chosen: i === 0 }} />
				))}
			</div>
		</div>
	)
	return <div>{Alternatives}</div>
}
const Composant = ({ item: [composant, data] }) => {
	return (
		<li
			css={`
				padding: 2rem 0 0rem;
				display: flex;
				flex-direction: column;
				margin: 1rem;
				align-items: center;
				justify-content: center;
				img {
					margin-right: 1rem;
				}
			`}
			key={composant}
		>
			<ComposantImage composant={composant} />
			<Note data={data?.note} />
			<ComposantChoices composant={composant} data={data} />
		</li>
	)
}

const Note = ({ data }) => {
	const [open, setOpen] = useState(false)
	if (!data) return null
	const [intro] = data.split('\n')

	return (
		<div
			css={`
				p {
					margin-bottom: 0.3rem;
					max-width: 30rem;
				}
				button {
					margin: 0.3rem;
				}
			`}
		>
			<Markdown source={open ? data : intro} />
			<div css="display: flex; justify-content: end; margin-bottom: 1rem; padding-right: 1rem">
				<button className="simple" onClick={() => setOpen(!open)}>
					{' '}
					{open ? 'Réduire' : 'Lire plus'}
				</button>
			</div>
		</div>
	)
}
