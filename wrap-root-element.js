const React = require('react');
const { ThemeProvider } = require('theme-ui');
const {deep} = require('@theme-ui/presets');
const {IdentityProvider}  = require('./src/identity-context');



const newTheme = {
  ...deep,
  sizes: { container: 1024 }
};

module.exports = ({ element }) => (
  <IdentityProvider>
    <ThemeProvider theme={newTheme}>{element}</ThemeProvider>
  </IdentityProvider>
);