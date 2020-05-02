import { userLogin } from "../navigation/user-login";

export class Auth {
	constructor() {
		this.key = "user_token";
	}

	cookie() {
		let cookies = document.cookie.split(";");

		cookies = cookies.map((cookie) => cookie.trim());
		const itSpaCookie = cookies.find((cookie) => cookie.startsWith(this.key));

		return itSpaCookie;
	}

	exists() {
		return this.cookie() !== undefined;
	}

	get() {
		if (this.exists()) {
			const itSpaCookie = this.cookie();
			const cookieValue = itSpaCookie.split("=")[1];
			return cookieValue;
		} else {
			return undefined;
		}
	}

	set(value) {
		console.log("auth set");
		console.log(value);
		if (value === "dropSession") {
			document.cookie = `${this.key}="";expires="Thu, 01 Jan 1970 00:00:00 UTC"`;
		} else {
			const date = new Date();
			const time = date.getTime();
			const expireTime = time + 1000 * 3600;
			date.setTime(expireTime);

			document.cookie = `${this.key}=${value};expires=${date}`;
		}
	}

	logout() {
		this.set("dropSession");
	}
}
