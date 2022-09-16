const clubQueryResolver = require("./clubQueryResolver");
const teamResolvers = require("./teamResolvers");

module.exports = {
  VerifiedFullTeamResponse: {
    totalPages: (parent) => {
      const totalDocs = parent.totalDocs;
      const limit = parent.limit;
      const totalPages = Math.ceil(totalDocs / limit);
      return totalPages;
    },

    nextCursor: (parent) => {
      return parent.docs[parent.docs.length - 1].id;
    },

    hasNextCursor: (parent) => {
      const limit = parent.limit;
      const resCount = parent.resCount;
      if (resCount < limit) {
        return false;
      } else {
        return true;
      }
    },
  },
  Query: {
    ...teamResolvers.Query,
    ...clubQueryResolver.Query,
  },
  Mutation: {
    ...teamResolvers.Mutation,
    ...clubQueryResolver.Mutation,
  },
};
