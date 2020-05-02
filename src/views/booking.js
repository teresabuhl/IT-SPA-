import $ from "jquery";
import moment from "moment";
import { Cart } from "../cart/cart";
import { cartUpdate } from "../navigation/cart-update";
import "./booking.scss";

export const booking = () => {
	const fragment = $(new DocumentFragment());
	const cart = new Cart();

	const main = $(`<div class="booking-main background-image"></div>`);
	const container = $(`<div class="booking-box"></div>`);
	const tableRes = $(`<div class="table-responsive-sm">`);

	container.append(tableRes);
	main.append(container);
	fragment.append(main);

	const dateDiff = (dateTime) => {
		const { dateFrom, dateTo } = dateTime;
		const dateFirst = new moment(dateFrom);
		const dateSec = new moment(dateTo);
		const duration = moment.duration(dateSec.diff(dateFirst));
		return duration.asDays();
	};

	const removeDataFromCookies = (e) => {
		const { name } = e.target;
		const result = cart.get().filter((item, key) => {
			return key !== parseInt(name);
		});

		cart.set(result);
		renderBookingList();
	};

	const summary = () => {
		let sum = 0;
		cart.get().map((item) => {
			if (item.type === "rooms") {
				return (sum += parseFloat(item.price) * dateDiff(item.dateTime));
			} else {
				return (sum += parseFloat(item.price));
			}
		});
		return $(
			`<tr class="table-sum"><th colspan="7">RAZEM</th><th>${sum} zł</th></tr>`
		);
	};

	const renderBookingList = () => {
		container.empty();

		if (cart.get().length == 0) {
			const alert = $(
				`<div class="alert alert-info alert-dismissible fade show w-100 p-5 mb-0 text-center text-light bg-transparent"></div>`
			);

			alert.text(`Twój koszyk jest pusty!`);

			container.append(alert);
			return;
		}

		const table = $(`<table class="table">`);
		const thead = $(`<thead class="table-head">
    	<tr class="table-row">
      	<th scope="col">Nazwa</th>
      	<th scope="col">Przyjazd</th>
      	<th scope="col">Wyjazd</th>
      	<th scope="col">Dni</th>
      	<th scope="col">Cena</th>
      	<th scope="col">Wartość</th>
				<th scope="col"></th>
    	</tr>
	  </thead>`);

		const tbody = $("<tbody>");

		cart.get().map((item, key) => {
			const btn = $(
				`<button class="btn_remove_order" name="${key}"><i class="fas fa-trash-alt"></button>`
			);

			$(btn).on("click", (e) => {
				removeDataFromCookies(e);
				$(document).trigger(cartUpdate);
			});

			const tr = $(`
			<tr class="table-row">
				<td class="item-name">${item.name}</td>
				<td class="item-date">${
					item.type === "rooms" ? item.dateTime.dateFrom : "-"
				}</td>
				<td class="item-date">${item.type === "rooms" ? item.dateTime.dateTo : "-"}</td>
				<td class="item-day">${
					item.type === "rooms" ? dateDiff(item.dateTime) : "-"
				}</td>
				<td>${item.type === "rooms" ? `${item.price} zł` : "-"}</td>
				<td class="item-price">${
					item.type === "rooms"
						? item.price * dateDiff(item.dateTime)
						: item.price
				} zł</td>
			</tr>`);
			const td = $(`<td>`);
			$(td).append(btn);
			$(tr).append(td);

			return $(tbody).append(tr);
		});

		tbody.append(summary);

		table.append(thead);
		table.append(tbody);

		container.append(table);
	};

	renderBookingList();
	return Promise.resolve(fragment);
};
