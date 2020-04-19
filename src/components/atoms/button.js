import $ from "jquery";
import "./button.scss";

export const button = () => {
	const btn = $(`
	<button class="ripplesBtn" type="submit" name="">Zaloguj</button>
  `);

	btn.on("click", (e) => {
		let x = e.clientX - e.target.offsetLeft;
		let y = e.clientY - e.target.offsetTop;

		let ripples = $(`<span class="ripplesSpan"></span>`);
		// $(ripples).css({ left: x + "px", top: y + "px" });
		ripples.style.left = x + "px";
		ripples.style.top = y + "px";

		this.append(ripples);

		setTimeout(() => {
			ripples.remove();
		}, 1000);
	});
};
