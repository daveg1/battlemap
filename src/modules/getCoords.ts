import fetch from 'node-fetch'
import { IReverseGeocoding } from 'src/interfaces/ReverseGeocoding.js'

function findCountry(country: string, state: string) {
	// Scotland, England and Wales are considered states
	if (country === 'United Kingdom') {
		country = state
	}

	// Wikipedia has a separate page for Irish battles, including Northern Ireland
	if (state === 'Northern Ireland') {
		return 'Ireland'
	}

	// Otherwise use as is
	return country
}

export async function getCoords(place: string) {
	const baseURL = 'https://api.opencagedata.com/geocode/v1/json'
	const params = new URLSearchParams({
		q: place,
		key: process.env.OPENCAGE_API_TOKEN ?? '',
		bounds: '-10.72266,34.19817,50.66895,71.21608',
		limit: '1',
	})
	const url = `${baseURL}?${params}`

	try {
		// Ask OpenCage for coordinates for a given place
		const res = (await fetch(url).then((res) => res.json())) as IReverseGeocoding

		if (res && res.results[0]) {
			// Get first result
			const output = res.results[0]
			const country = findCountry(output.components.country, output.components.state)

			return {
				country,
				state: output.components.state,
				city: output.components.city,
				lat: output.geometry.lat,
				lng: output.geometry.lng,
			}
		}

		throw new Error('No data')
	} catch (error) {
		console.error('OpenCage API error', error)
	}
}
