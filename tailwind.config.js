module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    boxShadow: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
     '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
      inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      none: 'none',
      'ticker-active' : 'inset 3px 0 0 0 #3067f0',
      'header-active' : 'inset 0 3px 0 0 #3067f0',
      'buy-header-active' : 'inset 0 3px 0 0 #10B981',
      'main-header-active' : 'inset 0 -3px #f9de38',
      'sell-header-active' : 'inset 0 3px 0 0 #DC2626',
      'buy-ticker-active' : 'inset 3px 0 0 0 #10B981',
      'sell-ticker-active' : 'inset 3px 0 0 0 #DC2626',

    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
