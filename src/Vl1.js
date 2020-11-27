import correspondance from './correspondance-icônes.yaml'
import vélo from '../vélos/1.yaml'
import {Card} from './ui'
import {domain} from './utils'
import {Markdown} from './utils'
import {useState} from 'react'


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


	return (<li key={composant}>
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
			<Card><div>
				<span css="font-size: 90%; font-weight: bold; margin-right: .4rem">{marque}</span>
				<span>{modèle}</span></div>
				<div>{prix} {domain(url) && <span>sur <a href={url}>{domain(url)}</a></span>}</div>
			</Card>
		</div>
	</li>
	)
}

const Note = ({data}) => {

	const [open, setOpen] = useState(false)
	if (!data) return null
	const [intro] = data.split('\n')

	return (
		<div>
			<Markdown source={open ? data : intro} />
			<p>
				<button onClick={() => setOpen(!open)}> {open ? 'Réduire' : 'Lire plus'}</button>
			</p>
		</div>

	)
}
