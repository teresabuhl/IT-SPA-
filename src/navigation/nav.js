import $ from "jquery";
import { navItem } from "./nav-item";
import { routeChange } from "../router/route-change";
import { routes } from "../router/routes";

export const nav = () => {
	const navbar = $(`
		<nav class="navbar navbar-expand-lg sticky-top navbar-dark bg-dark">
		<div class="container">
			<span class="navbar-brand">
				<a class="navbar-brand" href="/">
    			<i class="fas fa-spa"></i> IT SPA
  			</a>
			</span>
			<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarMenu" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
    		<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse justify-content-end">
			<ul class="navbar-nav navbar-right"></ul>
			<div>
		</div>
    </nav>
	`);

	// nav item spodziewa sie funkcji, ktora bedzie wywolywana przy kliknieciu
	// const bookingNavItem = navItem("Booking", () =>
	// 	navbar.trigger(routeChange, { path: "/booking" })
	// );

	// chcemy zbudowac tablice elementow navItem z odpowiednimi nazwami i callbackami
	const navItems = routes.map(({ name, path }) => {
		return navItem(name, () => navbar.trigger(routeChange, { path: path }));
	});

	navbar.find("ul").append(navItems);

	return navbar;
};
