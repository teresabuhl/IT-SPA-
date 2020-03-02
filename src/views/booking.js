import $ from "jquery";
import moment from "moment";
import { Cart } from "../cart/cart";
import "./booking.scss";

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

	const dateDiff = dateTime => {
		const { dateFrom, dateTo } = dateTime;
		const dateFirst = new moment(dateFrom);
		const dateSec = new moment(dateTo);
		const duration = moment.duration(dateSec.diff(dateFirst));
		console.log(duration.asDays());
		return duration.asDays();
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
		// return cart
		// 	.get()
		// 	.reduce((sum, curr) => (sum += parseFloat(curr.price)), 0)
		// 	.toFixed(2);
		let sum = 0;
		cart.get().map((item, key) => {
			return (sum += item.price * dateDiff(item.dateTime));
		});
		return sum;
	};
	const renderBookingList = () => {
		let table = $(`<table class="table ">`);
		let thead = $(`<thead>
    	<tr>
      	<th scope="col">#</th>
      	<th scope="col">Nazwa</th>
      	<th scope="col">Typ</th>
      	<th scope="col">Data przyjazdu</th>
      	<th scope="col">Data wyjazdu</th>
      	<th scope="col">Cena/Noc</th>
      	<th scope="col">Cena</th>
      	<th scope="col">Ilość dni</th>
				<th scope="col">Usuń</th>
    	</tr>
  	</thead>`);
		let tbody = $("<tbody>");
		$(table).append(thead);
		$(table).append(tbody);

		cart.get().map((item, key) => {
			let btn = $(`<button class='btn_remove_order' name="${key}"></button>`);
			$(btn).append(`<i class="fas fa-trash-alt"></i>`);
			$(btn).on("click", e => {
				removeDataFromCookies(e);
			});
			let tr = $(`
    <tr>
      <th scope="row">${key + 1}</th>
      <th scope="row">${item.type === "rooms" ? "Pokój" : "Zabieg"}</th>
			<td>${item.name}</td>
			<td>${item.dateTime.dateFrom}</td>
      <td>${item.dateTime.dateTo}</td>
      <td>${item.price}</td>
			<td>${item.price * dateDiff(item.dateTime)}</td>
			<td>${dateDiff(item.dateTime)}</td>
			

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
