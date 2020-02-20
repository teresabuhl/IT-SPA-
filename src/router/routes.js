import { home, rooms, treatments, booking, basketpage } from "../views";

export const routes = [
	{ name: "Home", path: "/", date: {}, component: home },
	{ name: "Rooms", path: "/rooms", date: {}, component: rooms },
	{
		name: "Treatments",
		path: "/treatments",
		date: {},
		component: treatments
	},
	{ name: "Booking", path: "/booking", date: {}, component: booking },
	{ name: "Basket", path: "/basket", date: {}, component: basketpage }
];
