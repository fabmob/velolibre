import correspondance from './correspondance-icônes.yaml'
import vélo from '../vélos/1.yaml'

const domain = (url) => {
	const a = document.createElement('a')
	a.href = url
	const res = a.hostname.replace('www.', '')

	return res === 'localhost' ? null : res
}

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
				}
				li img {
					margin-right: 1rem;
				}
			`}
		><h1>{vélo.nom}</h1>
			<p>{vélo.description}</p>
			<ul>
				{Object.entries(vélo.composants).filter(([_, data]) => data != null).map(
					([composant, {modèle, marque, prix, url}]) => (
						<li>
							<img
							/>
							<div>
								<div css="text-transform: uppercase; font-size: 85%; color: #666">
									{composant}
								</div><div css={`
box-shadow: 0 1px 3px rgba(41, 117, 209, 0.12), 0 1px 2px rgba(41, 117, 209, 0.24);
border: 4px solid var(--lighterColor);
    border-radius: 0.3rem;
	padding: 1rem;

	:hover {
box-shadow: 0px 2px 4px -1px rgba(41, 117, 209, 0.2), 0px 4px 5px 0px rgba(41, 117, 209, 0.14), 0px 1px 10px 0px rgba(41, 117, 209, 0.12);
	}
	

								`}><div>
										<span css="font-size: 90%; font-weight: bold; margin-right: .4rem">{marque}</span>
										<span>{modèle}</span></div>
									<div>{prix} {domain(url) && <span>sur <a href={url}>{domain(url)}</a></span>}</div>
								</div>
							</div>
						</li>
					)
				)}
			</ul>
		</div >
	</div >
)
