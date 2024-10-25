import { gql } from "apollo-boost";
import { REPOSITORY_DETAILS } from "./fragments";

export const GET_REPOSITORIES = gql`
  query GetRepositories(
    $orderBy: AllRepositoriesOrderBy!
    $orderDirection: OrderDirection!
  ) {
    repositories(orderBy: $orderBy, orderDirection: $orderDirection) {
      edges {
        node {
          ...RepositoryDetails
        }
        cursor
      }
      totalCount
    }
  }
  ${REPOSITORY_DETAILS}
`;

export const LOGUED_USER = gql`
  query {
    me {
      id
      username
    }
  }
`;
export const GET_ONE_REPOSITORY = gql`
  query GetRepository($id: ID!) {
    repository(id: $id) {
      url
      ...RepositoryDetails
    }
  }
  ${REPOSITORY_DETAILS}
`;

export const GET_REVIEWS = gql`
  query GetReviews($id: ID!) {
    repository(id: $id) {
      id
      fullName
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`;
