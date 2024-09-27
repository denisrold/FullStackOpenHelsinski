import { ApolloClient, InMemoryCache } from "@apollo/client";

const createApolloClient = (authStorage) => {
  return new ApolloClient({
    request: async (operation) => {
      try {
        const accessToken = await authStorage.getAccessToken();
        operation.setContext({
          headers: {
            authorization: accessToken ? `Bearer ${accessToken}` : "",
          },
        });
      } catch (e) {
        console.error("Error retrieving access token:", e);
      }
    },
    uri: process.env.EXPO_PUBLIC_URI_GQL,
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
