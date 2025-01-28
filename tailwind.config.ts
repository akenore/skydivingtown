import type { Config } from "tailwindcss";
// import flowbite from "flowbite-react/tailwind";
const flowbite = require("flowbite-react/tailwind");

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        celticBlue: "#2676CA",
        azure: "#48A1FF"
      },
      backgroundImage: {
        "hero-bg-desktop": "url('/hero/desktop-bg.webp')",
        "hero-bg-mobile": "url('/hero/mobile-bg.webp')",
        "right-bg": "url('/right-bg.webp')",
        "right-bg-mobile": "url('/right-bg-mobile.webp')",
      },
      fontFamily: {
        custom: ['Monument', 'sans-serif'],
      },
    },
  },
  plugins: [flowbite.plugin(),],
} satisfies Config;
