const express = require('express');
const expressGraphQL = require('express-graphql');
const schema = require('./schema');

const app = express();

/*
  express-graphql allows creation of a GraphQL HTTP server with Express.
  It must take in a GraphQLSchema instance. In this case, it is imported from
  schema.js. The graphiql option, if set to true, presents the in-browser
  GraphiQL IDE when the endpoint is visited.

  For more information about GraphiQL, visit https://github.com/graphql/graphiql
*/

app.use(
  '/graphql',
  expressGraphQL({
    schema,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log('Application running on port 4000');
});
