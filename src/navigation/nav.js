import $ from "jquery";
import { navItem } from "./nav-item";
import { routeChange } from "../router/route-change";
import { routes } from "../router/routes";
import "./nav.scss";

export const nav = () => {
	const header = $(`<header></header>`);

	const navbar = $(`
		<nav class="navbar navbar-expand-lg sticky-top navbar-dark">
		<div class="container">
			<span class="navbar-brand">
				<a class="logo-spa navbar-brand" href="/">
    			<i class="h4 fas fa-spa"></i> IT SPA
  			</a>
			</span>
			<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarMenu" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
    		<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse justify-content-between" id="navbarMenu">
				<ul id="main_nav" class="navbar-nav navbar-left navbar-ul align-items-center"></ul>
				<ul id="main_nav" class="navbar-nav navbar-left navbar-ul align-items-center"></ul>		
			</div>
		</div>
		</nav>		
	`);

	const navItemsMain = routes.map(({ name, path }, i) => {
		if (i < 3)
			return navItem(name, path, () =>
				navbar.trigger(routeChange, { path: path })
			);
	});

	navbar.find("ul").eq(0).append(navItemsMain);

	const navItemsUser = routes.map(({ name, path }, i) => {
		if (i >= 3)
			return navItem(name, path, () =>
				navbar.trigger(routeChange, { path: path })
			);
	});

	navbar.find("ul").eq(1).append(navItemsUser);

	header.append(navbar);

	return header;
};
