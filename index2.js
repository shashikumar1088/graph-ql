import { ApolloServer } from '@apollo/server';
import axios from 'axios';
import { startStandaloneServer } from '@apollo/server/standalone';


const typeDefs = `#
type User {
    id:ID!
    name:String!
    username:String!
    email:String!
    phone:String!
    website:String!
}
type Todo {
    id:ID!
    title:String!
    completed:Boolean
    userId:ID!
    user:User
}
type Query{
    getTodos:[Todo]
    getAllUsers:[User]
    getUser(id:ID!):User
}
`;

const resolvers = {
    Todo: {
        user: async (todo) => (await axios.get(`https://jsonplaceholder.typicode.com/users/${todo.id}`)).data,
    },
    Query: {
        getTodos: async () => (await axios.get("https://jsonplaceholder.typicode.com/todos")).data,
        getAllUsers: async (obj, args, context, info) => {
            return (await axios.get("https://jsonplaceholder.typicode.com/users")).data
        },
        getUser: async (parent, { id }, context) => {
            return (await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)).data
        },
    }
}


const server = new ApolloServer({
    typeDefs,
    resolvers,
});


const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});



