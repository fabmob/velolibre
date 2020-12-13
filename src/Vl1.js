import vélo from '../vélos/1.yaml'
import { useState } from 'react'
import { Route, Link, Switch } from 'react-router-dom'
import velos from './velos.yaml'
import Composant, { cascading } from './Composant'

const hasMinimumAttributes = (el) => el.marque && el.modèle && el.prix && el.url

const reduceComponent = (c) =>
	cascading([
		c,
		...(c.achat || []),
		c.alternatives?.[0],
		...(c.alternatives?.[0].achat || []),
	])

const isChosen = (c) => hasMinimumAttributes(reduceComponent(c))

const firstBuyLinkAttribute = (c, attribute) =>
	(c && c[attribute]) ||
	(c && c.alternatives && c.alternatives[0][attribute]) ||
	(c &&
		c.alternatives &&
		c.alternatives[0].achat &&
		c.alternatives[0].achat[0][attribute])

const getPrice = (el) =>
	typeof el === 'number'
		? (() => {
				throw Error("Il semble manquer une unité sur l'attribut 'prix'")
		  })()
		: el
		? +el.replace('€', '')
		: 0
export default ({}) => {
	const composants = Object.entries(vélo.composants),
		// components that have been researched, that have a candidate witnullh a brand, name, buy url, etc.
		// but one of them could be also included in another chosen components !
		chosenRaw = composants.filter(([, d]) => isChosen(d)),
		inclus = chosenRaw.reduce(
			(memo, next) => [
				...memo,
				...(next[1].inclus ||
					(next[1].alternatives && next[1].alternatives[0].inclus) ||
					[]),
			],
			[]
		),
		// don't take into account components included in other chosen components
		chosen = chosenRaw.filter(([c]) => !inclus.includes(c)),
		notChosen = composants.filter(
			([c, d]) => !isChosen(d) && !inclus.includes(c)
		),
		prixTotal = chosen.reduce(
			(memo, [, c]) =>
				memo +
				(firstBuyLinkAttribute(c, 'quantité') || 1) *
					getPrice(firstBuyLinkAttribute(c, 'prix')),
			0
		),
		image = velos.find(({ nom }) => nom === vélo.nom).image

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
			<header css="margin-bottom: 3rem">
				<div css="display: flex; align-items: center; >img {margin-right: 1rem}">
					{image && <img src={require('./' + image).default} />}
					<h1>{vélo.nom}</h1>
				</div>
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
			</header>
			<Switch>
				<Route path="/vélos/vl1/assembler">
					<Tableau {...{ composants, chosen, notChosen, prixTotal }} />
				</Route>
				<Route path="/vélos/vl1">
					<Specifications {...{ prixTotal, chosen, notChosen }} />
				</Route>
			</Switch>
		</div>
	)
}

const selectedStyle = `
						background: var(--color) !important;
						color: white !important;
					`

const extractDomain = (url) => {
	const tmp = document.createElement('a')
	tmp.href = url
	return tmp.hostname.replace('www.', '')
}

const Tableau = ({ chosen, notChosen, composants, prixTotal }) => {
	const [mode, setMode] = useState('prix')

	if (mode === 'groupé') return <div>Pas encore implémenté ! </div>

	const grouped = chosen.reduce((memo, [name, data]) => {
		const item = reduceComponent(data)
		const shop = extractDomain(item.url)
		return { ...memo, [shop]: [...(memo[shop] || []), { ...item, name }] }
	}, {})

	return (
		<div>
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

const Specifications = ({ chosen, notChosen, prixTotal }) => (
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
