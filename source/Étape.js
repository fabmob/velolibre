import React, { useState } from 'react'
import { Markdown } from './utils'
import { useParams } from 'react-router-dom'
import { WikiPage, loadPages, getLastEdit } from './wiki'
import { Summary } from './Montage'

var req = require.context('../vélos/1/tuto', true, /\.md$/)
export const articles = loadPages(req)

export default ({}) => {
	const { id } = useParams()
	console.log(id, articles)
	const theOne = articles.find(({ id: id2 }) => id === id2)

	const [lastEditDate, setLastEditDate] = useState(null)

	const { body, position, title } = theOne

	getLastEdit(id, setLastEditDate)

	return (
		<div
			css={`
				padding: 1rem;
				header {
					display: flex;
					align-items: center;
				}
				header h2 {
					margin-right: 1rem;
				}
			`}
		>
			<Summary articles={articles} />
			<header>
				<h2>{title}</h2>
				<span>
					{position} / {articles.length}
				</span>
			</header>
			<WikiPage>
				<p
					css={`
						text-align: center;
						font-style: italic;
						opacity: 0.8;
						margin-bottom: 2rem;
					`}
				>
					<small>
						{lastEditDate && (
							<span>
								Mis à jour le{' '}
								<a
									href={`https://github.com/${repo}/blob/master/src/articles/${id}.md`}
								>
									{lastEditDate}
								</a>
							</span>
						)}
					</small>
				</p>
				<Markdown imageRenderer={ImageRenderer(id)} source={body} />
				<hr />
			</WikiPage>
		</div>
	)
}

const ImageRenderer = (dir) => ({ src }) => {
	const imageBase = 'https://velolibre-images.netlify.app/'
	const ext = 'webp'

	return (
		<a href={`${imageBase}${dir}/${src}.${ext}`}>
			<img src={`${imageBase}${dir}/${src}.medium.${ext}`} />
		</a>
	)
}
