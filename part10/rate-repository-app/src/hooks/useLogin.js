import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../graphQL/mutations";

const useLogin = () => {
  const [mutate, { data, error, loading }] = useMutation(LOGIN_USER);

  const login = async ({ username, password }) => {
    try {
      console.log("username", username);
      console.log("password", password);
      const response = await mutate({
        variables: {
          username: username,
          password: password,
        },
      });
      return response;
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  };
  return [login, { data, error, loading }];
};

export default useLogin;
