import $ from "jquery";
import { routeChange } from "../router/route-change";

import "./login.scss";
import { userLogin } from "../navigation/user-login";
import { Auth } from "../common/auth-service";

export const login = () => {
	const auth = new Auth();
	const fragment = $(new DocumentFragment());

	const main = $(`
	<div class="login-main background-image"></div>
	`);

	const container = $(`
		<div class="box"></div>
	`);

	const form = $(`
		<form action="#!">
			<h2>Logowanie</h2>
			<!-- Email -->
			<div class="inputBox">
				<input type="email" id="email" autocomplete="off" required>
				<label>E-mail</label>
			</div>
			<!-- Password -->
			<div class="inputBox">
				<input type="password" id="password" autocomplete="off" required>
				<label>Hasło</label>
			</div>
		</form>
	`);

	const btn = $(`
	<button type="submit">Zaloguj</button>
	`);

	const alert = $(
		`<div class="alert alert-danger alert-dismissible fade show mt-4 mb-4">`
	);
	alert.css({ display: "none" });

	const showAlert = (text) => {
		alert.css({ display: "" });
		alert.text(text);
	};

	const hideAlert = () => {
		alert.css({ display: "none" });
		alert.text("");
	};

	btn.on("click", (e) => {
		e.preventDefault();
		hideAlert();
		const email = $("#email").val();
		const password = $("#password").val();

		if (email.trim() === "" || password.trim() === "") {
			showAlert("Wprowadź wszystkie dane!");
			return;
		}

		let usersData = [];
		fetch("http://localhost:3000/users")
			.then((res) => res.json())
			.then((resJSON) => {
				usersData = resJSON;
				let found = usersData.some((item) => {
					return item.email === email && item.password === password;
				});

				const date = new Date();
				const time = date.getTime();
				const expireTime = time + 1000 * 3600;
				date.setTime(expireTime);

				if (found) {
					auth.set(email);
					$(document).trigger(userLogin);
					$(document.body).trigger(routeChange, { path: "/" });
				} else {
					showAlert("Nieprawidłowy e-mail lub hasło!");
				}
			});
	});
	$(form).append(alert);
	$(form).append(btn);
	$(container).append(form);
	$(main).append(container);
	fragment.append(main);

	return Promise.resolve(fragment);
};
