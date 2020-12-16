import { Link } from 'react-router-dom'
import { imageResizer } from './utils'
export default ({ vélo, chosen, notChosen, prixTotal }) => (
	<div css="p {margin: .3rem 0}">
		<p>Page en cours de construction ;-)</p>
		<img src={imageResizer('l')('https://imgur.com/FMauafV.png')} />
	</div>
)
