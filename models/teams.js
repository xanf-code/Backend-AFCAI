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
    unique: true,
    dropDups: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
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
});

module.exports = mongoose.model("Team", teamSchema);
