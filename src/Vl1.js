import correspondance from './correspondance-icônes.yaml'
import vélo from '../vélos/1.yaml'
import {Card} from './ui'
import {domain} from './utils'
import {Markdown} from './utils'
import {useState} from 'react'
import {Link} from 'react-router-dom'


const isChosen = c => c && ((c.marque && c.modèle) || c.alternatives?.length && (c.alternatives[0].marque && c.alternatives[0].modèle))

export default ({}) => {
	const composants = Object.entries(vélo.composants)
		, chosen = composants.filter(([, d]) => isChosen(d)),
		inclus = chosen.reduce((memo, next) => [...memo, ...(next[1].inclus || (next[1].alternatives && next[1].alternatives[0].inclus) || [])], [])
		, notChosen = composants.filter(([c, d]) => !isChosen(d) && !inclus.find((i) => i === c))

	console.log('AA', inclus)

	return (
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
					justify-content: flex-start;
				}
				li img {
					margin-right: 1rem;
				}
			`}
			><h1>{vélo.nom}</h1>
				<Link to="/documentation/avancement"><div css={` font-weight: bold;
	padding: .1rem 1rem; border-radius: .1rem; color: white; background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 74%, rgba(0,212,255,1) 100%); text-align: center;
	`}>Stade actuel : conception</div></Link>
				<p>{vélo.description}</p>
				<ul>
					{chosen.map(
						item => <Composant item={item} />
					)}
				</ul>
				<h3>Composants pas encore choisis</h3>
				<ul>
					{notChosen.map(
						item => <Composant item={item} />
					)}
				</ul>
			</div >
		</div >
	)
}

const ComposantImage = ({composant}) =>

	<div css="text-align: center; max-width: 6rem; margin-right: 1rem">
		<img
			css="width: 5rem" src={'/composants/' + correspondance[composant] + '.svg'}
		/>
		<div css="text-transform: uppercase; font-size: 85%; color: #666">
			{composant}
		</div>
	</div>

const Missing = () =>
	<div css="color: red">A sélectionner</div>
const ComposantChoices = ({data, composant}) => {

	if (!data) return <Missing />

	const note = data.note,
		chosen = data.alternatives ? data.alternatives[0] : data
		, {modèle, marque} = chosen
		, sold = chosen.achat ? chosen.achat[0] : chosen,
		{prix, url} = sold,
		inclus = data.inclus || chosen.inclus || sold.inclus
	return (
		<div>
			<Note data={note} />
			{modèle ?
				<Card css="text-align: center;width: 20rem"><div>
					<span css="font-size: 90%; font-weight: bold; margin-right: .4rem">{marque}</span>
					<span>{modèle}</span></div>
					<div>{prix} {domain(url) && <span>sur <a href={url}>{domain(url)}</a></span>}</div>
					{inclus && <div
						css={`ul {padding: 0;display: inline-block; display: flex; align-items: center; justify-content: center} li{margin: 0 .6rem} `}
					><ul ><li>Inclus : </li>{inclus.map(ci => <li>

						<img alt={ci}
							css="width: 2rem" src={'/composants/' + correspondance[ci] + '.svg'} />

					</li>)}</ul></div>}
				</Card>
				: <Missing />}
		</div>
	)
}
const Composant = ({item:
	[composant, data]
}) => {



	return (<li
		css="border-bottom: 1px solid #ddd; padding-bottom: 1.6rem; "
		key={composant}>
		<ComposantImage composant={composant} />
		<ComposantChoices composant={composant} data={data} />
	</li>
	)
}

const Note = ({data}) => {

	const [open, setOpen] = useState(false)
	if (!data) return null
	const [intro] = data.split('\n')

	return (
		<div css={`p {margin-bottom: .3rem} button {margin: .3rem}`}>
			<Markdown source={open ? data : intro} />
			<div
				css="display: flex; justify-content: end; margin-bottom: 1rem; padding-right: 1rem"
			>
				<button onClick={() => setOpen(!open)}> {open ? 'Réduire' : 'Lire plus'}</button>
			</div>
		</div >

	)
}
