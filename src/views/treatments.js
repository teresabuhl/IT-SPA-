import $ from "jquery";
import { Cart } from "../cart/cart";
import { treatmentsService } from "../common/treatments-service";
import { cartUpdate } from "../navigation/cart-update";
import "./treatments.scss";

export const treatments = () => {
	const fragment = $(new DocumentFragment());

	const cart = new Cart();

	const appendToCart = (name, price) => {
		const result = cart.get();
		result.push({ name, price, type: "treatments" });
		cart.set(result);

		$(document).trigger(cartUpdate);
	};

	return treatmentsService.getTreatments().then((treat) => {
		let jumbotron = $(`<div class="jumbotron jumbotron-fluid jumbotron-treatments background-image">
			<div class="container text-white">
				<h1 class="display-4">Wyjątkowe SPA</h1>
				<p class="lead">IT SPA oprócz wspaniałych relaksujących zabiegów manualnych na twarz i ciało proponuje również zabiegi wykonywane specjalistycznym sprzętem na bardzo wysokiej jakości produktach.</p>
			</div>
		</div>`);

		fragment.append(jumbotron);

		let container = $(`<div class='container'></div>`);
		let containerRow = $(
			`<div class="row mx-0 row-cols-1 row-cols-md-3"></div>`
		);

		$(container).append(containerRow);

		const modal = $(`
		<div class="modal fade" id="myModal">
			<div class="modal-dialog modal-dialog-centered modal-sm">
		 		 <div class="modal-content">
					<div class="modal-header">
						<h4 class="modal-title">Sukces</h4>
						<button type="button" class="close" data-dismiss="modal">&times;</button>
					</div>
					<div class="modal-body">
						Dodano usługę do koszyka!
					</div>
					<div class="modal-footer">
					  <button type="button" class="btn btn-primary" data-dismiss="modal">Ok</button>
					</div>

		  		</div>
			</div>
	  </div>
		`);

		fragment.append(modal);

		treat.map((item, key) => {
			let cardDeck = $(`<div class="col-md-4"></div>`);
			let card = $(`<div class="card mb-4 shadow-sm"></div>`);
			let cardImg = $(`<img class="card-img-top" src=${item.image} alt="">`);
			const cardBody = $(`<div class="card-body">
				<h5 class="card-title">${item.name}</h5>
				<p class="card-text">${item.text}</p>
				<h2 class="card-title pricing-card-title">${item.price} zł</h2>
				</div>`);

			let btn = $(
				`<button type="button" class="btn btn-lg btn-block btn-outline-primary add-to-cart" data-toggle="modal" data-target="#myModal">Rezerwuj</button>`
			);

			$(btn).on("click", (e) => {
				appendToCart(item.name, item.price);
			});

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
