const loadMdFiles = (req) =>
	[...req.keys()]
		.filter((key) => !key.includes('brouillon'))
		.map((key) => [key.replace('./', '').replace('.md', ''), req(key).default])

const parseArticles = (rawArticles) =>
	rawArticles.map(([id, string]) => ({
		body: string,
		attributes: {}, //no front matter here yet until we need attributes, it would load a yaml library
		id,
	}))

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
