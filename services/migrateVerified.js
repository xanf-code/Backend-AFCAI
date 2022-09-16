const Verified = require("../models/verified_teams");

async function migrateDBV(team) {
  const migrateTeam = new Verified({
    teamName: team.teamName,
    teamAbrieviation: team.teamAbrieviation,
    teamID: team.teamID,
    description: team.description,
    teamLogo: team.teamLogo,
    association: team.association,
    email: team.email,
    phone: team.phone,
    website: team.website,
    socials: team.socials,
    personIncharge: team.personIncharge,
    personType: team.personType,
    postalCode: team.postalCode,
    postalAddress: team.postalAddress,
    teamType: team.teamType,
    state: team.state,
    district: team.district,
    teamReputation: team.teamReputation,
    disabledCatering: team.disabledCatering,
    teamFounded: team.teamFounded,
    teamAssociationLink: team.teamAssociationLink,
    crsAccess: team.crsAccess,
    seniorMensTeamStatus: team.seniorMensTeamStatus,
    seniorWomensTeamStatus: team.seniorWomensTeamStatus,
    youthTeams: team.youthTeams,
    academyType: team.academyType,
    licensedCoaches: team.licensedCoaches,
    teamProfileSlug: team.teamProfileSlug,
    createdAt: team.createdAt,
    isVerifiedTime: team.isVerifiedTime,
  });
  await migrateTeam.save();
}

module.exports = migrateDBV;
