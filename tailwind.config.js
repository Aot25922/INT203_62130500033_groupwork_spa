module.exports = {
  purge: { content: ['./public/**/*.html', './src/**/*.vue'] },
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      rubik : ['Rubik', 'sans-serif']
    },
    colors : {
      silver : '#E2E2E2',
      'devy-gray':'#605F5E',
      deep:'#51666F',
      'pewter-blue':'#83AFC1',
      'teal-blue':'#426D7F',
      'red-salsa' : '#FB3640',
      'celadon-blue': '#247BA0',
      'my-magenta': '#832D52',
      'sage':'#B2B09B',
      'dark-angel':'#254441',
      'zombie':'#43AA8B',
      'sweet':'#FF6F59',
      'ocean':'#EAE9E3',
      'dark-blue':'#2c3e50',
      'sky':'#5ADBFF',
      'nice-orange':'#FE9000'
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
