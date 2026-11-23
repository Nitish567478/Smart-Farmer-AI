
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#123B35',
        secondary: '#168A70',
        accent: '#38BDF8',
        background: '#F7FAF8',
        card: '#FFFFFF',
        'text-primary': '#172B25',
        'text-secondary': '#64748B',
        border: '#E2E8F0',
        success: '#16A34A',
        warning: '#F59E0B',
        danger: '#DC2626',
        information: '#2563EB',
        brand: {
          dark: '#123B35',
          primary: '#123B35',
          secondary: '#168A70',
          accent: '#38BDF8',
          light: '#E6F4F1',
          bg: '#F7FAF8',
          card: '#FFFFFF',
          text: '#172B25',
          muted: '#64748B',
          border: '#E2E8F0',
          warning: '#F59E0B',
          danger: '#DC2626',
          info: '#2563EB',
          success: '#16A34A'
        }
      }
    },
  },
  plugins: [],
};
