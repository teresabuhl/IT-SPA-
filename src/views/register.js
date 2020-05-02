import $ from "jquery";
import { main_router } from "../it-spa";
import "./register.scss";

export const register = () => {
	const fragment = $(new DocumentFragment());

	const main = $(`
	<div class="register-main background-image"></div>
	`);

	const container = $(`<div class="box"></div>`);

	const form = $(`
	<form action="#!">
    <h2>Rejestracja</h2>
		<div class="name-main">
				<!-- First name -->
        <div class="inputBox firstName">
          <input type="text" id="firstName" name="firstName" required>
					<label>Imię</label>
				</div>
				<!-- Last name -->
        <div class="inputBox lastName">
          <input type="text" id="lastName" name="lastName" required>
					<label>Nazwisko</label>				
				</div>
    </div>
		<!-- E-mail -->
		<div class="inputBox">
    	<input type="email" id="email" name="email" required>
			<label>E-mail</label>
		</div?
		<!-- Password -->
		<div class="inputBox">
    	<input type="password" id="password" required aria-describedby="defaultRegisterFormPasswordHelpBlock">
			<label>Hasło</label>
		</div>

		<!-- Password -->
		<div class="inputBox">
    	<input type="password" id="repPassword" required aria-describedby="defaultRegisterFormPasswordHelpBlock">
			<label>Powtórz hasło</label>
			<small id="defaultRegisterFormPasswordHelpBlock" class="form-text text-muted mb-4 registerHelpBlock">
        At least 8 characters and 1 digit
		</small>
		</div>
	</form>
`);

	const btn = $(`
		<button type="submit">Utwórz konto</button>`);

	const alert = $(`
	<div class="alert alert-danger alert-dismissible fade show mt-4 mb-4" role="alert mt"
		style="display: none;"
	>
	</div>`);

	const showAlert = (text) => {
		alert.css({ display: "" });
		alert.text(text);
	};

	const hideAlert = () => {
		alert.css({ display: "none" });
		alert.text("");
	};

	const registerUser = (obj) => {
		fetch("http://localhost:3000/users", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(obj),
		}).then((res) => {
			if (res.status === 201) {
				main_router.navigate("/login");
			}
		});
	};

	btn.on("click", (e) => {
		e.preventDefault();
		hideAlert();
		const firstName = $("#firstName").val().trim();
		const lastName = $("#lastName").val().trim();
		const email = $("#email").val().trim();
		const password = $("#password").val().trim();
		const repPassword = $("#repPassword").val().trim();

		// Kolejne if'y odpoweidzialne za "parsowanie" danych -
		// jeśli dane nie spełniają restrykcji --> return --> kończymy w danym miejscy działanie funkcji, czyli to co jest po "return" nie wykonuje się

		if (
			firstName === "" ||
			lastName === "" ||
			email === "" ||
			password === "" ||
			repPassword === ""
		) {
			showAlert("Wprowadź wszystkie dane!");
			return;
		}

		if (repPassword !== password) {
			showAlert("Podane hasła nie są zgodne!");
			return;
		}

		if (password.length < 6) {
			showAlert("Hasło powinno mieć minimum 6 znaków!");
			return;
		}

		let re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

		if (!re.test(email)) {
			showAlert("Podany adres email jest błędny!");
			return;
		}

		const obj = { firstName, lastName, email, password };

		fetch("http://localhost:3000/users")
			.then((res) => res.json())
			.then((resJSON) => {
				let found = resJSON.some((item) => {
					return item.email === email && item.password === password;
				});

				if (!found) {
					registerUser(obj);
				} else {
					showAlert("Użytkownik już istnieje");
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
