import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  HttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const createApolloClient = (authStorage) => {
  const httpLink = new HttpLink({
    uri: process.env.EXPO_PUBLIC_URI_GQL,
  });
  const authLink = setContext(async (_, { headers }) => {
    try {
      const accessToken = await authStorage.getAccessToken();
      return {
        headers: {
          ...headers,
          authorization: accessToken ? `Bearer ${accessToken}` : "",
        },
      };
    } catch (e) {
      console.error("Error retrieving access token:", e);
      return {
        headers: {
          ...headers,
        },
      };
    }
  });

  // Combine the links
  const link = ApolloLink.from([authLink, httpLink]);

  return new ApolloClient({
    link,
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
