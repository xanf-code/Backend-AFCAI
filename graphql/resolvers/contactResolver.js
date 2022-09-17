const Contact = require("../../models/contact");
const { customAlphabet } = require("nanoid");
const { ApolloError } = require("apollo-server-errors");

module.exports = {
  Query: {
    getContacts: async () => {
      try {
        const contacts = await Contact.find();
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
    createContact: async (_, { name, email, phone, message, subject }) => {
      const nanoid = customAlphabet(process.env.SALT, 4);
      const queryID = `CONTACT-${nanoid()}`;
      const newContact = new Contact({
        name,
        email,
        phone,
        queryID,
        subject,
        message,
      });
      try {
        const contact = await newContact.save();
        return contact;
      } catch (err) {
        throw new ApolloError(err);
      }
    },
  },
  deleteContact: async (_, { queryID }) => {
    try {
      const contact = await Contact.findOneAndDelete({ queryID });
      if (contact) {
        return "Contact deleted successfully";
      } else {
        throw new Error("Contact not found");
      }
    } catch (err) {
      throw new ApolloError(err);
    }
  },
};
