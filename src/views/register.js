import $ from "jquery";
import { Router } from "../router/router";
import "./forms.scss";

export const signup = () => {
	const fragment = $(new DocumentFragment());
	const router = new Router();
	let form = $(`<form class='register'>
	  <div class="form-group">
	    <label for="exampleInputEmail1">Email address</label>
	    <input type="email" class="form-control" id="email" aria-describedby="emailHelp">
	    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
	  </div>
	  <div class="form-group">
	    <label for="exampleInputPassword1">Password</label>
	    <input type="password" class="form-control" id="password">
	  </div>
	</form>
	  `);
	let btn = $(`<button class="btn btn-primary">
			Zarejestruj się
		</button>`);

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

	$(form).append(btn);
	fragment.append(form);
	return Promise.resolve(fragment);
};
