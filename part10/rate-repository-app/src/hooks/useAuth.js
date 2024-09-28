import { useContext } from "react";
import AuthStorageContext from "../contexts/AuthStorageContext";

// Custom hook para usar el contexto de autenticación
export const useAuth = () => {
  return useContext(AuthStorageContext);
};
