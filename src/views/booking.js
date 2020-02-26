import $ from "jquery";
import { Cart } from "../cart/cart";

export const booking = () => {
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

	const removeDataFromCookies = e => {
		const { name } = e.target;
		console.log(name);
		const result = cart.get().filter((item, key) => {
			return key !== parseInt(name);
		});
		cart.set(result);
		renderBookingList();
	};

	const summary = () => {
		console.log(cart.get());
		return cart
			.get()
			.reduce((sum, curr) => (sum += parseFloat(curr.price)), 0)
			.toFixed(2);
	};
	const renderBookingList = () => {
		let table = $(`<table class="table ">`);
		let thead = $(`<thead>
    	<tr>
      	<th scope="col">#</th>
      	<th scope="col">Name</th>
      	<th scope="col">Typ</th>
      	<th scope="col">Price</th>
				<th scope="col">Delate</th>
    	</tr>
  	</thead>`);
		let tbody = $("<tbody>");
		$(table).append(thead);
		$(table).append(tbody);

		cart.get().map((item, key) => {
			let btn = $(`<button name="${key}"></button>`);
			$(btn).append(`<i class="fas fa-trash-alt"></i>`);
			$(btn).on("click", e => {
				removeDataFromCookies(e);
			});
			let tr = $(`
    <tr>
      <th scope="row">${key + 1}</th>
      <th scope="row">${item.type === "rooms" ? "Pokój" : "Zabieg"}</th>
      <td>${item.name}</td>
      <td>${item.price}</td>
		</tr>`);
			let td = $(`<td>`);
			$(td).append(btn);
			$(tr).append(td);

			return $(tbody).append(tr);
		});

		fragment.append(table);
		fragment.append(summary);
	};
	renderBookingList();
	return Promise.resolve(fragment);
};
