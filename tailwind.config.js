module.exports = {
  mode: 'jit',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        bouncecat: {
          '10%': {
            transform: 'scaleX(0.3)',
          },
          '30%': {
            transform: 'scaleX(1)',
          },
          '60%': {
            transform: 'scaleX(0.5)',
          },
          '80%': {
            transform: 'scaleX(0.75)',
          },
          '100%': {
            transform: 'scaleX(0.6)',
          },
        },
      },
      width: {
        'container-lg': '1280px',
      },
      spacing: {
        'container-lg': '1280px',
      },
      animation: {
        bounce: 'bouncecat 1s ease infinite alternate',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    styled: true,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: '',
    themes: [
      'dark',
      'light',
      'cupcake',
      'bumblebee',
      'emerald',
      'corporate',
      'synthwave',
      'retro',
      'cyberpunk',
      'valentine',
      'halloween',
      'garden',
      'forest',
      'aqua',
      'lofi',
      'pastel',
      'fantasy',
      'wireframe',
      'black',
      'luxury',
      'dracula',
      'cmyk',
      'autumn',
      'business',
      'acid',
      'lemonade',
      'night',
      'coffee',
      'winter',
    ],
  },
}
