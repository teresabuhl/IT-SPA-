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
		result.push({ name: offerName, price: offerPrice, type: "rooms" });
		cart.set(result);
	};

	// $(".add-to-cart").on("click", ());

	return roomsService.getRooms().then(pokoje => {
		fragment.append(`
		<div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
  		<h1 class="display-4">Pokoje</h1>
  		<p class="lead">Do Państwa dyspozycji IT SPA oddaje 12 komfortowych pokoi o łącznej liczbie 40 ekskluzywnie wyposażonych miejsc noclegowych. Wszystkie pokoje wyposażone są w nowoczesne udogodnienia, takie jak: klimatyzacja, telewizja satelitarna, telewizory LED (dostępne ym.in. kanały Canal+, Canal+ Sport, Mini Mini), telefon, mini lodówka, suszarkę do włosów, szlafrok oraz sejf. W obiekcie dostępne jest bezpłatne WiFi.</p>
		</div>
		<div class="modal fade" id="reservation" tabindex="-1" role="dialog" aria-labelledby="reservation" aria-hidden="true">
  <div class="modal-dialog modal-dialog-scrollable" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="reservation">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
		`);
		// $("#reservation").modal("toggle");
		let container = $(`<div class="container-fluid"></div>`);
		let wrapper = $(`<div class="card-deck mb-3 text-center"></div>`);
		$(container).append(wrapper);
		fragment.append(container);
		pokoje.map((item, key) => {
			// return

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
				`<button type='button' class='btn btn-lg btn-block btn-outline-primary add-to-cart' name="${item.name};${item.price}" data-toggle="modal" data-target="#reservation">Rezerwuj online<i class='fas fa-shopping-cart'></i></button>`
			);
			$(btn).on("click", e => {
				// setCookies(e);
			});

			$(wrapper).append(card);
			$(card).append(header);
			$(card).append(bodyCard);
			$(bodyCard).append(btn);
		});
		// ${Cart.set(
		// item.name
		// )}
		return fragment;
	});
};
