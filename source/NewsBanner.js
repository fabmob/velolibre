import { useLocalStorage, writeStorage } from '@rehooks/local-storage'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import lastRelease from '../dist/data/last-release.json'

const localStorageKey = 'last-viewed-release'

export const hideNewsBanner = () =>
	writeStorage(localStorageKey, lastRelease.name)

export const determinant = (word) => (/^[aeiouy]/i.exec(word) ? 'd’' : 'de ')

export default function NewsBanner() {
	const [lastViewedRelease] = useLocalStorage(localStorageKey)

	// We only want to show the banner to returning visitors, so we initiate the
	// local storage value with the last release.
	if (lastViewedRelease === undefined) {
		hideNewsBanner()
		return null
	}

	const showBanner = lastViewedRelease !== lastRelease.name

	return showBanner ? (
		<div className="ui__ banner news">
			<span>
				✨ Découvrez les nouveautés de la version{' '}
				<Link to={'/nouveautés'}>{lastRelease.name.toLowerCase()}</Link>
			</span>
			<span onClick={hideNewsBanner} className="ui__ close-button">
				{' '}
				&times;
			</span>
		</div>
	) : null
}
