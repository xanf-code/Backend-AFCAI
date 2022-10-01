const Team = require("../../models/teams");
const ClubQueries = require("../../models/queries");
const { ApolloError } = require("apollo-server");
const { customAlphabet } = require("nanoid");
const { sendWelcomeEmail } = require("../../lib/sendinblue/welcome");
const { sendVerificationTeam } = require("../../lib/sendinblue/verification");
const { AddAssociation } = require("../../lib/utils/association_utils");
const { AddState } = require("../../lib/utils/state_utils");
const slugify = require("slugify");
const { getCount, verifiedCount } = require("../../services/countDocs");
const migrateDBV = require("../../services/migrateVerified");
const Verified = require("../../models/verified_teams");

module.exports = {
  Query: {
    getTeams: async (_, { lim_num, field, value }) => {
      const count = getCount(Team);
      // await Verified.counterReset("id", function (err) {
      //   console.log("done");
      // });
      try {
        const teams = await Team.find({
          [field]: {
            $regex: value,
            $options: "i",
          },
        })
          .where("isVerified")
          .equals("false")
          .sort("-createdAt")
          .limit(lim_num);
        return { data: teams, docCount: count };
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
    getVerifiedTeams: async (_, { lim_num, field, value, cursor }) => {
      const count = await verifiedCount(Verified, value, field, cursor);
      try {
        const verified_teams = await Verified.find({
          [field]: {
            $regex: value,
            $options: "i",
          },
        })
          .sort("-isVerifiedTime")
          // .sort("id")
          // .where("id")
          // .gt(cursor || -1)
          .limit(lim_num);
        return {
          docs: verified_teams,
          limit: lim_num,
          resCount: count,
          totalDocs: await Verified.countDocuments(),
        };
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
      const year = new Date().getFullYear();
      const month = (new Date().getMonth() + 1).toString().padStart(2, "0");
      const nanoid = customAlphabet(process.env.SALT, 4);
      const teamShort = teamName
        .split(/\s/)
        .reduce((response, word) => (response += word.slice(0, 1)), "");
      const teamID = `${year}-${month}-${teamShort}-${nanoid()}`;
      const teamSlug = slugify(teamName, {
        lower: true,
      });

      const newTeam = new Team({
        teamName,
        teamAbrieviation: teamShort.toUpperCase(),
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
        teamProfileSlug: `${teamSlug}-${teamShort.toLowerCase()}`,
        createdAt: Math.round(new Date().getTime() / 1000),
        isVerifiedTime: Math.round(new Date().getTime() / 1000),
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
        const verifiedDB = await Verified.findOne({ teamID });

        if (team) {
          if (team.isVerified == "false") {
            team.isVerified = "true";
            team.isVerifiedTime = Date.now();
            migrateDBV(team);
            await sendVerificationTeam(teamID, team.teamName, team.email);
            await team.delete();
          }
          return "Team Verified and migrated to verified teams";
        } else if (verifiedDB) {
          await verifiedDB.delete();
          return "Team Un-Verified and removed";
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

    updateTeam: async (
      _,
      {
        teamID,
        teamName,
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
        academyType,
      }
    ) => {
      try {
        await Verified.findOneAndUpdate(
          { teamID },
          {
            teamName,
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
            academyType,
          }
        );
        return `Team with ${teamID} updated successfully`;
      } catch (err) {
        throw new ApolloError(err, "400");
      }
    },
  },
};
