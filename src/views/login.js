import $ from "jquery";
import { usersService } from "../common/users-service";
import "./forms.scss";

export const login = () => {
	const fragment = $(new DocumentFragment());

	// const getAllUsers = usersService.getUsers();
	// console.log(getAllUsers);

	const container = $(
		`<form class="text-center border border-light p-5 form login" action="#!"></form>`
	);

	const form = $(`
	  <p class="h4 mb-4">Sign in</p>

    <!-- Email -->
    <input type="email" id="defaultLoginFormEmail email" class="form-control mb-4" placeholder="E-mail">

    <!-- Password -->
    <input type="password" id="defaultLoginFormPassword password" class="form-control mb-4" placeholder="Password">

    <div class="d-flex justify-content-around">
        <div>
            <!-- Remember me -->
            <div class="custom-control custom-checkbox">
                <input type="checkbox" class="custom-control-input" id="defaultLoginFormRemember">
                <label class="custom-control-label" for="defaultLoginFormRemember">Remember me</label>
            </div>
        </div>
        <div>
            <!-- Forgot password -->
            <a href="">Forgot password?</a>
        </div>
    </div>

    <!-- Sign in button -->

    <!-- Register -->
  
    <!-- Social login -->
`);

	// const form = $(`<form class="login was-validated">
	//   <div class="form-group">
	//     <label for="email">Email address</label>
	// 		<input type="email" class="form-control" id="email" placeholder="name@example.com" aria-describedby="emailHelp" required>
	// 		<div class="invalid-feedback">
	// 			This is invalid e-mail!
	// 		</div>
	// 		<div class="valid-feedback">
	// 			Looks good!
	// 		</div>
	//     <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
	//   </div>
	//   <div class="form-group">
	//     <label for="exampleInputPassword1">Password</label>
	//     <input type="password" class="form-control" id="password">
	//   </div>
	// </form>
	//   `);
	const btn = $(
		`<button class="btn btn-info btn-block my-4" type="submit">Zaloguj się</button>`
	);

	const register = $(`<p>Not a member?
        <a href="">Register</a>
		</p>`);

	const socialLogin = $(`<p>or sign in with:</p>
    <a href="#" class="mx-2" role="button"><i class="fab fa-facebook-f light-blue-text"></i></a>
    <a href="#" class="mx-2" role="button"><i class="fab fa-twitter light-blue-text"></i></a>
    <a href="#" class="mx-2" role="button"><i class="fab fa-linkedin-in light-blue-text"></i></a>
    <a href="#" class="mx-2" role="button"><i class="fab fa-github light-blue-text"></i></a>
`);

	btn.on("click", e => {
		e.preventDefault();
		const email = $("#email").val();
		const password = $("#password").val();
		const obj = { email, password };

		// fetch("http://localhost:3000/users", {
		// 	method: "GET",
		// 	headers: { "Content-Type": "application/json" }
		// 	// body: JSON.stringify(obj)
		// }).then(res => {
		// 	console.log(res.json());
		// 	// if (res.status === 201 && res.statusText === "statusText") {
		// });
	});

	$(container).append(form);
	$(container).append(btn);
	$(container).append(register);
	$(container).append(socialLogin);
	fragment.append(container);

	return Promise.resolve(fragment);
};
