import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#EFEFEF",
        primary:"#DC0A2D",
        white: "#FFFFFF",
        light: "#E0E0E0",
        medium: "#666666",
        dark: "#212121",
        water: "#6493EB",
        steel: "#B7B9D0",
        rock: "#B69E31",
        psychic: "#FB5584",
        poison: "#A43E9E",
        ice: "#9AD6DF",
        ground: "#DEC16B",
        grass: "#74CB48",
        normal: "#AAA67F",
        ghost: "#70559B",
        flying: "#A891EC",
        fire: "#F57D31",
        fighting: "#C12239",
        fairy: "#E69EAC",
        electric: "#F9CF30",
        dragon: "#7037FF",
        darkPokemon: "#75574C",
        bug: "#A7B723"
      },
      boxShadow: {
        'inner-2dp': 'inset 0 2px 2px rgba(0, 0, 0, 0.1)', // Sombra interior de 2px
        'drop-2dp': '0 2px 4px rgba(0, 0, 0, 0.1)', // Drop shadow de 2dp
        'drop-6dp': '0 6px 12px rgba(0, 0, 0, 0.2)', // Drop shadow de 6dp
      },
    },
  },
  plugins: [],
};
export default config;
