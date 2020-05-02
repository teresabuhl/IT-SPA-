import { Cart } from "./cart";

export const itSpaCart = () => {
	const cart = new Cart();

	cookieStore.addEventListener("change", (e) => {
		//jesli zaistniala zmiana w cookies,
		//ponownie pobieram zawartosc koszyka

		const nowaZawartosc = cart.get();

		//...i poprawiam wyświetlane przez koszyk informacje
		//TODO
	});
};
