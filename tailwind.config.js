/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#0075bb",
                secondary: "#0f395c",
                accent: "#ca8c19",
            },
            fontFamily: {
                decart: ["Decart", "serif"],
                gilroy: ["Gilroy", "sans-serif"],
                serif: ["Decart", "Playfair Display", "serif"],
                sans: ["Gilroy", "Inter", "sans-serif"],
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
