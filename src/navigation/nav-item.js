import $ from "jquery";
import "./nav-item.scss";
import { Auth } from "../common/auth-service";
// spodziewamy sie funkcji click, ktora bedzie wywolywana przez element anchor
// chcemy, aby klikniecie w element anchor powodowalo nawigacje do innej sciezki
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
