import type { Config } from "tailwindcss";
import daisyui from "daisyui";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        // Using modern `rgb`
        primaryColor: "#7ea7fa",
        secondaryColor: "#8606a8",
        textColor: "#d4e0fd",
        bgColor: "#010c20",
        accentColor: "#f60bc2",
        greenColor: "#2ecc71",
      },
    },
  },
  plugins: [daisyui],
};
export default config;
