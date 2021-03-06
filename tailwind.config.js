module.exports = {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            height: { "custome-screen": "calc(100vh - 92px)" },
        },
    },
    plugins: [require("@tailwindcss/forms")({ strategy: "base" })],
};
