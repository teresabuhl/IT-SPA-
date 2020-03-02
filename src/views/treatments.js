import $ from "jquery";
import { Cart } from "../cart/cart";
import { treatmentsService } from "../common/treatments-service";
import "./treatments.scss";

export const treatments = () => {
	const fragment = $(new DocumentFragment());

	const cart = new Cart();

	const setCookies = e => {
		const { name } = e.target;
		console.log(name);
		const offerName = name.split(";")[0];
		const offerPrice = name.split(";")[1];
		console.log(offerName, offerPrice);
		// console.log(name);
		const result = cart.get();
		console.log(result);
		result.push({ name: offerName, price: offerPrice, type: "treatments" });
		cart.set(result);
	};

	return treatmentsService.getTreatments().then(treat => {
		fragment.append(`
		<div class="jumbotron jumbotron-fluid jumbotron-treatments">
			<div class="container text-white">
				<h1 class="display-4">Wyjątkowe SPA</h1>
				<p class="lead">IT SPA oprócz wspaniałych relaksujących zabiegów manualnych na twarz i ciało proponuje również zabiegi wykonywane specjalistycznym sprzętem na bardzo wysokiej jakości produktach.</p>
			</div>
		</div>`);

		let container = $(`<div class="container d-flex"></div>`);
		let card = $(`<div class="card" style="width: 18rem"></div>`);

		$(container).append(card);
		fragment.append(container);

		treat.map((item, key) => {
			let cardImg = $(
				`<img src="../imges/spa-3184610_1920.jpg" class="card-img-top" alt="...">`
			);

			let bodyCard = $(`<div class="card-body">
    <h5 class="card-title">${item.name}</h5>
		<p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
		<h1 class="card-title pricing-card-title">${item.price} zł</h1>
  </div> 		
`);
			let btn = $(
				`<button type="button" class="btn btn-lg btn-block btn-outline-primary add-to-cart" name="${item.name};${item.price}">Dodaj do koszyka<i class='fas fa-shopping-cart'></i></button>`
			);
			$(btn).on("click", e => {
				setCookies(e);
			});

			$(card).append(cardImg);
			$(bodyCard).append(btn);
			$(card).append(bodyCard);
		});
		return fragment;
	});
};
