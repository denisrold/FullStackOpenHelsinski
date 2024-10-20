// import { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";

import { GET_REVIEWS } from "../graphQL/queries";

const useReviews = (id) => {
  const { data, error, loading } = useQuery(GET_REVIEWS, {
    variables: { id: id },
    fetchPolicy: "cache-and-network",
  });

  const reviews = data ? data.repository.reviews : [];
  if (error) {
    console.error("Error fetching reviews: ", error);
    return { reviews: [], loading, error };
  }

  return { reviews, loading, error };
};

export default useReviews;
