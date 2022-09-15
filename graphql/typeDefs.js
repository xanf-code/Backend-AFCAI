const { gql } = require("apollo-server");

const typeDefs = gql`
  type FullTeamResponse {
    data: [Team]!
    docCount: Int!
  }

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
    isVerified: String!
    isVerifiedTime: String!
    teamAbrieviation: String!
    createdAt: String!
    teamLogo: String!
    association: String!
    email: String!
    phone: String!
    website: String!
    socials: Socials!
    personIncharge: String!
    personType: String!
    postalCode: String!
    postalAddress: String!
    teamType: String!
    state: String!
    district: String!
    teamReputation: String!
    disabledCatering: String!
    teamFounded: String!
    teamAssociationLink: String!
    crsAccess: String!
    seniorMensTeamStatus: String!
    seniorWomensTeamStatus: String!
    youthTeams: [String]!
    academyType: String!
    licensedCoaches: [String]!
    teamProfileSlug: String!
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
    getTeams(
      lim_num: Int
      offset: Int
      field: String
      value: String
      isVerifiedTime: Boolean
      onlyVerified: Boolean
    ): FullTeamResponse!
    getTeam(teamID: String!): Team
    getOneQuery(queryID: String!): ClubQueries
    getAllQueries(
      lim_num: Int
      sortOpen: Boolean
      field: String
      value: String
    ): ClubDataQuery
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
      email: String!
      phone: String!
      website: String!
      socials: SocialsInput!
      personIncharge: String!
      personType: String!
      postalCode: String!
      postalAddress: String!
      teamType: String!
      state: String!
      district: String!
      teamReputation: String!
      disabledCatering: String!
      teamFounded: String!
      teamAssociationLink: String!
      crsAccess: String!
      seniorMensTeamStatus: String!
      seniorWomensTeamStatus: String!
      youthTeams: [String]!
      academyType: String!
      licensedCoaches: [String]!
    ): Team!

    verifyTeam(teamID: String!): Team!
    deleteTeam(teamID: String!): String!

    createClubQuery(query: String!, teamID: String!): ClubQueries!
    closeClubQuery(queryID: String!): ClubQueries!
    deleteSingleQuery(queryID: String!): String!
  }
`;

module.exports = typeDefs;
