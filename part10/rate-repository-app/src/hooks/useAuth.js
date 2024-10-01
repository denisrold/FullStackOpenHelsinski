import { useContext } from "react";
import AuthStorageContext from "../contexts/AuthStorageContext";

export const useAuth = () => {
  return useContext(AuthStorageContext);
};
