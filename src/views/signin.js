import $ from "jquery";
import "./forms.scss";

export const signin = () => {
	const fragment = $(new DocumentFragment());
	let form = $(`<form class='login'>
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
			Zaloguj się
		</button>`);

	btn.on("click", e => {
		e.preventDefault();
		const email = $("#email").val();
		const password = $("#password").val();
		const obj = { email, password };

		// fetch("http://localhost:3000/users").then(res => {
		// 	console.log(res.json());
		// });
	});

	$(form).append(btn);
	fragment.append(form);

	return Promise.resolve(fragment);
};
