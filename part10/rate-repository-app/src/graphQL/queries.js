import { gql } from "apollo-boost";
import { REPOSITORY_DETAILS } from "./fragments";

export const GET_REPOSITORIES = gql`
  query GetRepositories(
    $searchKeyword: String
    $orderBy: AllRepositoriesOrderBy!
    $orderDirection: OrderDirection!
    $first: Int
    $after: String
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
      first: $first
      after: $after
    ) {
      edges {
        node {
          ...RepositoryDetails
        }
        cursor
      }
      pageInfo {
        hasNextPage
        endCursor
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

/*
query GetReviews($id: ID!, $first: Int, $after: String) {
    repository(id: $id) {
      id
      fullName
      reviews(first: $first, after: $after) {  // Añade los argumentos first y after
        totalCount  // Puedes incluir totalCount para saber cuántas reseñas hay en total
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
          cursor  // Incluye el cursor para paginación
        }
        pageInfo {  // Añade pageInfo para controlar la paginación
          endCursor  // El cursor del último elemento
          hasNextPage  // Indica si hay más reseñas disponibles
        }
      }
    }
  }
`;

*/

export const GET_REVIEWS = gql`
  query GetReviews($id: ID!, $first: Int, $after: String) {
    repository(id: $id) {
      id
      fullName
      reviews(first: $first, after: $after) {
        totalCount
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
          cursor
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
`;

export const GET_CURRENT_USER = gql`
  query getCurrentUser($includeReviews: Boolean = true) {
    me {
      id
      reviews @include(if: $includeReviews) {
        edges {
          node {
            id
            rating
            createdAt
            text
            user {
              username
            }
          }
          cursor
        }
        pageInfo {
          hasNextPage
          endCursor
        }
        totalCount
      }
    }
  }
`;
