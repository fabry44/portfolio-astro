/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: 'class', // Changed to 'class' to allow toggling between dark and light mode
	theme: {
		extend: {
			colors: {
				'text': 'var(--text)',
				'background': 'var(--background)',
				'primary': 'var(--primary)',
				'secondary': 'var(--secondary)',
				'accent': 'var(--accent)',
			},
		},
	},
	plugins: [],
}
// colors: {
// 	'dark-text': '#eafbfa',
// 	'dark-background': '#020808',
// 	'dark-primary': '#2acbc8',
// 	'dark-secondary': '#173a72',
// 	'dark-accent': '#2246aa',
// 	'light-text': '#041514',
// 	'light-background': '#f7fdfd',
// 	'light-primary': '#34d5d3',
// 	'light-secondary': '#8db0e8',
// 	'light-accent': '#5579dd',
// }