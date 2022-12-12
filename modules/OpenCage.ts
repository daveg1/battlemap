import superagent from 'superagent'
const key = process.env.OPENCAGE_API_TOKEN

export async function getCoords(place: string) {
	const baseURL = 'https://api.opencagedata.com/geocode/v1/json'
	const querystring = {
		q: place,
		key,
		bounds: '-10.72266,34.19817,50.66895,71.21608',
		limit: 1,
	}

	// Ask OpenCage for coordinates for a given place.
	let results = null
	try {
		const res = await superagent.get(baseURL).query(querystring)
		results = res.body.results
	} catch (error) {
		console.error('OpenCage API error')
	}

	// Get the first result.
	const output = results.shift()

	// If no results, exit.
	if (!output) {
		return null
	}

	const { lat, lng } = output.geometry
	let country = output.components.country

	//console.log(output.components);

	// Special case for Ireland because Wikipedia has a separate page for Irish battles (evidently there are... a lot).
	// Also, Northern Ireland does not have its own section.
	if (output.components.state === 'Northern Ireland') {
		country = 'Ireland'
	}

	// OpenCage doesn't give Scotland, England and Wales as countries.
	else if (country === 'United Kingdom') {
		// They are listed as states.
		country = output.components.state
	}

	return { country, state: output.components.state, city: output.components.city, lat, lng }
}
