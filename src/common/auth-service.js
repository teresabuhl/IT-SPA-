export class Auth {
	constructor() {
		this.key = "user_token";
	}

	cookie() {
		//PRZED: 'key1=val1; key2=val2; . . .'
		const cookies = document.cookie.split(";");
		//PO: ['key1=val1', 'key2=val2', . . .]
		// const itSpaCookie = cookies.find(cookie => {
		// 	console.log(cookie.startsWith(this.key));
		// 	console.log(cookie.includes(this.key));
		// 	cookie.includes(this.key);
		// 	// return
		// });

		// console.log(cookies);
		const itSpa = document.cookie.split(";").filter(c => {
			// console.log(c.startsWith(" user_token"), c);
			if (c.startsWith(" " + this.key)) {
				return c;
			}
		});

		console.log(itSpa);
		//PO: 'IT_SPA_CART=wartosc' LUB undefind
		if (itSpa.length > 0) {
			return itSpa;
		} else {
			return undefined;
		}
	}

	exists() {
		return this.cookie() !== undefined;
	}

	get() {
		if (this.exists()) {
			//'IT_SPA_CART=wartosc'
			console.log("check");
			const itSpaCookie = this.cookie(); // 'IT_SPA_CART=[1, 2, 3]'
			// console.log(itSpaCookie);
			const cookieValue = itSpaCookie[0].split("=")[1]; // ['IT_SPA_CART', '[1, 2, 3]']
			// const parsedValue = JSON.parse(cookieValue); // 'wartosc'
			return cookieValue;
		} else {
			// this.set([]);
			// console.log("nope");
			return undefined;
		}
	}

	set(value) {
		console.log(value);
		if (value === "dropSession") {
			console.log("drop");
			document.cookie = `${this.key}="";max-age="-1";expires="-1"`;
		} else {
			const date = new Date();
			const time = date.getTime();
			const expireTime = time + 1000 * 3600;
			date.setTime(expireTime);

			const stringifiedValue = JSON.stringify(value);
			document.cookie = `${this.key}=${value};expires=${date}`;
		}
	}

	logout() {
		this.set("dropSession");
	}
}
