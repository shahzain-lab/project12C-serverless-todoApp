var React = require("react");
var {
    ApolloProvider,
    ApolloClient,
    InMemoryCache,
    HttpLink
  } =
  require('@apollo/client');
var wrapRootElement = require('./wrap-root-element');

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: 'https://shahzain-jamstack-serverless-todo.netlify.app/.netlify/functions/app'
    })
  })
  

exports.wrapRootElement = ({element})   => {
    return (
        <ApolloProvider client={client}>
          {wrapRootElement({ element })}
        </ApolloProvider>
      );
}