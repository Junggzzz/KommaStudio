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
                primary: {
                    DEFAULT: "#000000", // Deep Black
                    light: "#1A1A1A",
                    dark: "#000000",
                },
                secondary: {
                    DEFAULT: "#333333", // Dark Gray
                    light: "#4D4D4D",
                    dark: "#1A1A1A",
                },
                accent: {
                    DEFAULT: "#808080", // Neutral Gray
                    light: "#B3B3B3",
                    dark: "#4D4D4D",
                },
                background: "#FFFFFF", // Pure White
                foreground: "#000000", // Deep Black for text
                muted: "#666666",
            },
            fontFamily: {
                heading: ["var(--font-outfit)", "sans-serif"],
                body: ["var(--font-inter)", "sans-serif"],
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
        },
    },
    plugins: [],
};
export default config;
