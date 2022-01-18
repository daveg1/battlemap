const { OPENCAGE_API_TOKEN } = process.env

function parseCountry(results) {
  const { country, state } = results.components

  // Wikipedia has separate page for Irish battles
  // (evidently Ireland is not scarce of conflict).
  if(state === 'Northern Ireland'){
    return 'Ireland';
  }
  
  // Scotland, England and Wales are given as states.
  if(country === 'United Kingdom'){
    return output.components.state;
  }
  
  return country
}

export default async function() {
  const endpoint = 'https://api.opencagedata.com/geocode/v1/json'
  const options = {
    q: place,
    key: OPENCAGE_API_TOKEN,
    bounds: "-10.72266,34.19817,50.66895,71.21608",
    limit: 1
  }

  // TODO use URL() or QueryString to form URL
  const results = await window.fetch(endpoint, options)
    .then(res => res.json())
    .then(res => res.results)
    .catch(console.error)

  if (!results[0]) {
    return null;
  }

  const output = {
    lat: results[0].geometry.lat,
    lng: results[0].geometry.lng,
    country: parseCountry(results[0])
  }

  return output;
}