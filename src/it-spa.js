import "bootstrap/dist/css/bootstrap.css";
import "bootstrap";
import "./it-spa.scss";
import $ from "jquery";
import { Router } from "./router/router";
import { nav } from "./navigation/nav";
import { footer } from "./footer/footer";

const main = $("main");

const router = new Router();

main.before(nav);
main.after(footer);

router.mount(main);

router.init();

export const main_router = router;
