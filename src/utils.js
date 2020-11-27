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


const thumbnailWidth = '320',
	fullWidth = '800'

export const imageResizer = (size) => (src) =>
	src.includes('imgur.com')
		? src.replace(/\.(png|jpg)$/, size + '.jpg')
		: src.includes('unsplash.com')
			? src.replace(
				/w=[0-9]+\&/,
				(_, p1) => `w=${size === 'm' ? thumbnailWidth : fullWidth}&`
			)
			: src.includes('medium.com')
				? src.replace(
					/max\/[0-9]+\//,
					(_, p1) => `max/${size === 'm' ? thumbnailWidth : fullWidth}/`
				)
				: src


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
