import { useQuery } from "@apollo/react-hooks";
import { LOGUED_USER } from "../graphQL/queries";

const useLoggedUser = () => {
  const { data, refetch } = useQuery(LOGUED_USER, {
    fetchPolicy: "cache-and-network",
  });
  return { data, refetch };
};

export default useLoggedUser;
