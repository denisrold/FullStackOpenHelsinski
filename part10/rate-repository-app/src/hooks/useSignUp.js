import { useMutation } from "@apollo/client";
import { CREATE_USER } from "../graphQL/mutations";
import { useNavigate } from "react-router-native";
import { Alert } from "react-native";

const useSignUp = () => {
  const [mutate, result] = useMutation(CREATE_USER);
  const navigate = useNavigate();
  const signUp = async ({ username, password }) => {
    try {
      const response = await mutate({
        variables: {
          username: username,
          password: password,
        },
      });
      console.log(response);
      if (response) {
        Alert.alert("Registro exitoso", "Ahora puede loguearte", [
          {
            text: "OK",
            onPress: () => navigate("/login"),
          },
        ]);
        navigate("/login");
      }
      return response;
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };
  return [signUp, result];
};

export default useSignUp;
