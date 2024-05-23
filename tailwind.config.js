/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		//? Media Screen's Size
		screens: {
			sm: { max: '640px' },
			md: { max: '768px' },
			lg: { max: '1024px' },
			xl: { max: '1280px' },
			'2xl': { min: '1480px' },
		},
		extend: {
			fontFamily: {
				shabnam: 'shabnam',
				arial: 'Arial'
			},
			fontSize: {
				menu: '40px',
			},
			borderRadius: {
				dashboardcontainer: '20px',
				dashboarditem: '15px',
			}
		},

		// container sizes
		container: {
			center: true,
			screens: {
				sm: { min: '640px' },
				md: { min: '768px' },
				lg: { min: '1024px' },
				xl: { min: '1280px' },
				'2xls': { min: '1480px' },
			},
		},

		colors: {
			primary: '#252525',
			secondary: '#393939',
			white: '#fff',
			menu: '#1E1E1E',
			black: '#000',
			price: '#545454',
			primaryBTN: '#714EFF',
			hoverBTN: '#B0B0B0',
			hoverDropDownLink: '#5a5a5a',
			footer: '#4a4a4a',
			dashboardItem: '#494949',
			dashboardItemActive: '#6F6F6F',
			hoverConfirmBTN: '#689F38',
			red: '#F66B6B',
			green: '#10DD60'
		},
	},
	plugins: [],
}
