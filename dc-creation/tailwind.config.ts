import type { Config } from 'tailwindcss';
const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: '#0B1F3A', light: '#132B4F' },
        gold: { DEFAULT: '#D4AF37', dark: '#B8941F' },
        text: { primary: '#F5F7FA', secondary: '#C7D2E0' },
        border: '#27476E',
      },
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        body: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;