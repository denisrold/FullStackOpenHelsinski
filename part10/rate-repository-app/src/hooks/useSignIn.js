import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../graphQL/mutations";
import AuthStorageContext from "../contexts/AuthStorageContext";
import { useContext } from "react";
import { useNavigate } from "react-router-native";
import createApolloClient from "../utils/apolloClient";

const useSignIn = () => {
  const [mutate, { data, error, loading }] = useMutation(LOGIN_USER);
  const apolloClient = createApolloClient();
  const authStorage = useContext(AuthStorageContext);
  const navigate = useNavigate();
  const login = async ({ username, password }) => {
    try {
      const response = await mutate({
        variables: {
          username: username,
          password: password,
        },
      });
      const token = response.data.authenticate.accessToken;
      if (token) {
        await authStorage.setAccessToken(token);
        await apolloClient.resetStore();
        navigate("/");
      }
      return response;
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  };
  return [login, { data, error, loading }];
};

export default useSignIn;
