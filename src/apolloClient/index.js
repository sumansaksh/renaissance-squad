import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://demo-experience-api.masaischool.com/graphql", // Replace with your GraphQL endpoint
  cache: new InMemoryCache(),
});

export default client;
