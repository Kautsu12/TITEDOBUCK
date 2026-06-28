import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Paleta inspirada no Soldado Invernal: metal, vermelho-estrela e azul-noite.
        winter: {
          900: '#0b0f14',
          800: '#11161d',
          700: '#1a212b',
          600: '#28323f',
        },
        steel: '#9aa7b4',
        star: '#c81d25',
        accent: '#d4af37',
      },
      fontFamily: {
        display: ['Oswald', 'Impact', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [typography],
};
