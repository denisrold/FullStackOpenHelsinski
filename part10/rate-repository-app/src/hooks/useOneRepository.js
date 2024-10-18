// import { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";

import { GET_ONE_REPOSITORY } from "../graphQL/queries";

const useOneRepositories = (id) => {
  const { data, error, loading } = useQuery(GET_ONE_REPOSITORY, {
    variables: { id: id },
    fetchPolicy: "cache-and-network",
  });

  const repository = data ? data.repository : [];
  if (error) {
    console.error("Error fetching repositories: ", error);
    return { repository: [], loading, error };
  }

  return { repository, loading };
};

export default useOneRepositories;
