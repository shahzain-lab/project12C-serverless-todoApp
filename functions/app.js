const {ApolloServer, gql} = require("apollo-server-lambda");

const typeDefs = gql`
 type Query{
     todos: Todo[]!
 }
 type Todo{
     ID: String!
     text: String!
     done: Boolean!
 }

 type Mutation{
     addTodo: (text: String!) => Todo
     updateTodo: (id: ID!) => Todo
 }
`;

let todos = {}
let index = 0
const resolvers = {
    Query:{
        todos: ()=> {
            return Object.values(todos)
        }
    },
    Mutation: {
        addTodo: (_,{text}) => {
            index++;
            const id = `key-${index}`
            todos[id] = {id, text, done: false}
            return todos[id]
        },
        updateTodo: (_, {id}) => {
            todos[id].done = true
            return todos[id]}
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: true,
    introspection: true
})

exports.handler = server.createHandler()