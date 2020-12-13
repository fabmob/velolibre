import React, { useState } from 'react'
import { reduceComponent, extractDomain } from './Vl1'
import { Link } from 'react-router-dom'

const selectedStyle = `
				background: var(--color) !important;
				color: white !important;
					`

export default ({ chosen, notChosen, composants, prixTotal }) => {
	const [mode, setMode] = useState('prix')

	if (mode === 'groupé') return <div>Pas encore implémenté ! </div>

	const grouped = chosen.reduce((memo, [name, data]) => {
		const item = reduceComponent(data)
		const shop = extractDomain(item.url)
		return { ...memo, [shop]: [...(memo[shop] || []), { ...item, name }] }
	}, {})

	return (
		<div>
			<Link to="/vélos/vl1">⬅ Retour aux spécifications</Link>
			<div
				css={`
					> button {
						margin: 1rem;
					}
				`}
			>
				<button
					css={mode === 'prix' ? selectedStyle : ''}
					className="simple"
					onClick={() => setMode('prix')}
				>
					Mode plus bas prix
				</button>
				<button
					css={mode === 'groupé' ? selectedStyle : ''}
					className="simple"
					onClick={() => setMode('groupé')}
				>
					Mode commandes groupées
				</button>
			</div>
			<ul>
				{Object.entries(grouped)
					.sort(([, i1], [, i2]) => i1.length < i2.length)
					.map(([shop, items]) => (
						<li css="margin-bottom: 1rem">
							<div>{shop}</div>
							{items.map(({ name, url, prix }) => (
								<li
									css={`
										a {
											display: inline-block;
											text-decoration: none;
											border: 1px solid var(--color);
											padding: 0.1rem 0.3rem;
											margin: 0.1rem 1rem;
										}
										a > span {
											margin: 0 1rem;
										}
									`}
								>
									<a href={url} target="_blank">
										<span>{name}</span>
										<span>{prix}</span>
									</a>
								</li>
							))}
						</li>
					))}
			</ul>
		</div>
	)
}
