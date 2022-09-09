const clubQueryResolver = require("./clubQueryResolver");
const teamResolvers = require("./teamResolvers");

module.exports = {
  Query: {
    ...teamResolvers.Query,
    ...clubQueryResolver.Query,
  },
  Mutation: {
    ...teamResolvers.Mutation,
    ...clubQueryResolver.Mutation,
  },
};
