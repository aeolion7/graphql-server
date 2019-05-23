const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
} = require('graphql');
const axios = require('axios');
const jsonURL = 'http://localhost:3000/customers';

const CustomerType = new GraphQLObjectType({
  name: 'Customer',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    age: { type: GraphQLInt },
  }),
});

// Root Query (baseline for all queries and object types)
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    customer: {
      type: CustomerType,
      args: {
        id: {
          type: GraphQLString,
        },
      },
      async resolve(parent, args) {
        const { data } = await axios.get(jsonURL + `/${args.id}`);
        return data;
      },
    },
    customers: {
      type: GraphQLList(CustomerType),
      async resolve(parent, args) {
        const { data } = await axios.get(jsonURL);
        return data;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
