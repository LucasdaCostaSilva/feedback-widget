module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      colors: {
        brand: {
          500: '#8657e5'
        }
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
