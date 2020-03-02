import { home, rooms, treatments, booking, login, register } from "../views";

export const routes = [
	{ name: "", path: "/", date: {}, component: home },
	{ name: "Hotel", path: "/rooms", date: {}, component: rooms },
	{
		name: "SPA & WELLNESS",
		path: "/treatments",
		date: {},
		component: treatments
	},
	{ name: "Koszyk", path: "/booking", date: {}, component: booking },
	{
		name: "Zaloguj się",
		path: "/login",
		date: {},
		component: login
	},
	{
		name: "Zarejestruj się",
		path: "/register",
		date: {},
		component: register
	}
];
