import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
