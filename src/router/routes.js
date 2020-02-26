import { home, rooms, treatments, booking, signup, signin } from "../views";

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
	{
		name: "SignUp",
		path: "/signup",
		date: {},
		component: signup
	},
	{
		name: "Sign In",
		path: "/signin",
		date: {},
		component: signin
	}
];
