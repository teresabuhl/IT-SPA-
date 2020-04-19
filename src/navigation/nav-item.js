import $ from "jquery";
import "./nav-item.scss";
import { Auth } from "../common/auth-service";

export const navItem = (text, click) => {
	// const
	const auth = new Auth();
	// console.log(auth.get());
	const user_token = auth.get();
	if (user_token !== undefined) {
		if (text === "Zaloguj się") {
			text = "Wyloguj się";
			click = () => auth.logout();
		}
	}
	const navItem = $(`<li class="nav-item"></li>`);
	const anchor = $(`<a class="nav-link text-light"></a>`);
	anchor.text(text).on("click", click);

	navItem.append(anchor);

	return navItem;
};
