import $ from "jquery";
import { roomsService } from "../common/rooms-service";
import { Cart } from "../cart/cart";
import "./rooms.scss";
import { roomsList } from "./rooms-list";

export const rooms = () => {
	const fragment = $(new DocumentFragment());

	// .append('<h2>Rooms</h2>')
	// .append(roomsList(pokoje))
	// .append('<p>Lorem ipsum dolor sit amet...</p>')
	const cart = new Cart();

	const setCookies = (e, dateFrom, dateTo) => {
		const { name } = e.target;
		console.log(name);
		const offerName = name.split(";")[0];
		const offerPrice = name.split(";")[1];
		console.log(offerName, offerPrice);
		// console.log(name);
		const result = cart.get();
		console.log(result);
		result.push({
			name: offerName,
			price: offerPrice,
			type: "rooms",
			dateTime: { dateFrom, dateTo }
		});
		cart.set(result);
	};

	// $(".add-to-cart").on("click", ());

	return roomsService.getRooms().then(pokoje => {
		let jumbotron = $(
			`<div class="jumbotron jumbotron-fluid jumbotron-rooms">`
		);
		let junboContainer = $(`<div class="container">`);
		let dateReservation = $(`<div class="date-reservation">`);
		let formItemFrom = $(
			`<div class="form-item"><label for="date">Przyjazd</label></div>`
		);
		let formItemTo = $(
			`<div class="form-item"><label for="date">Wyjazd</label></div>`
		);
		let dateInputFrom = $(`<input
						type="date"
						class="form-control"
						id="date"
						placeholder="select"
					/>`);
		let dateInputTo = $(`<input
						type="date"
						class="form-control"
						id="date"
						placeholder="select"
					/>`);
		let btnReservation = $(
			`<button type="button" class="btn btn-dark btn-reservation">Zaplanuj pobyt</button>`
		);

		$(btnReservation).on("click", () => {
			const date = new Date().getTime();
			const dateFrom = new Date($(dateInputFrom).val()).getTime();
			const dateTo = new Date($(dateInputTo).val()).getTime();
			console.log(
				date,
				dateFrom,
				dateTo,
				date < dateFrom,
				date < dateTo,
				dateTo < dateFrom
			);
			if (
				$(dateInputFrom).val() === "" ||
				$(dateInputTo).val() === "" ||
				date > dateFrom ||
				date > dateTo ||
				dateTo < dateFrom
			) {
				alert("Error");
				// $(dateInputFrom).toggleClass;
			} else {
				$(window).scrollTop(700);
			}
		});

		$(jumbotron).append(junboContainer);
		$(junboContainer).append(dateReservation);
		$(dateReservation).append(formItemFrom);
		$(dateReservation).append(formItemTo);
		$(formItemFrom).append(dateInputFrom);
		$(formItemTo).append(dateInputTo);
		$(dateReservation).append(btnReservation);
		fragment.append(jumbotron);
		// fragment.append(`
		// <div class="jumbotron jumbotron-fluid jumbotron-rooms">
		// 	<div class="container">

		// 	<div class="date-reservation">
		// 		<div class="form-item">
		// 			<label for="date">Przyjazd</label>
		// 			<input
		// 				type="date"
		// 				class="form-control"
		// 				id="date"
		// 				placeholder="select"
		// 			/>
		// 		</div>
		// 		<div class="form-item">
		// 			<label for="date">Wyjazd</label>
		// 			<input
		// 				type="date"
		// 				class="form-control"
		// 				id="date"
		// 				placeholder="select"
		// 			/>
		// 		</div>
		// 			<button type="button" class="btn btn-dark btn-reservation">Zaplanuj pobyt</button>
		// 	</div>

		// 	</div>
		// </div>
		// `);

		let container = $(`<div class='container'> </div>`);
		let containerRow = $(
			`<div class="row mx-0 row-cols-1 row-cols-md-3"></div>`
		);

		$(container).append(containerRow);

		pokoje.map((item, key) => {
			// return
			let cardDeck = $(`<div class="col-md-4"></div>`);
			const card = $(`<div class="card mb-4 shadow-sm"></div>`);

			const cardImg = $(`<img class="card-img-top" src=${item.image} alt="">`);

			const cardBody = $(`<div class="card-body">
				<h4 class="card-title">${item.name}</h4>
				<p class="card-text">${item.price} zł<small class="text-muted">/ noc</small></p>
				</div>`);

			let btn = $(
				`<button type='button' class='btn btn-lg btn-block btn-outline-primary add-to-cart' name="${item.name};${item.price}" data-toggle="modal" data-target="#reservation">Rezerwuj</button>`
			);
			$(btn).on("click", e => {
				if ($(dateInputFrom).val() === "" || $(dateInputTo).val() === "") {
					$(window).scrollTop(0);
				} else {
					setCookies(e, $(dateInputFrom).val(), $(dateInputTo).val());
				}
			});

			$(containerRow).append(cardDeck);
			$(cardDeck).append(card);
			$(card).append(cardImg);
			$(card).append(cardBody);
			$(cardBody).append(btn);
			fragment.append(container);
		});
		// ${Cart.set(
		// item.name
		// )}
		return fragment;
	});
};

{
	/* <i class="fas fa-shopping-cart"></i>; */
}
