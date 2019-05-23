const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
} = require('graphql');

// dummy data
const customers = [
  { id: '1', name: 'John Doe', email: 'jdoe@gmail.com', age: 35 },
  { id: '2', name: 'Steve Smith', email: 'ssmith@gmail.com', age: 25 },
  { id: '3', name: 'Sara Williams', email: 'swilliams@gmail.com', age: 32 },
];

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
      resolve(parent, args) {
        for (let i = 0; i < customers.length; i++) {
          if (customers[i].id === args.id) {
            return customers[i];
          }
        }
      },
    },
    customers: {
      type: GraphQLList(CustomerType),
      resolve(parent, args) {
        return customers;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
