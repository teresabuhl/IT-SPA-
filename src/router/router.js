import $ from "jquery";
import { routes } from "./routes";
import { oops } from "../views";
import { routeChange } from "./route-change";

export class Router {
	constructor() {
		this.body = $(document.body);
		this.outlet = $("main");
		this.routes = routes;
	}

	mount(outlet) {
		this.outlet = outlet;

		this.body.on(routeChange, (event, detail) => {
			this.navigate(detail.path);
		});
	}

	init() {
		this.navigate(location.pathname);
	}

	get(path) {
		return this.routes.find((route) => route.path === path);
	}

	has(path) {
		return this.get(path) !== undefined;
	}

	navigate(path, data = {}) {
		if (this.has(path)) {
			const { component, name } = this.get(path);
			component().then((html) => {
				this.outlet.empty().append(html);
			});

			// "Zbiera" wszystkie linki z nawigacji i sprawdza dla który powinien byćaktywny i usrtawia go jako aktywny
			$(".nav-link")
				.removeClass("nav-link-active")
				.each((i, element) => {
					if ($(element).text() === name) {
						$(element).addClass("nav-link-active");
					}
				});
		} else {
			const html = oops();
			this.outlet.empty().append(html);
		}
		history.pushState(data, "", path);
	}
}
