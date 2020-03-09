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
			if (item.type === "rooms") {
				return (sum += parseFloat(item.price) * dateDiff(item.dateTime));
			} else {
				return (sum += parseFloat(item.price));
			}
		});
		return $(
			`<tr class="table-success"><th colspan="8">RAZEM</th><th>${sum} zł</th></tr>`
		);
	};
	const renderBookingList = () => {
		let container = $(`<div class="container bookingContainer"></div>`);
		let table = $(
			`<table class="table table-responsive-md table-striped bg-light">`
		);
		let thead = $(`<thead class="thead-dark">
    	<tr>
      	<th scope="col">#</th>
				<th scope="col">Typ</th>
      	<th scope="col">Nazwa</th>
      	<th scope="col">Data przyjazdu</th>
      	<th scope="col">Data wyjazdu</th>
      	<th scope="col">Cena/Noc</th>
      	<th scope="col-sm-4">Cena</th>
      	<th scope="col">Ilość dni</th>
				<th scope="col">Usuń</th>
    	</tr>
  	</thead>`);
		let tbody = $("<tbody>");

		$(container).append(table);
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
				<td>${item.type === "rooms" ? item.dateTime.dateFrom : "-"}</td>
				<td>${item.type === "rooms" ? item.dateTime.dateTo : "-"}</td>
				<td>${item.type === "rooms" ? `${item.price} zł` : "-"}</td>
				<td>${
					item.type === "rooms"
						? item.price * dateDiff(item.dateTime)
						: item.price
				} zł</td>
				<td>${item.type === "rooms" ? dateDiff(item.dateTime) : "-"}</td>
			</tr>`);
			let td = $(`<td>`);
			$(td).append(btn);
			$(tr).append(td);

			return $(tbody).append(tr);
		});

		tbody.append(summary);
		fragment.append(container);
	};
	renderBookingList();
	return Promise.resolve(fragment);
};
