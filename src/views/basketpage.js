import $ from "jquery";
import Cart from "../cart/cart";
export const basketpage = () => {
	const fragment = $(new DocumentFragment());
	const getValueFromCookies = () => {};

	fragment.append(``);

	return Promise.resolve(fragment);
};
