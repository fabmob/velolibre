import ReactMarkdown from 'react-markdown/with-html'
import {Link} from 'react-router-dom'
import gfm from 'remark-gfm'
const ImageRenderer = ({src}) => <img src={imageResizer('l')(src)} />

function RouterLink(props) {
	return props.href.match(/^(https?:)?\/\//) ? (
		<a href={props.href}>{props.children}</a>
	) : (
			<Link to={props.href}>{props.children}</Link>
		)
}

export const Markdown = ({source}) => <ReactMarkdown
	renderers={{image: ImageRenderer, link: RouterLink}}
	source={source}
	escapeHtml={false}
	plugins={[gfm]}
/>

export const domain = (url) => {
	const a = document.createElement('a')
	a.href = url
	const res = a.hostname.replace('www.', '')
	return res === 'localhost' ? null : res
}
