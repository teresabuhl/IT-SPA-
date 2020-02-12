export const roomsService = {
	getRooms() {
		// pobiera liste wszystkoch pokoi
		return fetch("http://localhost:3000/rooms").then(response =>
			response.json()
		);
	}
};
