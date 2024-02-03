import { nextui } from "@nextui-org/theme";

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				primary: "#38a7c8", // Replace with the actual primary color
				secondary: "#F2BE22", // Replace with the actual secondary color
				// Add any other colors used in the design
			},
		},
	},
	darkMode: "class",
	plugins: [nextui()],
};
