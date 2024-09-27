import { gql } from "apollo-boost";

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          id
          ownerName
          ownerAvatarUrl
          forksCount
          stargazersCount
          reviewCount
          ratingAverage
          language
          description
          name
          fullName
        }
        cursor
      }
      totalCount
    }
  }
`;
