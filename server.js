const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
require("dotenv").config();

const MONGODB = process.env.MONGODB;

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const port = process.env.PORT || 5000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

mongoose
  .connect(MONGODB, { useNewUrlParser: true })
  .then(() => {
    console.log("MongoDB Connected");
    return server.listen({ port });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  });
