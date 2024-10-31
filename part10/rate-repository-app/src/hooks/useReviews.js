// import { useState, useEffect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_REVIEWS } from "../graphQL/queries";

const useReviews = (id, first = 3) => {
  const { data, error, loading, fetchMore, ...result } = useQuery(GET_REVIEWS, {
    variables: { id: id, first: first },
    fetchPolicy: "cache-and-network",
  });
  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) return;

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        id: id,
        first,
      },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prevResult;

        // Obtener los edges existentes y los nuevos edges
        const existingEdges = prevResult.repository.reviews.edges;
        const newEdges = fetchMoreResult.repository.reviews.edges;

        // Crear un conjunto de IDs existentes para evitar duplicados
        const existingIds = new Set(existingEdges.map((edge) => edge.node.id));

        // Filtrar los nuevos edges para evitar duplicados
        const filteredNewEdges = newEdges.filter(
          (edge) => !existingIds.has(edge.node.id)
        );

        return {
          repository: {
            ...prevResult.repository,
            reviews: {
              ...fetchMoreResult.repository.reviews,
              edges: [
                ...existingEdges,
                ...filteredNewEdges, // Solo agregar los nuevos edges que no están duplicados
              ],
            },
          },
        };
      },
    });
  };

  return {
    reviews: data?.repository.reviews.edges || [],
    fetchMore: handleFetchMore,
    loading,
    hasNextPage: data?.repository.reviews.pageInfo.hasNextPage,
    ...result,
  };
};

export default useReviews;
