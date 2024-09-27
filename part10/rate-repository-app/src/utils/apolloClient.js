import { ApolloClient, InMemoryCache } from "@apollo/client";

const createApolloClient = () => {
  return new ApolloClient({
    uri: "http://192.168.0.11:4000/graphql",
    cache: new InMemoryCache(), // Necesario para el manejo del cache
  });
};

export default createApolloClient;
