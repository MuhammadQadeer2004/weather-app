/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: { body: ["Outfit", "system-ui", "sans-serif"] },
      keyframes: {
        rain: { "0%": { transform: "translateY(-10vh)" }, "100%": { transform: "translateY(110vh)" } },
        drift: { "0%": { transform: "translateX(-30vw)" }, "100%": { transform: "translateX(120vw)" } },
        glow: { "0%,100%": { transform: "scale(1)", opacity: ".9" }, "50%": { transform: "scale(1.12)", opacity: "1" } },
        flash: { "0%,92%,100%": { opacity: "0" }, "94%": { opacity: ".6" }, "97%": { opacity: ".15" }, "98%": { opacity: ".5" } },
      },
      animation: {
        rain: "rain 1s linear infinite",
        drift: "drift 70s linear infinite",
        glow: "glow 5s ease-in-out infinite",
        flash: "flash 8s linear infinite",
      },
    },
  },
  plugins: [],
};
