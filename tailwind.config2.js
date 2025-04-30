module.exports = {
	content: ['./src/**/*.{html,ts}', './public/**/*.html'],
	theme: {
	  extend: {
		colors: {
		  'pong-bg': '#F3F0E8',
		  'pong-primary': '#2F3E46',
		  'pong-accent': '#C44536',
		  'pong-secondary': '#E0A458',
		  'pong-highlight': '#AAB7B8',
		  'pong-bg-dark': '#1B1B1B',
		  'pong-primary-dark': '#AEBABF',
		  'pong-accent-dark': '#E05E4B',
		  'pong-secondary-dark': '#D1A25F',
		  'pong-highlight-dark': '#838E91',
		  'pong-bg-sport': '#F5F5F5',
		  'pong-primary-sport': '#003049',
		  'pong-accent-sport': '#D62828',
		  'pong-secondary-sport': '#F77F00',
		  'pong-highlight-sport': '#FCBF49',
		},
		fontFamily: {
		  sans: ['Inter', 'sans-serif']
		}
	  }
	},
	plugins: []
  }