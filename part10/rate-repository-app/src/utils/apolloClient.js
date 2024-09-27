import { ApolloClient, InMemoryCache } from "@apollo/client";

const createApolloClient = () => {
  return new ApolloClient({
    uri: process.env.EXPO_PUBLIC_URI_GQL,
    cache: new InMemoryCache(), // Necesario para el manejo del cache
  });
};

export default createApolloClient;
