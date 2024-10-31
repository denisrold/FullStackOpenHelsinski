// import { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_CURRENT_USER } from "../graphQL/queries";

const useMyReviews = () => {
  const { loading, error, data } = useQuery(GET_CURRENT_USER, {
    variables: { includeReviews: true },
    fetchPolicy: "cache-and-network",
  });

  const user = data ? data.me : [];
  const reviews = user.reviews
    ? user.reviews.edges.map((edge) => edge.node)
    : [];

  if (error) {
    console.error("Error fetching repositories: ", error);
    return { repository: [], loading, error };
  }
  return { loading, error, reviews };
};

export default useMyReviews;
