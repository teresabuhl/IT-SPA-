import $ from "jquery";
import { roomsService } from "../common/rooms-service";
import { roomsList } from "./rooms-list";

export const rooms = () => {
	const fragment = $(new DocumentFragment());

	// .append('<h2>Rooms</h2>')
	// .append(roomsList(pokoje))
	// .append('<p>Lorem ipsum dolor sit amet...</p>')
	return roomsService.getRooms().then(pokoje => {
		return fragment.append(`
		<div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
  		<h1 class="display-4">Pokoje</h1>
  		<p class="lead">Do Państwa dyspozycji IT SPA oddaje 12 komfortowych pokoi o łącznej liczbie 40 ekskluzywnie wyposażonych miejsc noclegowych. Wszystkie pokoje wyposażone są w nowoczesne udogodnienia, takie jak: klimatyzacja, telewizja satelitarna, telewizory LED (dostępne ym.in. kanały Canal+, Canal+ Sport, Mini Mini), telefon, mini lodówka, suszarkę do włosów, szlafrok oraz sejf. W obiekcie dostępne jest bezpłatne WiFi.</p>
		</div>
		<div class="card-deck mb-4 text-center">
    	<div class="card mb-4 shadow-sm">
      	<div class="card-header">
        	<h4 class="my-0 font-weight-normal">${pokoje[0].name}</h4>
      	</div>
      	<div class="card-body">
        	<h1 class="card-title pricing-card-title">${pokoje[0].price} zł<small class="text-muted">/ noc</small></h1>
				<ul class="list-unstyled mt-3 mb-4">
         	<li>1 bed</li>
          <li>1 guest</li>
        </ul>
        <button type="button" class="btn btn-lg btn-block btn-outline-primary add-to-cart-1">Rezerwuj online</button>
      </div>
    </div>
    <div class="card mb-4 shadow-sm">
      <div class="card-header">
        <h4 class="my-0 font-weight-normal">${pokoje[1].name}</h4>
      </div>
      <div class="card-body">
        <h1 class="card-title pricing-card-title">${pokoje[1].price} zł <small class="text-muted">/ noc</small></h1>
        <ul class="list-unstyled mt-3 mb-4">
           <li>1 bed</li>
          <li>2 guests</li>
        </ul>
        <button type="button" class="btn btn-lg btn-block btn-outline-primary add-to-cart-2">Rezerwuj online</button>
      </div>
    </div>
    <div class="card mb-4 shadow-sm">
      <div class="card-header">
        <h4 class="my-0 font-weight-normal">${pokoje[2].name}</h4>
      </div>
      <div class="card-body">
        <h1 class="card-title pricing-card-title">${pokoje[2].price} zł <small class="text-muted">/ noc</small></h1>
        <ul class="list-unstyled mt-3 mb-4">
           <li>2 beds</li>
          <li>3 guests</li>
        </ul>
        <button type="button" class="btn btn-lg btn-block btn-outline-primary add-to-cart-2">Rezerwuj online</button>
      </div>
		</div>
		<div class="card mb-4 shadow-sm">
      <div class="card-header">
        <h4 class="my-0 font-weight-normal">${pokoje[3].name}</h4>
      </div>
      <div class="card-body">
        <h1 class="card-title pricing-card-title">${pokoje[3].price} zł <small class="text-muted">/ noc</small></h1>
        <ul class="list-unstyled mt-3 mb-4">
          <li>2 beds</li>
          <li>4 guests</li>
        </ul>
        <button type="button" class="btn btn-lg btn-block btn-outline-primary add-to-cart-3">Rezerwuj online</button>
      </div>
    </div>
  </div>`);
	});
};
