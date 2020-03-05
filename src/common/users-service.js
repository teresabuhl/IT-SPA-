export const usersService = {
	getUsers() {
		return fetch("http://localhost:3000/users").then(response =>
			response.json()
		);
	}
};
