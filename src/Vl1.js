import correspondance from './correspondance-icônes.yaml'
import vélo from '../vélos/1.yaml'
import {Card} from './ui'
import {domain} from './utils'
import {Markdown} from './utils'
import {useState} from 'react'
import {Link} from 'react-router-dom'


export default ({}) => (
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
				{Object.entries(vélo.composants).filter(([_, data]) => data != null).map(
					item => <Composant item={item} />
				)}
			</ul>
		</div >
	</div >
)

const Composant = ({item:
	[composant, data]
}) => {
	const note = data.note,
		chosen = data.alternatives ? data.alternatives[0] : data
		, {modèle, marque} = chosen
		, sold = chosen.achat ? chosen.achat[0] : chosen,
		{prix, url} = sold


	return (<li
		css="border-bottom: 1px solid #ddd; padding-bottom: 1.6rem; "
		key={composant}>
		<div css="text-align: center; max-width: 6rem; margin-right: 1rem">
			<img
				css="width: 5rem" src={'/composants/' + correspondance[composant] + '.svg'}
			/>
			<div css="text-transform: uppercase; font-size: 85%; color: #666">
				{composant}
			</div>
		</div>
		<div>
			<Note data={note} />
			{modèle ?
				<Card css="text-align: center;width: 16rem"><div>
					<span css="font-size: 90%; font-weight: bold; margin-right: .4rem">{marque}</span>
					<span>{modèle}</span></div>
					<div>{prix} {domain(url) && <span>sur <a href={url}>{domain(url)}</a></span>}</div>
				</Card>
				: <div css="color: red">Composant manquant</div>}
		</div>
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
