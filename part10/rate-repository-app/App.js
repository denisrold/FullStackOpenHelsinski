import { NativeRouter } from "react-router-native";
import Main from "./src/components/Main";
import { ApolloProvider } from "@apollo/react-hooks";
import createApolloClient from "./src/utils/apolloClient";

const apolloClient = createApolloClient();
export default function App() {
  return (
    <NativeRouter>
      <ApolloProvider client={apolloClient}>
        <Main />
      </ApolloProvider>
    </NativeRouter>
  );
}
