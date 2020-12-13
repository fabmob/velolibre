import { Link, Route, Switch } from 'react-router-dom'
import vélo from '../vélos/1.yaml'
import Commande from './Commande'
import { cascading } from './Composant'
import Specifications from './Specifications'
import velos from './velos.yaml'

const hasMinimumAttributes = (el) => el.marque && el.modèle && el.prix && el.url

export const reduceComponent = (c) =>
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

export const getPrice = (el) =>
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
				a {
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
					<Commande {...{ composants, chosen, notChosen, prixTotal }} />
				</Route>
				<Route path="/vélos/vl1">
					<Specifications {...{ vélo, prixTotal, chosen, notChosen }} />
				</Route>
			</Switch>
		</div>
	)
}

export const extractDomain = (url) => {
	const tmp = document.createElement('a')
	tmp.href = url
	return tmp.hostname.replace('www.', '')
}
