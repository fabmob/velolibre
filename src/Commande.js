import React, { useState } from 'react'
import { getPrice, reduceComponent, extractDomain } from './Vl1'
import { Link } from 'react-router-dom'

const selectedStyle = `
				background: var(--color) !important;
				color: white !important;
					`

const modes = {
	'à la main':
		"On suit simplement l'ordre des liens d'achat dans la configuration, le premier sera affiché ici, les autres ignorés.",
	'plus bas prix':
		"Le lien d'achat le moins chers est sélectionné pour chaque composant. ⏳ mode pas encore dispo.",
	'commandes groupées':
		'On prévilégie automatiquement le peu de magasins différents, plutôt que le prix. ⏳ Mode pas encore dispo.',
}

export default ({ chosen, notChosen, composants, prixTotal }) => {
	const [mode, setMode] = useState('à la main')

	const grouped = chosen.reduce((memo, [name, data]) => {
		const item = reduceComponent(data)
		const shop = extractDomain(item.url)
		return { ...memo, [shop]: [...(memo[shop] || []), { ...item, name }] }
	}, {})

	// I don't want to import Ramda or a similar library
	// TODO but this should be clarified
	const totalPrice = Object.values(grouped).reduce(
		(m, n) =>
			m +
			n.reduce(
				(mm, { prix, quantité }) => mm + (quantité || 1) * getPrice(prix),
				0
			),
		0
	)

	return (
		<div>
			<p>Vélolibre ne vend rien, mais vous guide dans l'achat des pièces.</p>
			<div
				css={`
					margin: 1rem 0;
					> button {
						margin: 0 0.4rem;
					}
				`}
			>
				{Object.entries(modes).map(([m, explication]) => (
					<button
						css={mode === m ? selectedStyle : ''}
						className="simple"
						onClick={() => setMode(m)}
					>
						Mode {m}
					</button>
				))}
			</div>
			<p>
				<em>{modes[mode]}</em>
			</p>
			<p>
				💡 Astuce : pour vérifier que la commande est complète, vérifier bien
				que le prix colle à 1€ près dans chaque panier.
			</p>
			{mode === 'à la main' && (
				<>
					Total : {totalPrice}€
					<ul>
						{Object.entries(grouped)
							.sort(([, i1], [, i2]) => i1.length < i2.length)
							.map(([shop, items]) => {
								const price = items.reduce(
									(memo, i) => memo + (i.quantité || 1) * getPrice(i.prix),
									0
								)
								return (
									<li css="margin-bottom: 1rem">
										<div>
											{shop} {price}€
										</div>
										{items.map(({ quantité, name, url, prix }) => (
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
													{quantité && <span> x {quantité}</span>}
												</a>
											</li>
										))}
									</li>
								)
							})}
					</ul>
				</>
			)}
		</div>
	)
}
