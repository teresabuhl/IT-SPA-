import $ from "jquery";
import "./footer.scss";

export const footer = () => {
	const fragment = $(new DocumentFragment());

	const addEmailToNewsletter = (email) => {
		fetch("http://localhost:3000/newsletters", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email }),
		}).then((res) => {
			if (res.ok) {
				$(".modal#newsletter .modal-body").text("Dodano email do newslettera.");
				modal.modal();
				inputEmail.val("");
			}
		});
	};

	const footerSection = $(`
        <footer class="page-footer bg-secondary text-white py-4"></footer>
    `);

	const container = $(`<div class="container"></div>`);

	const modal = $(`
			<div class="modal fade" id="newsletter">
				<div class="modal-dialog modal-dialog-centered modal-sm">
					<div class="modal-content">
						<div class="modal-header">
							<h4 class="modal-title">Sukces</h4>
							<button type="button" class="close" data-dismiss="modal">&times;</button>
						</div>
						<div class="modal-body"></div>
						<div class="modal-footer">
							<button type="button" class="btn btn-primary" data-dismiss="modal">Ok</button>
						</div>	
					</div>
				</div>
			</div>
		`);

	const content = $(`
    <div class="row">
     <div class="col-md-7">
        <h5>IT SPA</h5>
            <p class="info">Niezwykłe otoczenie i wyjątkowa atmosfera sprawiają, że każdy dozna tu chwili zapomnienia, poczuje odrobinę luksusu, wyciszy się, zadba o duszę i ciało.</p>
        </div>
        <div class="col-md-5">
            
        </div>
    </div>
		`);

	const inputEmail = $(`
				<input type="email" class="form-control rounded-0" placeholder="e-mail">
		`);

	const bt = $(
		`<button id="bt_newsletter_save" class="btn-newsletter">Zapisz się</button>`
	);

	bt.on("click", () => {
		let email = inputEmail.val();
		console.log(email);

		let re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

		if (!re.test(email)) {
			$(".modal#newsletter .modal-body").text("Wprowadź poprawny email");
			modal.modal();
			return;
		}
		addEmailToNewsletter(email);
	});

	const inputs = $(`
        <div>
            <h5>Newsletter</h5>
            <div class="input-group">
               
                <div class="input-grup-append">

                </div>
            </div>
        </div>
		`);

	inputs.children().eq(1).prepend(inputEmail);
	inputs.children().eq(1).children().eq(1).append(bt);

	// console.log(content);
	content.children().eq(1).append(inputs);

	$("#bt_newsletter_save").on("click", () => {
		console.log("aaaa");
	});

	const copyright = $(`
    <div footer class="page-footer font-small">
        <div class="footer-copyright text-center py-3 bg-dark text-white">© 2020 Copyright:
            <a href="/" class="text-white"> IT SPA</a>
        </div>
     </div>
    `);

	footerSection.append(container);
	container.append(content);

	fragment.append(modal);
	fragment.append(footerSection);
	fragment.append(copyright);

	return fragment;
};
