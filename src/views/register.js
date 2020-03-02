import $ from "jquery";
import { Router } from "../router/router";
import "./forms.scss";

export const register = () => {
	const fragment = $(new DocumentFragment());
	const router = new Router();

	const container = $(`<form class="text-center border border-light p-5 form register" action="#!"></form>)
	`);

	const form = $(`
    <p class="h4 mb-4">Sign up</p>

    <div class="form-row mb-4">
        <div class="col">
            <!-- First name -->
            <input type="text" id="defaultRegisterFormFirstName" class="form-control" placeholder="First name">
        </div>
        <div class="col">
            <!-- Last name -->
            <input type="text" id="defaultRegisterFormLastName" class="form-control" placeholder="Last name">
        </div>
    </div>

    <!-- E-mail -->
    <input type="email" id="defaultRegisterFormEmail email" class="form-control mb-4" placeholder="E-mail">

    <!-- Password -->
    <input type="password" id="defaultRegisterFormPassword password" class="form-control" placeholder="Password" aria-describedby="defaultRegisterFormPasswordHelpBlock">
    <small id="defaultRegisterFormPasswordHelpBlock" class="form-text text-muted mb-4">
        At least 8 characters and 1 digit
    </small>

    <!-- Phone number -->
    <input type="text" id="defaultRegisterPhonePassword" class="form-control" placeholder="Phone number" aria-describedby="defaultRegisterFormPhoneHelpBlock">
    <small id="defaultRegisterFormPhoneHelpBlock" class="form-text text-muted mb-4">
        Optional - for two step authentication
    </small>

    <!-- Newsletter -->
    <div class="custom-control custom-checkbox">
        <input type="checkbox" class="custom-control-input" id="defaultRegisterFormNewsletter">
        <label class="custom-control-label" for="defaultRegisterFormNewsletter">Subscribe to our newsletter</label>
    </div>

    <!-- Sign up button -->
    
    <!-- Social register -->

    <!-- Terms of service -->
`);

	const btn = $(`
		<button class="btn btn-info my-4 btn-block" type="submit">Zarejestruj się</button>`);

	const socialRegister = $(`
		<p>or sign up with:</p>

    <a href="#" class="mx-2" role="button"><i class="fab fa-facebook-f light-blue-text"></i></a>
    <a href="#" class="mx-2" role="button"><i class="fab fa-twitter light-blue-text"></i></a>
    <a href="#" class="mx-2" role="button"><i class="fab fa-linkedin-in light-blue-text"></i></a>
    <a href="#" class="mx-2" role="button"><i class="fab fa-github light-blue-text"></i></a>

    <hr>
	`);

	const termsOfService = $(`<p>By clicking
        <em>Sign up</em> you agree to our
        <a href="" target="_blank">terms of service</a></p>`);

	btn.on("click", e => {
		e.preventDefault();
		const email = $("#email").val();
		const password = $("#password").val();
		const obj = { email, password };

		// fetch("http://localhost:3000/users").then(res => {
		// 	console.log(res.json());
		// });

		fetch("http://localhost:3000/users", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(obj)
		}).then(res => {
			console.log(res);
			if (res.status === 201 && res.statusText === "statusText") {
				router.navigate("/");
			}
		});
	});

	$(container).append(form);
	$(container).append(btn);
	$(container).append(socialRegister);
	$(container).append(termsOfService);
	fragment.append(container);

	return Promise.resolve(fragment);
};
