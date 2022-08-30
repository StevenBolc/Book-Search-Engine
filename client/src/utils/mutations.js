import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        user
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser($user: String!, $email: String!, $password: String!) {
    createUser(user: $user, email: $email, password: $password) {
      token
      user {
        _id
        user
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($bookId: String!) {
    saveBook(bookID: $bookId) {
      _id
      authors
      description
      bookId
      image
      link
      title
      }
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation deleteBook($bookId: String!) {
    deleteBook(bookID: $bookId) {
      _id
      authors
      description
      bookId
      image
      link
      title
      }
    }
  }
`;