/* eslint-disable no-undef */
// tailwind.config.js

const defaultTheme = require('tailwindcss/defaultTheme');
/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				'light-gray': '#e9ecef',
				'dark-gray': '#868e96',
				'orange': '#fd7e14',
				'dark-green': '#2f9e44',
				'light-green': '#b2f2bb',
				'light-orange': '#fff4e6',
				'light-red': '#ffc9c9',
			},
			fontFamily: {
				sans: ['Inter var', ...defaultTheme.fontFamily.sans],
			},
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
		require('@tailwindcss/forms'),
		require('@tailwindcss/aspect-ratio'),
	],
};
