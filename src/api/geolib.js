import geolib from 'geolib'

// TODO refactor params

/**
 * Checks if a point is within a specified radius
 * @param {*} battleCoords 
 * @param {*} searchCoords 
 * @param {*} slider 
 * @returns 
 */
export function isWithinRadius(battleCoords, searchCoords, slider) {
  // TODO wtf is this code
  battleCoords.latitude = battleCoords.lat
  battleCoords.longitude = battleCoords.lng
  
  searchCoords.latitude = searchCoords.lat
  searchCoords.longitude = searchCoords.lng

  const isValid = geolib.isPointWithinRadius(
    { latitude, longitude } = battleCoords,
    { latitude, longitude } = searchCoords,
    slider
  )

  return isValid
}