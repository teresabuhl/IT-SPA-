export class Cart {
	constructor() {
		this.key = "IT_SPA_CART";
	}

	cookie() {
		//PRZED: 'key1=val1; key2=val2; . . .'
		let cookies = document.cookie.split(";");

		cookies = cookies.map((cookie) => cookie.trim());
		//PO: ['key1=val1', 'key2=val2', . . .]
		const itSpaCookie = cookies.find((cookie) => cookie.startsWith(this.key));
		//PO: 'IT_SPA_CART=wartosc' LUB undefind
		return itSpaCookie;
	}

	exists() {
		return this.cookie() !== undefined;
	}

	// Pobieramy dane z cookies zawierające informacje o koszyku - jeśli nie ma takich cookie to zwracamy pustą tablicę
	get() {
		if (this.exists()) {
			//'IT_SPA_CART=wartosc'
			const itSpaCookie = this.cookie(); // 'IT_SPA_CART=[1, 2, 3]'
			const cookieValue = itSpaCookie.split("=")[1]; // ['IT_SPA_CART', '[1, 2, 3]']
			// console.log(cookieValue)
			const parsedValue = JSON.parse(cookieValue); // 'wartosc'

			return parsedValue;
		} else {
			this.set([]);
			return [];
		}
	}

	set(value) {
		console.log("cart set value");
		console.log(value);
		const stringifiedValue = JSON.stringify(value);
		document.cookie = `${this.key}=${stringifiedValue}`;
	}

	empty() {
		this.set([]);
	}
}
