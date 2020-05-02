import $ from "jquery";
import "./nav-item.scss";
import { Auth } from "../common/auth-service";
import { routeChange } from "../router/route-change";
import { userLogin } from "./user-login";
import { cartUpdate } from "./cart-update";
import { Cart } from "../cart/cart";

export const navItem = (text, path, click) => {
	const auth = new Auth();

	const cart = new Cart();

	const user_token = auth.get();
	if (user_token) {
		if (text === "Zaloguj") {
			text = "Wyloguj";
			click = (e) => {
				$(document.body).trigger(routeChange, { path: path });
				if ($(e.target).text() === "Wyloguj") {
					$(e.target).text("Zaloguj");
					$(e.target).addClass("nav-link-active");
					auth.logout();
				}
			};
		}
	}

	const navItem = $(`<li class="nav-item"></li>`);
	let anchor;

	if (text == "Koszyk") {
		anchor = $(`<div class="position-relative"></div>`);

		let cartIcon = $(
			`<div class="text-light fas fa-shopping-basket shopping-basket"></div>`
		);

		let countDiv = $(`<div class="shopping-cart-count"></div>`);
		countDiv.text(0);

		anchor.append(cartIcon);
		anchor.append(countDiv);

		let count = cart.get().length;
		countDiv.text(count);

		$(document).on(cartUpdate, () => {
			let count = cart.get().length;
			countDiv.text(count);
		});
	} else {
		anchor = $(`<a class="nav-link text-light"></a>`);
		anchor.text(text);
	}

	// Dodanie do dokumentu HTML nowego lsitenera, który sami stworzyliśmy - listener zalogowania się użytkownika (w formualrzu logowania wywołujemy to zdarzenie)
	$(document).on(userLogin, () => {
		console.log("userLogin listener");
		console.log(text);
		if (text === "Wyloguj" || text === "Zaloguj") {
			anchor.text("Wyloguj");
		}
	});

	anchor.on("click", click);

	navItem.append(anchor);

	return navItem;
};
