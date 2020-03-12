import $ from "jquery";
import { main_router } from "../it-spa";
import validate from "jquery-validation";
import "./forms.scss";

export const register = () => {
	const fragment = $(new DocumentFragment());

	const registerUser = obj => {
		fetch("http://localhost:3000/users", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(obj)
		}).then(res => {
			console.log(res);
			if (res.status === 201) {
				main_router.navigate("/login");
			}
		});
	};

	const container = $(`<form class="text-center border border-light p-5 form register" ></form>)
	`);

	const form = $(`
    <p class="h4 mb-4">Sign up</p>

    <div class="form-row mb-4">
        <div class="col">
            <!-- First name -->
            <input type="text" id="firstName" name="firstName" class="form-control" placeholder="First name">
        </div>
        <div class="col">
            <!-- Last name -->
            <input type="text" id="lastName" name="lastName" class="form-control" placeholder="Last name">
        </div>
    </div>

    <!-- E-mail -->
    <input type="email" id="email" name="email" required class="form-control mb-4" placeholder="E-mail">

    <!-- Password -->
    <input type="password" id="password" required class="form-control" placeholder="Password" aria-describedby="defaultRegisterFormPasswordHelpBlock">
    <small id="defaultRegisterFormPasswordHelpBlock" class="form-text text-muted mb-4">
        At least 8 characters and 1 digit
    </small>
`);

	const btn = $(`
		<button type="submit" class="btn btn-info my-4 btn-block" type="submit">Zarejestruj się</button>`);
	const alert = $(`<div class="alert alert-danger register_alert" role="alert">
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

	btn.on("click", e => {
		e.preventDefault();
		const firstName = $("#firstName").val();
		const lastName = $("#lastName").val();
		const email = $("#email").val();
		const password = $("#password").val();

		const obj = { firstName, lastName, email, password };
		if (password.length > 6 && email.length > 6) {
			fetch("http://localhost:3000/users")
				.then(res => res.json())
				.then(resJSON => {
					console.log(resJSON);
					let found = resJSON.some(item => {
						return item.email === email && item.password === password;
					});
					console.log(found);
					if (!found) {
						registerUser(obj);
					} else {
						alert("Użytkownik istnieje");
					}
				});
		} else {
			$(alert).toggleClass("register_active");
		}
	});

	$(container).append(form);
	$(container).append(btn);
	$(container).append(alert);
	// $(container).append(socialRegister);
	// $(container).append(termsOfService);
	fragment.append(container);

	return Promise.resolve(fragment);
};
