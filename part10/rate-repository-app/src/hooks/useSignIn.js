import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../graphQL/mutations";

const useSignIn = () => {
  const [mutate, result] = useMutation(CREATE_USER);

  const signIn = async ({ username, password }) => {
    try {
      const response = mutate({
        variables: {
          username: username,
          password: password,
        },
      });
      return response;
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };
  return [signIn, result];
};

export default useSignIn;
