const ClubQueries = require("../../models/queries");
const Team = require("../../models/teams");
const { ApolloError } = require("apollo-server");
const { customAlphabet } = require("nanoid");

module.exports = {
  Query: {
    getAllQueries: async (_, { lim_num, sortOpen }) => {
      const count = await ClubQueries.collection.countDocuments();
      try {
        const queries = await ClubQueries.find()
          .sort(sortOpen ? "-queryOpen" : "-createdAt")
          .limit(lim_num ?? 20);
        return {
          queryCount: count,
          openQueryCount: queries.filter((query) => query.queryOpen).length,
          closedQueryCount: queries.filter((query) => !query.queryOpen).length,
          data: queries,
        };
      } catch (error) {
        throw new ApolloError(err, "400");
      }
    },

    getOneQuery: async (_, { queryID }) => {
      try {
        const query = await ClubQueries.findOne({ queryID });
        if (query) {
          return query;
        } else {
          throw new Error("Query not found");
        }
      } catch (err) {
        throw new ApolloError(err, "400");
      }
    },

    getTeamQuery: async (_, { lim_num, teamID, sortOpen }) => {
      try {
        const queries = await ClubQueries.find({ teamID })
          .sort(sortOpen ? "-queryOpen" : "-createdAt")
          .limit(lim_num ?? 20);
        return queries;
      } catch (err) {
        throw new ApolloError(err, "400");
      }
    },
  },

  Mutation: {
    createClubQuery: async (_, { query, teamID }) => {
      const nanoid = customAlphabet(process.env.SALT, 4);
      const queryID = `QCASE-${nanoid()}`;
      try {
        const newQuery = new ClubQueries({
          queryID,
          teamID,
          query,
        });
        const teamExistQuery = await Team.findOne({ teamID });
        if (teamExistQuery) {
          const query = await newQuery.save();
          return query;
        } else {
          throw new Error(
            "Invalid Team ID, please check again or register before raising a query"
          );
        }
      } catch (error) {
        throw new ApolloError(error, "400");
      }
    },

    closeClubQuery: async (_, { queryID }) => {
      try {
        const query = await ClubQueries.findOne({ queryID });
        if (query) {
          query.queryOpen = false;
          await query.save();
          return query;
        } else {
          throw new Error("Query not found");
        }
      } catch (err) {
        throw new ApolloError(err, "400");
      }
    },

    deleteSingleQuery: async (_, { queryID }) => {
      try {
        const query = await ClubQueries.findOne({ queryID });
        if (query) {
          await query.delete();
          return "Query deleted successfully";
        } else {
          throw new Error("Query not found");
        }
      } catch (err) {
        throw new ApolloError(err, "400");
      }
    },
  },
};
