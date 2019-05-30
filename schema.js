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

// Defining a Customer type
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
        // Within the resolve function, the data is retrieved
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

// Mutations (create, update, delete)
const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addCustomer: {
      type: CustomerType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        id: { type: GraphQLString },
        email: { type: GraphQLNonNull(GraphQLString) },
        age: { type: GraphQLNonNull(GraphQLInt) },
      },
      resolve(parent, args) {
        const { name, email, age } = args;
        return axios
          .post(jsonURL, {
            name,
            email,
            age,
          })
          .then(res => res.data);
      },
    },
    editCustomer: {
      type: CustomerType,
      args: {
        name: { type: GraphQLString },
        id: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLString },
        age: { type: GraphQLInt },
      },
      resolve(parent, args) {
        return axios.patch(jsonURL + `/${args.id}`, args).then(res => res.data);
      },
    },
    deleteCustomer: {
      type: CustomerType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const { name, email, age } = args;
        return axios
          .delete(jsonURL + `/${args.id}`, {
            name,
            email,
            age,
          })
          .then(res => res.data);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
});
