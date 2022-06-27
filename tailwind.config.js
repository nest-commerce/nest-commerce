/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './apps/admin-ui/src/**/*.{tsx,ts,scss}',
    './libs/ui/src/**/*.{tsx,ts,scss}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
  darkMode: 'class',
};
