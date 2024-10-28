import { useQuery } from "@apollo/react-hooks";

import { GET_REPOSITORIES } from "../graphQL/queries";

const useRepositories = ({ orderBy, orderDirection, searchKeyword, first }) => {
  const { data, error, loading, fetchMore, ...result } = useQuery(
    GET_REPOSITORIES,
    {
      variables: { orderBy, orderDirection, searchKeyword, first },
      fetchPolicy: "cache-and-network",
    }
  );

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;
    if (!canFetchMore) return;

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        orderBy,
        orderDirection,
        searchKeyword,
        first,
      },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prevResult;
        return {
          repositories: {
            ...fetchMoreResult.repositories,
            edges: [
              ...prevResult.repositories.edges,
              ...fetchMoreResult.repositories.edges,
            ],
          },
        };
      },
    });
  };

  const repositories = data ? data.repositories : [];

  if (error) {
    console.error("Error fetching repositories: ", error);
  }

  return {
    repositories,
    fetchMore: handleFetchMore,
    loading,
    error,
    hasNextPage: data?.repositories.pageInfo.hasNextPage,
    ...result,
  };
};

export default useRepositories;
