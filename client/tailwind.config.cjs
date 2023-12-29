/* eslint-disable no-undef */
// tailwind.config.js
// TO DO: Add Fira Sans
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./index.html',
		'client/src/components/landlordComponents/LDocuments.jsx',
		'./src/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		colors: {
			orange: '#f98500',
			green: '#558540',
			stone: '#fffcf9',
		},
		backgroundColor: {
			'custom-theme': '#fffcf9',
			stone: '#fffcf9',
		},
		fontFamily: {
			sans: ['Fira Sans', ...defaultTheme.fontFamily.sans],
		},
	},
	plugins: [
		require('@tailwindcss/typography'),
		require('@tailwindcss/forms'),
		require('@tailwindcss/aspect-ratio'),
	],
};
