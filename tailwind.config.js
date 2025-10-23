/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
  	extend: {
  		fontFamily: {
  			sans: [
  				'Geist',
  				'system-ui',
  				'-apple-system',
  				'sans-serif'
  			]
  		},
  		colors: {
  			// Thèmes pour le PDF uniquement (pas l'UI)
  			theme: {
  				neutral: {
  					DEFAULT: '#000000',
  					light: 'rgba(0, 0, 0, 0.06)'
  				},
  				blue: {
  					DEFAULT: '#2563EB',
  					light: '#EFF6FF'
  				},
  				green: {
  					DEFAULT: '#16A34A',
  					light: '#F0FDF4'
  				},
  				orange: {
  					DEFAULT: '#EA580C',
  					light: '#FFF7ED'
  				},
  				purple: {
  					DEFAULT: '#9333EA',
  					light: '#FAF5FF'
  				}
  			},
  			// Palette monochrome Notion-like
  			border: 'rgba(0, 0, 0, 0.06)',
  			input: 'rgba(0, 0, 0, 0.06)',
  			ring: 'rgba(0, 0, 0, 0.2)',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: '0.5rem',
  			md: '0.375rem',
  			sm: '0.25rem'
  		},
  		boxShadow: {
  			sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  			DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
  		},
  		transitionDuration: {
  			DEFAULT: '150ms'
  		},
  		fontSize: {
  			xs: ['0.75rem', { lineHeight: '1rem' }],
  			sm: ['0.875rem', { lineHeight: '1.25rem' }],
  			base: ['0.9375rem', { lineHeight: '1.5rem' }],
  			lg: ['1.125rem', { lineHeight: '1.75rem' }],
  			xl: ['1.25rem', { lineHeight: '1.75rem' }],
  			'2xl': ['1.5rem', { lineHeight: '2rem' }],
  			'3xl': ['1.875rem', { lineHeight: '2.25rem' }]
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}

