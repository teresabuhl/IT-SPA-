import $ from "jquery";
import { Cart } from "../cart/cart";
import { Router } from "../router/router";
export const basketpage = () => {
	const fragment = $(new DocumentFragment());
	const cart = new Cart();

	const getValueFromCookies = () => {
		console.log(cart.get());
		const result = cart.get();
		const router = new Router();
		if (result.length === 0) {
			// window.location("/rooms");
			// router.navigate("/");
			// console.log();
			// router.init();
		}
		return result;
	};

	const removeDataFromCookies = name => {
		const result = cart.get().filter((item, key) => {
			return item.name !== name;
		});
		cart.set(result);
	};

	const summary = () => {
		console.log(cart.get());
		return cart
			.get()
			.reduce((sum, curr) => (sum += parseFloat(curr.price)), 0)
			.toFixed(2);
	};

	cart.get().map((item, key) => {
		return fragment.append(
			`<h2>${item.name} - ${item.price} </h2> <button >Usuń </button>`
		);
	});

	fragment.append(summary);
	// onclick="
	//       ()=>{${removeDataFromCookies(
	// 				item.name
	//       )}}
	//       "
	return Promise.resolve(fragment);
};
