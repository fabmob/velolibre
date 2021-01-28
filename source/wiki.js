import styled from 'styled-components'

const loadMdFiles = (req) =>
	[...req.keys()]
		.filter((key) => !key.includes('brouillon'))
		.map((key) => [key.replace('./', '').replace('.md', ''), req(key).default])

const parseArticles = (rawArticles) =>
	rawArticles.map(([positionAndId, string]) => {
		const list = positionAndId.split(/(\d\-)/),
			id = list.length > 1 ? list[2] : list[0]

		return {
			body: string,
			attributes: {}, //no front matter here yet until we need attributes, it would load a yaml library
			id,
			title: id[0].toUpperCase() + id.substring(1),
			position: list.length > 1 ? list[1].replace('-', '') : null,
		}
	})

export const loadPages = (req) => parseArticles(loadMdFiles(req))

export const dateCool = (date) =>
	date.toLocaleString(undefined, {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	})

const repo = 'laem/velolibre'

export const getLastEdit = (name, action) =>
	fetch(
		`https://api.github.com/repos/${repo}/commits?path=src%2Farticles%2F${name}.md&page=1&per_page=1`
	)
		.then((res) => res.json())
		.then((json) => {
			try {
				const date = json[0].commit.committer.date
				action(dateCool(new Date(date)))
			} catch (e) {
				action('')
			}
		})
export const WikiPage = styled.div`
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
		vertical-align: middle;
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
