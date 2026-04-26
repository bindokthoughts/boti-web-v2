/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'rgb(var(--background-rgb) / <alpha-value>)',
        foreground: 'rgb(var(--foreground-rgb) / <alpha-value>)',
        primary: "#0046FF",
        accent: "#00E0FF",
      },
      fontFamily: {
        sans: ["SharpSansDispNo1", "sans-serif"],
      },
      boxShadow: {
        'glow': '0 0 20px rgba(0, 224, 255, 0.3)',
        'glow-strong': '0 0 40px rgba(0, 224, 255, 0.5)',
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
