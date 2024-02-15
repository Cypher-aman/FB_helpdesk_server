export const types = ` #graphql

input CreateUserInput {
    name: String!
    email: String!
    password: String!
}

type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    profilePicture: String
    accessToken: String
}

`;
