'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : new P(function(resolve) {
              resolve(result.value);
            }).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function(thisArg, body) {
    var _ = {
        label: 0,
        sent: function() {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === 'function' &&
        (g[Symbol.iterator] = function() {
          return this;
        }),
      g
    );
    function verb(n) {
      return function(v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError('Generator is already executing.');
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y['return']
                  : op[0]
                  ? y['throw'] || ((t = y['return']) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
var _a = require('graphql'),
  GraphQLObjectType = _a.GraphQLObjectType,
  GraphQLString = _a.GraphQLString,
  GraphQLInt = _a.GraphQLInt,
  GraphQLSchema = _a.GraphQLSchema,
  GraphQLList = _a.GraphQLList,
  GraphQLNonNull = _a.GraphQLNonNull;
var axios = require('axios');
var jsonURL = 'http://localhost:3000/customers';
var CustomerType = new GraphQLObjectType({
  name: 'Customer',
  fields: function() {
    return {
      id: { type: GraphQLString },
      name: { type: GraphQLString },
      email: { type: GraphQLString },
      age: { type: GraphQLInt },
    };
  },
});
// Root Query (baseline for all queries and object types)
var RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    customer: {
      type: CustomerType,
      args: {
        id: {
          type: GraphQLString,
        },
      },
      resolve: function(parent, args) {
        return __awaiter(this, void 0, void 0, function() {
          var data;
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                return [4 /*yield*/, axios.get(jsonURL + ('/' + args.id))];
              case 1:
                data = _a.sent().data;
                return [2 /*return*/, data];
            }
          });
        });
      },
    },
    customers: {
      type: GraphQLList(CustomerType),
      resolve: function(parent, args) {
        return __awaiter(this, void 0, void 0, function() {
          var data;
          return __generator(this, function(_a) {
            switch (_a.label) {
              case 0:
                return [4 /*yield*/, axios.get(jsonURL)];
              case 1:
                data = _a.sent().data;
                return [2 /*return*/, data];
            }
          });
        });
      },
    },
  },
});
// Mutations (create, update, delete)
var mutation = new GraphQLObjectType({
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
      resolve: function(parent, args) {
        var name = args.name,
          email = args.email,
          age = args.age;
        return axios
          .post(jsonURL, {
            name: name,
            email: email,
            age: age,
          })
          .then(function(res) {
            return res.data;
          });
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
      resolve: function(parent, args) {
        return axios.patch(jsonURL + ('/' + args.id), args).then(function(res) {
          return res.data;
        });
      },
    },
    deleteCustomer: {
      type: CustomerType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve: function(parent, args) {
        var name = args.name,
          email = args.email,
          age = args.age;
        return axios
          .delete(jsonURL + ('/' + args.id), {
            name: name,
            email: email,
            age: age,
          })
          .then(function(res) {
            return res.data;
          });
      },
    },
  },
});
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: mutation,
});
