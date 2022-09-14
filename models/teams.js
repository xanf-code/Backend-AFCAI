const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  teamName: {
    type: String,
    required: true,
    unique: true,
    dropDups: true,
  },
  teamAbrieviation: {
    type: String,
    required: true,
  },
  isVerified: {
    type: String,
    default: "false",
  },
  isVerifiedTime: {
    type: Date,
    default: new Date().toISOString(),
  },
  teamID: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "No description provided",
  },
  createdAt: {
    type: String,
    default: new Date().toISOString(),
  },
  teamLogo: {
    type: String,
    default: "https://i.imgur.com/1Q9Z4Z0.png",
  },
  association: {
    type: String,
    default: "No association provided",
  },
  email: {
    type: String,
    default: "No email provided",
  },
  phone: {
    type: String,
    default: "No phone number provided",
  },
  website: {
    type: String,
    default: "No website provided",
  },
  socials: {
    facebook: {
      type: String,
      default: "No facebook link provided",
    },
    twitter: {
      type: String,
      default: "No twitter link provided",
    },
    instagram: {
      type: String,
      default: "No instagram link provided",
    },
    youtube: {
      type: String,
      default: "No youtube link provided",
    },
    linkedin: {
      type: String,
      default: "No linkedin link provided",
    },
  },
  personIncharge: {
    type: String,
    default: "No person in charge provided",
  },
  personType: {
    type: String,
    default: "No person type provided",
  },
  postalAddress: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
  },
  teamType: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  teamReputation: {
    type: String,
    required: true,
  },
  disabledCatering: {
    type: String,
    default: "NA",
  },
  teamFounded: {
    type: String,
    required: true,
  },
  teamAssociationLink: {
    type: String,
    required: true,
  },
  crsAccess: {
    type: String,
    required: true,
  },
  seniorMensTeamStatus: {
    type: String,
    required: true,
  },
  seniorWomensTeamStatus: {
    type: String,
    required: true,
  },
  youthTeams: {
    type: [String],
  },
  academyType: {
    type: String,
    required: true,
  },
  licensedCoaches: {
    type: [String],
  },
  teamProfileSlug: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("Team", teamSchema);
