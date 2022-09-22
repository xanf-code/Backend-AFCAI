const { gql } = require("apollo-server");

const typeDefs = gql`
  type Contact {
    name: String!
    email: String!
    phone: String!
    queryID: String!
    subject: String!
    message: String!
    createdAt: String!
  }

  type FullTeamResponse {
    data: [Team]!
    docCount: Int!
  }

  type VerifiedFullTeamResponse {
    docs: [VerifiedTeam]!
    limit: Int
    totalPages: Int
    nextCursor: Int
    hasNextCursor: Boolean
    totalDocs: Int
    resCount: Int
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

  type VerifiedTeam {
    id: Int!
    teamName: String!
    teamID: String!
    description: String!
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
      field: String
      value: String
      lim_num: Int
      cursor: String
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
    getVerifiedTeams(
      lim_num: Int
      field: String
      value: String
      cursor: Int
    ): VerifiedFullTeamResponse!
    getContacts: [Contact]!
    getContact(queryID: String!): Contact
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

    createContact(
      name: String!
      email: String!
      phone: String!
      message: String!
      subject: String!
    ): Contact!

    deleteContact(queryID: String!): String!
  }
`;

module.exports = typeDefs;
