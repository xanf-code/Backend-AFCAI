const { gql } = require("apollo-server");

const typeDefs = gql`
  input SocialsInput {
    facebook: String!
    twitter: String!
    instagram: String!
    youtube: String!
    linkedin: String!
  }

  type Socials {
    facebook: String!
    twitter: String!
    instagram: String!
    youtube: String!
    linkedin: String!
  }

  type Team {
    teamName: String!
    teamID: String!
    description: String!
    isVerified: Boolean!
    teamAbrieviation: String!
    createdAt: String!
    teamLogo: String!
    association: String!
    based: String!
    email: String!
    phone: String!
    website: String!
    socials: Socials!
  }

  type ClubQueries {
    queryID: String!
    teamID: String!
    query: String!
    queryOpen: Boolean!
    createdAt: String!
  }

  type ClubDataQuery {
    queryCount: Int!
    openQueryCount: Int!
    closedQueryCount: Int!
    data: [ClubQueries]!
  }

  type Query {
    getTeams(lim_num: Int): [Team]
    getTeam(teamID: String!): Team
    getOneQuery(queryID: String!): ClubQueries
    getAllQueries(lim_num: Int, sortOpen: Boolean): ClubDataQuery
    getTeamQuery(
      lim_num: Int
      teamID: String!
      sortOpen: Boolean
    ): [ClubQueries]
  }

  type Mutation {
    registerTeam(
      teamName: String!
      description: String!
      teamLogo: String!
      teamAbrieviation: String!
      association: String!
      based: String!
      email: String!
      phone: String!
      website: String!
      socials: SocialsInput!
    ): Team!

    verifyTeam(teamID: String!): Team!
    deleteTeam(teamID: String!): String!

    createClubQuery(query: String!, teamID: String!): ClubQueries!
    closeClubQuery(queryID: String!): ClubQueries!
    deleteSingleQuery(queryID: String!): String!
  }
`;

module.exports = typeDefs;
