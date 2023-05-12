module.exports = {
	mode: 'jit', // Just-In-Time Compiler
	content: ['./src/**/*.css','./src/**/*.pug'],
	darkMode: true, // or 'media' or 'class'
	theme: {
		screens: {
			'tablet': '640px',
			// => @media (min-width: 640px) { ... }

			'laptop': '1024px',
			// => @media (min-width: 1024px) { ... }

			'desktop': '1280px',
			// => @media (min-width: 1280px) { ... }
		},
	},
	variants: {
		extend: {},
	},
	plugins: [
		{
			'postcss-import': {},
			tailwindcss: {},
			autoprefixer: {},
		}
	]
}
