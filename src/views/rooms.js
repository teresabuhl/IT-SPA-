import $ from "jquery";
import { roomsService } from "../common/rooms-service";
import moment from "moment";
import { Cart } from "../cart/cart";
import { cartUpdate } from "../navigation/cart-update";
import "./rooms.scss";

export const rooms = () => {
	const fragment = $(new DocumentFragment());

	const cart = new Cart();

	const setCookies = (e, dateFrom, dateTo) => {
		const { name } = e.target;
		const offerName = name.split(";")[0];
		const offerPrice = name.split(";")[1];

		const result = cart.get();

		result.push({
			name: offerName,
			price: offerPrice,
			type: "rooms",
			dateTime: { dateFrom, dateTo },
		});
		cart.set(result);
	};

	return roomsService.getRooms().then((pokoje) => {
		const jumbotron = $(
			`<div class="jumbotron jumbotron-fluid jumbotron-rooms background-image">`
		);
		const junboContainer = $(`<div class="container">`);
		const dateReservation = $(`<div class="date-reservation">`);
		const formItemFrom = $(
			`<div class="form-item"><label class="m-1 mx-3" for="date">Przyjazd</label><i class="far fa-calendar-alt"></i></div>`
		);
		const formItemTo = $(
			`<div class="form-item"><label class="m-1 mx-3" for="date">Wyjazd</label><i class="far fa-calendar-alt"></i></div>`
		);
		const dateInputFrom = $(`<input
						type="date"
						class="form-control date-input-from"
						id="date"
						placeholder="select"
					/>`);
		const dateInputTo = $(`<input
						type="date"
						class="form-control date-input-to"
						id="date"
						placeholder="select"
					/>`);
		const btnReservation = $(
			`<button type="button" class="btn btn-dark btn-reservation">Zaplanuj pobyt</button>`
		);

		$(btnReservation).on("click", () => {
			const date = new Date().getTime();
			const dateFrom = new Date($(dateInputFrom).val()).getTime();
			const dateTo = new Date($(dateInputTo).val()).getTime();

			const dateFirst = new moment(date);
			const dateSec = new moment(dateTo);
			const duration = moment.duration(dateSec.diff(dateFirst));

			if (
				$(dateInputFrom).val() === "" ||
				$(dateInputTo).val() === "" ||
				date > dateFrom ||
				date > dateTo ||
				dateTo < dateFrom
			) {
				$("#reservation .modal-title").text("Uwaga");
				$("#reservation .modal-body").text("Wybierz poprawny okres pobytu");
				$("#reservation").modal();
			} else if (duration.asYears() > 1) {
				$("#reservation .modal-body").text(
					"Wybrana data wyjazdu nie może być dalsza niż rok od daty przyjazdu"
				);
				$("#reservation").modal();
			} else {
				$(window).scrollTop(650);
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

		let container = $(`<div class='container'></div>`);
		let containerRow = $(
			`<div class="row mx-0 row-cols-1 row-cols-md-3"></div>`
		);

		$(container).append(containerRow);

		pokoje.map((item) => {
			let cardDeck = $(`<div class="col-md-4"></div>`);
			const card = $(`<div class="card mb-4 shadow-sm"></div>`);

			const cardImg = $(`<img class="card-img-top" src=${item.image} alt="">`);

			const cardBody = $(`<div class="card-body">
				<h4 class="card-title text-center">${item.name}</h4>
				<h2 class="card-text text-center">${item.price} zł<small class="text-muted">/ noc</small></h2>
				</div>`);

			const modal = $(`
			<div class="modal fade" id="reservation">
				<div class="modal-dialog modal-dialog-centered modal-sm">
					<div class="modal-content">
						<div class="modal-header">
							<h4 class="modal-title">Sukces</h4>
							<button type="button" class="close" data-dismiss="modal">&times;</button>
						</div>
						<div class="modal-body">
							Dodano pokój do koszyka!
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-primary" data-dismiss="modal">Ok</button>
						</div>

						</div>
				</div>
			</div>
		`);

			let btn = $(
				`<button type='button' class='btn btn-lg btn-block btn-outline-primary add-to-cart' name="${item.name};${item.price}" data-toggle="modal" data-target="#reservation">Rezerwuj</button>`
			);

			$(btn).on("click", (e) => {
				if ($(dateInputFrom).val() === "" || $(dateInputTo).val() === "") {
					$("#reservation .modal-title").text("Uwaga");
					$("#reservation .modal-body").text("Wybierz okres pobytu");
					$("#reservation").modal();
					$(window).scrollTop(0);
				} else {
					$("#reservation .modal-body").text("Dodano pokój do koszyka");
					$("#reservation").modal();
					setCookies(e, $(dateInputFrom).val(), $(dateInputTo).val());
					$(document).trigger(cartUpdate);
					$(window).scrollTop(0);
				}
			});

			fragment.append(modal);
			$(containerRow).append(cardDeck);
			$(cardDeck).append(card);
			$(card).append(cardImg);
			$(card).append(cardBody);
			$(cardBody).append(btn);
			fragment.append(container);
		});
		return fragment;
	});
};
