// Open Cage search results
export interface IReverseGeocoding {
	results: [
		{
			components: {
				country: string
				state: string
				city: string
			}
			geometry: {
				lat: string
				lng: string
			}
		},
	]
}
