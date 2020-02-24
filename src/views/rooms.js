import $ from "jquery";
import { roomsService } from "../common/rooms-service";
import { Cart } from "../cart/cart";
import { roomsList } from "./rooms-list";

export const rooms = () => {
	const fragment = $(new DocumentFragment());

	// .append('<h2>Rooms</h2>')
	// .append(roomsList(pokoje))
	// .append('<p>Lorem ipsum dolor sit amet...</p>')
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
		result.push({ name: offerName, price: offerPrice });
		cart.set(result);
	};

	// $(".add-to-cart").on("click", ());

	return roomsService.getRooms().then(pokoje => {
		fragment.append(`
		<div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
  		<h1 class="display-4">Pokoje</h1>
  		<p class="lead">Do Państwa dyspozycji IT SPA oddaje 12 komfortowych pokoi o łącznej liczbie 40 ekskluzywnie wyposażonych miejsc noclegowych. Wszystkie pokoje wyposażone są w nowoczesne udogodnienia, takie jak: klimatyzacja, telewizja satelitarna, telewizory LED (dostępne ym.in. kanały Canal+, Canal+ Sport, Mini Mini), telefon, mini lodówka, suszarkę do włosów, szlafrok oraz sejf. W obiekcie dostępne jest bezpłatne WiFi.</p>
    </div>`);

		pokoje.map((item, key) => {
			// return
			let wrapper = $(`<div class="card-deck mb-4 text-center"></div> `);
			let card = $(`<div class="card mb-4 shadow-sm">
		</div>`);
			let header = $(`<div class="card-header">
			<h4 class="my-0 font-weight-normal">${item.name}</h4>
		</div>`);
			let bodyCard = $(` <div class="card-body">
		<h1 class="card-title pricing-card-title">${item.price} zł<small class="text-muted">/ noc</small></h1>
	<ul class="list-unstyled mt-3 mb-4">
		<li>1 bed</li>
		<li>1 guest</li>
	</ul> </div>`);
			let btn = $(
				`<button type='button' class='btn btn-lg btn-block btn-outline-primary add-to-cart' name="${item.name};${item.price}">Rezerwuj online<i class='fas fa - shopping - cart' ></i></button>`
			);
			$(btn).on("click", e => {
				setCookies(e);
			});

			$(bodyCard).append(btn);
			$(wrapper).append(card);
			$(card).append(header);
			$(card).append(bodyCard);
			fragment.append(wrapper);
		});
		// ${Cart.set(
		// item.name
		// )}
		return fragment;
	});
};
