import $ from "jquery";
import { main_router } from "../it-spa";
import validate from "jquery-validation";
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
		<small id="defaultRegisterFormPasswordHelpBlock" class="form-text text-muted mb-4">
        At least 8 characters and 1 digit
		</small>
	</form>
`);

	const btn = $(`
		<button type="submit" type="submit">Utwórz konto</button>`);

	const alert = $(`
	<div class="alert alert-danger register_alert" role="alert">
  	Proszę uzupełnić wszystkie pola  
	</div>`);

	// $(container).validate({
	// 	rules: {
	// 		firstName: {
	// 			required: true,
	// 			minLength: 3
	// 		}
	// 	},
	// 	messages: {
	// 		firstName: "Proszę podać imię"
	// 	},
	// 	submitHandler: function(form) {
	// 		form.submit();
	// 	}
	// });

	// $(container).validate();
	const registerUser = (obj) => {
		fetch("http://localhost:3000/users", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(obj),
		}).then((res) => {
			console.log(res);
			if (res.status === 201) {
				main_router.navigate("/login");
			}
		});
	};

	btn.on("click", (e) => {
		e.preventDefault();
		const firstName = $("#firstName").val();
		const lastName = $("#lastName").val();
		const email = $("#email").val();
		const password = $("#password").val();

		const obj = { firstName, lastName, email, password };
		if (password.length > 6 && email.length > 6) {
			fetch("http://localhost:3000/users")
				.then((res) => res.json())
				.then((resJSON) => {
					console.log(resJSON);
					let found = resJSON.some((item) => {
						return item.email === email && item.password === password;
					});
					console.log(found);
					if (!found) {
						registerUser(obj);
					} else {
						alert("Użytkownik już istnieje");
					}
				});
		} else {
			$(alert).toggleClass("register_active");
		}
	});

	$(form).append(btn);
	$(container).append(form);
	$(container).append(alert);
	$(main).append(container);
	// $(container).append(socialRegister);
	// $(container).append(termsOfService);
	fragment.append(main);

	return Promise.resolve(fragment);
};
