const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID!
    user: String
    email: String!
    password: String!
    bookCount: Int
    savedBooks: [Book]
  }
  type Book {
    authors: [String]
    description: String
    bookId: ID!
    image: String!
    link: String!
    title: String!
  }
  type Auth {
    token: ID!
    user: User
  }
  type Query { 
    user: [User]
    getSingleUser(_id: String): User 
    books: [Book]
    book(bookId: ID!): Book
  }
  type Mutation {
    createUser(user: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(bookId: ID!): User
    deleteBook(bookId: ID!): User
  }
`;

module.exports = typeDefs;

