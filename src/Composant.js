import { Card } from './ui'
import { domain } from './utils'
import { Markdown } from './utils'
import { useState } from 'react'
import correspondance from './correspondance-icônes.yaml'

export default ({ item: [composant, data] }) => {
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

export const cascading = (list) =>
	list.reduce((memo, next) => {
		return next ? { ...memo, ...next } : memo
	}, {})
const Alternative = ({ data, alternative, chosen }) => {
	const { prix, url, inclus, marque, modèle, rupture, quantité } = cascading([
		data,
		alternative,
		alternative.achats,
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
									title={ci}
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
						{quantité ? `${quantité} x ` : ''} {prix}
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
					<Alternative {...{ data, alternative, chosen: i === 0 }} />
				))}
			</div>
		</div>
	)
	return <div>{Alternatives}</div>
}
