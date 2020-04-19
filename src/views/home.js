import $ from "jquery";
import "./home.scss";

export const home = () => {
	const fragment = $(new DocumentFragment());

	let container = $(`<div class="container marketing"></div>`);
	let carousel = $(`<div id="carouselExampleCaptions" class="carousel slide" data-ride="carousel" data-interval="5000">
  <ol class="carousel-indicators">
    <li data-target="#carouselExampleCaptions" data-slide-to="0" class="active"></li>
    <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
    <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
  </ol>
  <div class="carousel-inner h-100">
    <div class="carousel-item active h-100">
      <div class="w-100 h-100 background-image carousel-item-image-1"></div>
      <div class="carousel-caption d-none d-md-block text-left">
        <h1>Wyjątkowe miejsce odnowy</h1>
        <h5>Kompleksowa oferta SPA oraz luksusowe zabiegi pielęgnacyjne pozwalają doświadczyć prawdziwego relaksu oraz skutecznie zregenerować ciało i rozpieścić zmysły.</h5>
      </div>
    </div>
    <div class="carousel-item  h-100">
      <div class="w-100 h-100 background-image carousel-item-image-2"></div>
      <div class="carousel-caption d-none d-md-block">
        <h1>Chwila relaksu dla każdego</h1>
        <h5>Kompleksowa, profesjonalna pielęgnacja twarzy i ciała w wyjątkowej atmosferze, pod okiem naszych specjalistów.</h5>
      </div>
    </div>
    <div class="carousel-item h-100">
      <div class="w-100 h-100 background-image carousel-item-image-3"></div>
      <div class="carousel-caption d-none d-md-block text-right">
        <h1>Wzpoczynek nad jeziorem</h1>
        <h5>Doskonała lokalizacja tuż nad brzegiem jeziora gwarantuje bogaty wybór aktywności: spacery, nordic walking, możliwość łowienia ryb, korzystanie z rowerów wodnych bądź łódki.</h5>
      </div>
    </div>
  </div>
  <a class="carousel-control-prev" href="#carouselExampleCaptions" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleCaptions" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div>`);

	let featurette = $(`
	  <hr class="featurette-divider">

    <div class="row featurette">
      <div class="col-md-7">
        <h2 class="featurette-heading">Zapraszamy do jednego z najpiękniejszych SPA w Polsce</h2>
        <p class="lead">Położony nad brzegiem jeziora Pensjonat IT SPA idealnie wkomponował się w piękno otaczającej go przyrody. Do dyspozycji Gości oddajemy część hotelowo-restauracyjną, ogród z tarasami, strefę hotelowo-konferencyjną z salą bankietową i kominkową oraz nowoczesne SPA. <br> Niezwykłe otoczenie i wyjątkowa atmosfera sprawiają, że każdy dozna tu chwili zapomnienia, poczuje odrobinę luksusu, wyciszy się, zadba o duszę i ciało. To doskonałe miejsce dla pragnących błogiego relaksu, profesjonalnych zabiegów SPA i wykwintnej, regionalnej kuchni. IT SPA może także stanowić cel wymarzonej romantycznej podróży we dwoje, aktywnego wypoczynku lub spotkań biznesowych.</p>
      </div>
      <div class="col-md-5">
      <div class="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto featurette-item-image-1"></div>
      </div>
    </div>

    <hr class="featurette-divider">

    <div class="row featurette">
      <div class="col-md-7 order-md-2">
        <h2 class="featurette-heading">Bogata oferta zabiegów rozpieści ciało i zmysły</h2>
        <p class="lead">IT SPA zapewnia swoim Gościom szeroką paletę nowoczesnych zabiegów, rytuałów na twarz i ciało oraz autorskich masaży z wykorzystaniem profesjonalnych kosmetyków. Dopełnieniem wypoczynku stanie się relaks w ekskluzywnej przestrzeni Wellness z basenem, sauną suchą i parową oraz jacuzzi.</p>
      </div>
      <div class="col-md-5 order-md-1">
        <div class="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto featurette-item-image-2"></div>
      </div>
      </div>
    </div>

    <hr class="featurette-divider">

    <div class="row featurette">
      <div class="col-md-7">
        <h2 class="featurette-heading">Celem naszego szefa kuchni jest zdobycie Waszych serc i podniebienia</h2>
        <p class="lead">Dlatego każdy posiłek jest wyjątkowo podany, zdrowy i niezwykle smaczny. Dbając o najmniejszy szczegół, urozmaicamy dania tak, aby nadać im niepowtarzalnego smaku, aromatu i wyglądu. W menu serwujemy posiłki dietetyczne oraz pełnokaloryczne. Kuchnia serwowana w IT SPA jest bogata w owoce i warzywa pochodzące z własnych ekologicznych upraw, a jej dopełnieniem są przygotowywane każdego roku wyśmienite domowe przetwory.</p>
      </div>
      <div class="col-md-5">
       <div class="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto featurette-item-image-3"></div>
      </div>
    </div>

    <hr class="featurette-divider">`);

	$(".carousel").carousel();

	$(container).append(featurette);

	fragment.append(carousel);
	fragment.append(container);

	return Promise.resolve(fragment);
};
