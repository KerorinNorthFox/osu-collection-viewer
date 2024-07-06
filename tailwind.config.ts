import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./node_modules/flowbite-react/lib/**/*.js",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    extend: {
      spacing: {
        header: "3rem",
      },
      colors: {
        light: {
          text: "#454545",
          bg: "#ffffff",
        },
        dark: {
          text: "#F5F5F5",
          bg: "#242629",
        },
        hover: "rgba(100,100,100,0.2)",
      },
      transitionDuration: {
        bg: "500ms",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("flowbite/plugin")],
} satisfies Config;

export default config;
