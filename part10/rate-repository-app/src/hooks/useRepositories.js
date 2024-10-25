// import { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";

import { GET_REPOSITORIES } from "../graphQL/queries";

const useRepositories = ({ orderBy, orderDirection }) => {
  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    variables: { orderBy, orderDirection },
    fetchPolicy: "cache-and-network",
  });
  // const [repositories, setRepositories] = useState();
  // const [loading, setLoading] = useState(false);

  // const fetchRepositories = async () => {
  //   setLoading(true);
  //   const response = await fetch("http://192.168.0.11:5000/api/repositories");
  //   const json = await response.json();
  //   setLoading(false);
  //   setRepositories(json);
  // };

  // useEffect(() => {
  //   fetchRepositories();
  // }, []);
  const repositories = data ? data.repositories : [];
  if (error) {
    console.error("Error fetching repositories: ", error);
    return { repositories: [], loading, error };
  }

  return { repositories, loading };
};

export default useRepositories;
