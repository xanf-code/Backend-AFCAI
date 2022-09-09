const Team = require("../../models/teams");
const ClubQueries = require("../../models/queries");
const { ApolloError } = require("apollo-server");
const { customAlphabet } = require("nanoid");

module.exports = {
  Query: {
    getTeams: async (_, { lim_num }) => {
      try {
        const teams = await Team.find()
          .sort("isVerified")
          .limit(lim_num ?? 20);
        return teams;
      } catch (err) {
        throw new ApolloError(err);
      }
    },
    getTeam: async (_, { teamID }) => {
      try {
        const team = await Team.findOne({ teamID });
        if (team) {
          return team;
        } else {
          throw new Error("Team not found");
        }
      } catch (err) {
        throw new ApolloError(err);
      }
    },
  },

  Mutation: {
    registerTeam: async (
      _,
      {
        teamName,
        teamAbrieviation,
        description,
        teamLogo,
        association,
        based,
        email,
        phone,
        website,
        socials,
      }
    ) => {
      const nanoid = customAlphabet(process.env.SALT, 4);
      const teamID = `${teamAbrieviation}-${nanoid()}`;
      const newTeam = new Team({
        teamName,
        teamAbrieviation,
        teamID,
        description,
        teamLogo,
        association,
        based,
        email,
        phone,
        website,
        socials,
      });
      try {
        const team = await newTeam.save();
        return team;
      } catch (err) {
        throw new ApolloError(err, "400");
      }
    },

    verifyTeam: async (_, { teamID }) => {
      try {
        const team = await Team.findOne({ teamID });
        if (team) {
          if (!team.isVerified) {
            team.isVerified = true;
          } else {
            team.isVerified = false;
          }
          await team.save();
          return team;
        } else {
          throw new Error("Team not found");
        }
      } catch (err) {
        throw new ApolloError(err, "400");
      }
    },

    deleteTeam: async (_, { teamID }) => {
      try {
        const team = await Team.findOne({ teamID });
        if (team) {
          await team.delete();
          const queries = await ClubQueries.find({ teamID });
          if (queries) {
            await ClubQueries.deleteMany({ teamID });
          }
          return "Team deleted successfully";
        } else {
          throw new Error("Team not found");
        }
      } catch (err) {
        throw new ApolloError(err, "400");
      }
    },
  },
};
