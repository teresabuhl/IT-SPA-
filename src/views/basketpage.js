import $ from "jquery";
import { Cart } from "../cart/cart";
import { Router } from "../router/router";
export const signup = () => {
	const fragment = $(new DocumentFragment());
	const cart = new Cart();

	const summary = () => {
		console.log(cart.get());
		return cart
			.get()
			.reduce((sum, curr) => (sum += parseFloat(curr.price)), 0)
			.toFixed(2);
	};
	let form = $(`<form >
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
		console.log();
		const email = $("#email").val();
		const password = $("#password").val();
		fetch("http://localhost:3000/users", {
			method: "POST",
			data: { email, password }
		});
	});

	$(form).append(btn);
	fragment.append(form);

	// onclick="
	//       ()=>{${removeDataFromCookies(
	// 				item.name
	//       )}}
	//       "
	return Promise.resolve(fragment);
};
