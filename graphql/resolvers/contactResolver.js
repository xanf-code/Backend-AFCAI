const Contact = require("../../models/contact");
const Team = require("../../models/teams");
const { customAlphabet } = require("nanoid");
const { ApolloError } = require("apollo-server-errors");
const { SendCaseNumber } = require("../../lib/sendinblue/case");
const { closeCaseAlert } = require("../../lib/sendinblue/close_case");
const Verified = require("../../models/verified_teams");

module.exports = {
  Query: {
    getContacts: async (_, { value, lim_num }) => {
      try {
        const contacts = await Contact.find({
          queryID: {
            $regex: value,
            $options: "i",
          },
        })
          .sort("-createdAt")
          .limit(lim_num);
        return contacts;
      } catch (err) {
        throw new ApolloError(err);
      }
    },
    getContact: async (_, { queryID }) => {
      try {
        const contact = await Contact.findOne({ queryID });
        if (contact) {
          return contact;
        } else {
          throw new Error("Contact not found");
        }
      } catch (err) {
        throw new ApolloError(err);
      }
    },
  },
  Mutation: {
    createContact: async (
      _,
      { teamID, name, email, phone, message, subject }
    ) => {
      const nanoid = customAlphabet(process.env.SALT, 4);
      const queryID = `CONTACT-${nanoid()}`;
      const newContact = new Contact({
        teamID,
        name,
        email,
        phone,
        queryID,
        subject,
        message,
        createdAt: Math.round(new Date().getTime() / 1000),
      });
      try {
        if (teamID != "") {
          const teamExistQuery = await Verified.findOne({ teamID });
          if (teamExistQuery) {
            const contact = await newContact.save();
            await SendCaseNumber(contact.name, contact.email, contact.queryID);
            return contact;
          } else {
            throw new Error(
              "Invalid Team ID, please check again or register before raising a query"
            );
          }
        } else {
          const contact = await newContact.save();
          await SendCaseNumber(contact.name, contact.email, contact.queryID);
          return contact;
        }
      } catch (err) {
        throw new ApolloError(err);
      }
    },
    resolveContact: async (_, { queryID }) => {
      try {
        const contact = await Contact.findOne({ queryID });
        if (contact) {
          const deletedContact = await contact.delete();
          await closeCaseAlert(deletedContact.email, deletedContact.queryID);
          return contact;
        } else {
          throw new Error("Contact not found");
        }
      } catch (err) {
        throw new ApolloError(err);
      }
    },
  },
};
