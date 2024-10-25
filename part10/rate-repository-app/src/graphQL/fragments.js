import { gql } from "@apollo/client";

export const REPOSITORY_DETAILS = gql`
  fragment RepositoryDetails on Repository {
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
    createdAt
  }
`;
