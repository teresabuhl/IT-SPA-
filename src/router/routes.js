import { home, rooms, treatments, booking, login, register } from "../views";

export const routes = [
	{ name: "", path: "/", date: {}, component: home },
	{ name: "Hotel", path: "/rooms", date: {}, component: rooms },
	{
		name: "Spa & Wellness",
		path: "/treatments",
		date: {},
		component: treatments,
	},
	{
		name: "Zaloguj",
		path: "/login",
		date: {},
		component: login,
	},
	{
		name: "Zarejestruj",
		path: "/register",
		date: {},
		component: register,
	},
	{
		name: "Koszyk",
		path: "/booking",
		date: {},
		component: booking,
	},
];
