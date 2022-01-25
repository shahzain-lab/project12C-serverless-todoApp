import React from 'react';
import { ThemeProvider } from 'theme-ui';
import {deep} from '@theme-ui/presets';
import {
    ApolloProvider,
    ApolloClient,
    InMemoryCache,
    HttpLink
  } from '@apollo/client';

  const client = new ApolloClient({
    link: new HttpLink({
      uri: '/.netlify/functions/todolist/graphql',
      fetch
    }),
    cache: new InMemoryCache(),
  })

const newTheme = {
  ...deep,
  sizes: { container: 1024 }
};

export const wrapRootElement = ({ element }) => {
  return(
    <ApolloProvider client={client}>{element}
    <ThemeProvider theme={newTheme}>{element}</ThemeProvider>
    </ApolloProvider>
);
  }