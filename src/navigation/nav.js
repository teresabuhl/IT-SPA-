import $ from "jquery";
import { navItem } from "./nav-item";
import { routeChange } from "../router/route-change";
import { routes } from "../router/routes";

export const nav = () => {
	const navbar = $(`
    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
			<span class="navbar-brand">
				<a class="navbar-brand" href="#">
    			<i class="fas fa-spa"></i> IT SPA
  			</a>
			</span>
			<ul class="navbar-nav mr-auto"></ul>
    </nav>
  `);
	// <a class="btn btn-link text-light">Log in <i class="fas fa-sign-in-alt"></i><a class="btn btn-link text-light"></a>

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
