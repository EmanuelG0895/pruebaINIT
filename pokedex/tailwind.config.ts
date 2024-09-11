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
        'custom-inner-shadow': 'inset 0px 0px 7px 7px #E0E0E0', // Sombra interior de 2px
        'drop-shadow-2dp': '4px 0px 25px -3px #E0E0E0', // Drop shadow de 2dp
        'drop-6dp': '0 6px 12px rgba(0, 0, 0, 0.2)', // Drop shadow de 6dp
      },
    },
  },
  plugins: [],
};
export default config;
