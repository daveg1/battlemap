import geolib from 'geolib'

export function isWithinRadius(battleCoords, searchCoords, radius) {
	if (
		geolib.isPointWithinRadius(
			{ latitude: battleCoords.lat, longitude: battleCoords.lng },
			{ latitude: searchCoords.lat, longitude: searchCoords.lng },
			radius,
		)
	) {
		return true
	}
	return false
}
