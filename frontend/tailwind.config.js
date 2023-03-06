const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  darkMode : "class",
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  plugins: [require('@tailwindcss/forms')],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
        comfortaa : ['Comfortaa' , 'sans-serif']
      },
      backgroundImage : {
        'cover-desktop':"url('./src/assets/cover.jpg')",
        'cover-mobile':"url('./src/assets/Cover-mobile-2.jpg')",
        'gradient-socials':"linear-gradient(50deg, #013316 0%, #013316 40%,  #ffee00c7 100%)"
        ,
        'gradient-gallery':"linear-gradient(160deg, #013316 0%, #013316 40%, #ffee00c7 100%)"
        ,
        'gradient-login':"linear-gradient(180deg, #ffee00c7  0%, #013316 1%, #013316  100%)",

  
        
        
        
      },
      boxShadow:{
        'bottom':" 0px 15px 10px -15px #73A1FB"
      },
      colors : {
        'dark-primary':"#013316"
      }
    },
  },
}
