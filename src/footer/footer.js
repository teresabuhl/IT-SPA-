import $ from "jquery";
import "./footer.scss";

export const footer = () => {
	const fragment = $(new DocumentFragment());

	const footerSection = $(`
    <footer class="page-footer bg-secondary text-white py-4 mt-4">
    </footer>
    `);

	const container = $(`<div class="container"></div>`);

	const content = $(`
    <div class="row">
     <div class="col-md-8">
        <h5>IT SPA</h5>
        <p class="info">Niezwykłe otoczenie i wyjątkowa atmosfera sprawiają, że każdy dozna tu chwili zapomnienia, poczuje odrobinę luksusu, wyciszy się, zadba o duszę i ciało. To doskonałe miejsce dla pragnących błogiego relaksu, profesjonalnych zabiegów SPA i wykwintnej, regionalnej kuchni.</p>
        </div>
        <div class="col-md-4">
        <form action="">
            <h5>Newsletter</h5>
            <div class="input-group">
            <input type="email" class="form-control mr-3" placeholder="e-mail">
            <div class="input-grup-append">
                <button class="btn btn-dark">Zapisz się</button>
            </div>
            </div>
        </form>
        </div>
    </div>
    `);

	const copyright = $(`
    <div footer class="page-footer font-small">
        <div class="footer-copyright text-center py-3 bg-dark text-white">© 2020 Copyright:
            <a href="/" class="text-white"> IT SPA</a>
        </div>
     </div>
    `);

	footerSection.append(container);
	container.append(content);

	fragment.append(footerSection);
	fragment.append(copyright);

	return fragment;
};
