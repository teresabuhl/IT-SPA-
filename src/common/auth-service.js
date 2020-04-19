export class Auth {
	constructor() {
		this.key = "user_token";
	}

	cookie() {
		const cookies = document.cookie.split(";");

		const itSpa = cookies.filter((c) => {
			if (c.startsWith(" " + this.key)) {
				return c;
			}
		});

		console.log(itSpa);
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
			console.log("check");
			const itSpaCookie = this.cookie();
			const cookieValue = itSpaCookie[0].split("=")[1];
			return cookieValue;
		} else {
			return undefined;
		}
	}

	set(value) {
		console.log(value);
		if (value === "dropSession") {
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
