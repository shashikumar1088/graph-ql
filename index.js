import { ApolloServer } from '@apollo/server';
import axios from 'axios';
import { startStandaloneServer } from '@apollo/server/standalone';


// types
//1. Int
//2. Float
//3. String
//4.Boolean
//5. ID

////Enumeration types

1
const users = [
    {
        id: 1,
        name: "Rohit",
        username: "rohit",
        email: "rohit@dummyid.com",
        website: "",
    }
];

const typeDefs = `
type User {
    id:ID!
    name:String!
    username:String!
    email:String! 
    website:String
}
type Query{
    getUsers: [User]! 
    getUser(id:ID!): User 
}

input UserInput{
    name:String!
    username:String!
    email:String! 
    website:String!
}
type Mutation{
    addUser(name:String!, username:String!, email:String!, website:String!): User 
    createUser(userInput: UserInput): User 
}
`;

const resolvers = {
    Query: {
        getUsers: () => users,
        getUser: (parent, { id }) => {
            return users.find((user) => user.id == id);
        },
    },
    Mutation: {
        addUser: (parent, args) => {
            const user = {
                id: Math.random().toString(),
                name: args.name,
                username: args.username,
                email: args.email,
                website: args.website,
            }
            users.push(user);
            return user;
        },
        createUser: (parent, args) => {
            const user = {
                id: Math.random().toString(),
                name: args.userInput.name,
                username: args.userInput.username,
                email: args.userInput.email,
                website: args.userInput.website,
            };
            users.push(user);
            return user;
        }
    },
}


const server = new ApolloServer({
    typeDefs,
    resolvers,
});


await startStandaloneServer(server, {
    listen: { port: 4000 },
});



