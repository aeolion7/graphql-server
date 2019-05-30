"use strict";
var express = require('express');
var expressGraphQL = require('express-graphql');
var schema = require('./schema');
var app = express();
app.use('/graphql', expressGraphQL({
    schema: schema,
    graphiql: true,
}));
app.listen(4000, function () {
    console.log('Application running on port 4000');
});
