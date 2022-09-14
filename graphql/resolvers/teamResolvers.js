const Team = require("../../models/teams");
const ClubQueries = require("../../models/queries");
const { ApolloError } = require("apollo-server");
const { customAlphabet } = require("nanoid");
const { sendWelcomeEmail } = require("../../lib/sendinblue/welcome");
const { sendVerificationTeam } = require("../../lib/sendinblue/verification");
const { AddAssociation } = require("../../lib/utils/association_utils");
const { AddState } = require("../../lib/utils/state_utils");
const slugify = require("slugify");

module.exports = {
  Query: {
    getTeams: async (_, { lim_num, field, value, isVerifiedTime }) => {
      try {
        const teams = await Team.find({
          [field]: { $regex: value, $options: "i" },
        })
          .sort(`${isVerifiedTime ? "-isVerifiedTime" : "isVerified"}`)
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
        email,
        phone,
        website,
        socials,
        personIncharge,
        personType,
        postalCode,
        postalAddress,
        teamType,
        state,
        district,
        teamReputation,
        disabledCatering,
        teamFounded,
        teamAssociationLink,
        crsAccess,
        seniorMensTeamStatus,
        seniorWomensTeamStatus,
        youthTeams,
        academyType,
        licensedCoaches,
      }
    ) => {
      const nanoid = customAlphabet(process.env.SALT, 4);
      const teamID = `${teamAbrieviation}-${nanoid()}`;
      const teamSlug = slugify(teamName, {
        lower: true,
      });
      const newTeam = new Team({
        teamName,
        teamAbrieviation,
        teamID,
        description,
        teamLogo,
        association,
        email,
        phone,
        website,
        socials,
        personIncharge,
        personType,
        postalCode,
        postalAddress,
        teamType,
        state,
        district,
        teamReputation,
        disabledCatering,
        teamFounded,
        teamAssociationLink,
        crsAccess,
        seniorMensTeamStatus,
        seniorWomensTeamStatus,
        youthTeams,
        academyType,
        licensedCoaches,
        teamProfileSlug: `${teamSlug}-${teamAbrieviation.toLowerCase()}`,
      });

      try {
        const team = await newTeam.save();
        await sendWelcomeEmail(teamName, email);
        AddAssociation(association);
        AddState(state);
        return team;
      } catch (err) {
        throw new ApolloError(
          "Name Already Exists, please register with a different name",
          "400"
        );
      }
    },

    verifyTeam: async (_, { teamID }) => {
      try {
        const team = await Team.findOne({ teamID });
        if (team) {
          if (team.isVerified == "false") {
            team.isVerified = "true";
            team.isVerifiedTime = Date.now();
          } else {
            team.isVerified = "false";
          }
          await team.save();
          await sendVerificationTeam(teamID, team.teamName, team.email);
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
