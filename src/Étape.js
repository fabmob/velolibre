import React, { useState } from 'react'
import { Markdown } from './utils'
import { useParams } from 'react-router-dom'
import { loadPages, getLastEdit } from './wiki'
import styled from 'styled-components'

var req = require.context('../vélos/1/tuto', true, /\.md$/)
export const articles = loadPages(req)

export default ({}) => {
	const { id } = useParams()
	console.log(id, articles)
	const theOne = articles.find(({ id: id2 }) => id === id2)

	const [lastEditDate, setLastEditDate] = useState(null)

	const { body } = theOne

	getLastEdit(id, setLastEditDate)

	return (
		<div
			css={`
				padding: 1rem;
			`}
		>
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
				<Markdown source={body} />
				<hr />
			</WikiPage>
		</div>
	)
}

const WikiPage = styled.div`
	max-width: 700px;
	margin: 0 auto 4rem;
	h1 {
		text-align: center;
	}
	h2,
	h3,
	h4,
	h5 {
		margin-top: 2rem;
	}
	img {
		max-width: 80%;
		margin: 2rem auto;
		display: block;
	}
	img + em {
		color: #666;
		text-align: center;
		width: 100%;
		display: inline-block;
		margin: 0 auto 1rem;
	}
	hr {
		border: 1px solid #eee;
		width: 70%;
		margin: 2rem auto;
	}
	blockquote {
		border-left: 3px solid #4d4d4d;
		padding-left: 1rem;
		margin-left: 0;
	}
	code {
		background: #eee;
		padding: 0.1rem 0.4rem;
		border-radius: 0.3rem;
		max-width: 100%;
		display: inline-block;
		overflow: auto;
	}

	aside {
		border: 1px solid #ddd;
		border-radius: 0.3rem;
		box-shadow: 1px 3px 8px #ddd;
		padding: 1rem;
		margin: 2rem 0.6rem;
	}
	aside h2,
	aside h3 {
		margin: 0.3rem;
	}
`
