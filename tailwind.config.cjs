/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'ui-sans-serif', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'ui-serif', 'serif'],
      },
      colors: {
        // Brand greens — earthy forest palette
        forest: {
          50:  '#f2f7ee',
          100: '#e1edda',
          200: '#c4dbb7',
          300: '#9fc28d',
          400: '#76a461',
          500: '#568a42',
          600: '#416d31',
          700: '#325629',
          800: '#294523',  // primary brand green
          900: '#1e3319',
          950: '#0f1e0d',
        },
      },
      aspectRatio: {
        '4/3': '4 / 3',
      },
      typography: (theme) => ({
        stone: {
          css: {
            '--tw-prose-body': theme('colors.stone[700]'),
            '--tw-prose-headings': theme('colors.stone[900]'),
            '--tw-prose-links': theme('colors.forest[700]'),
            '--tw-prose-bold': theme('colors.stone[900]'),
          },
        },
      }),
    },
  },
  plugins: [
    // Uncomment after: npm install @tailwindcss/typography
    // require('@tailwindcss/typography'),
  ],
};
