import $ from "jquery";
import { Cart } from "../cart/cart";
import { treatmentsService } from "../common/treatments-service";
import "./treatments.scss";

export const treatments = () => {
	const fragment = $(new DocumentFragment());

	const cart = new Cart();

	const setCookies = (e) => {
		const { name } = e.target;
		console.log(name);
		const offerName = name.split(";")[0];
		const offerPrice = name.split(";")[1];
		console.log(offerName, offerPrice);

		const result = cart.get();
		console.log(result);
		result.push({ name: offerName, price: offerPrice, type: "treatments" });
		cart.set(result);
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
				`<button type="button" class="btn btn-lg btn-block btn-outline-primary add-to-cart" name="${item.name};${item.price}">Rezerwuj</button>`
			);

			$(btn).on("click", (e) => {
				setCookies(e);
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
