import { gql } from "apollo-boost";

export const CREATE_USER = gql`
  mutation CreateUser($username: String!, $password: String!) {
    createUser(user: { username: $username, password: $password }) {
      id
      username
    }
  }
`;

export const LOGIN_USER = gql`
  mutation UserLogin($username: String!, $password: String!) {
    authenticate(credentials: { username: $username, password: $password }) {
      accessToken
    }
  }
`;
