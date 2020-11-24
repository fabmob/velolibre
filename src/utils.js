export const domain = (url) => {
	const a = document.createElement('a')
	a.href = url
	const res = a.hostname.replace('www.', '')
	return res === 'localhost' ? null : res
}
