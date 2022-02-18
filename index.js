import { ApolloServer, gql } from "apollo-server"

const persons = [
    {
        name: 'John',
        phone: '555-555-334',
        street: 'calle 122',
        city: 'New York',
        id: '212132s13212asdsad0'
    },
    {
        name: 'jamie',
        phone: '555-555-114',
        street: 'calle 122 as31',
        city: 'Miami',
        id: '212sadsd21sd5s'
    },
    {
        name: 'Jaime',
        street: 'avenida 121',
        city: 'Los angeles',
        id: '2121322153sdad51d0'
    }
]

const typeDefinitions = gql`
    type Address {
        city: String!
        street: String!
    }

    type Person {
        name: String!
        phone: String
        address: Address!
        id: ID!
    }

    type Query{
        personCount: Int!
        allPersons: [Person]!
        findPerson(name: String!): Person
    }
`

const resolvers = {
    Query: {
        personCount: () => persons.length,
        allPersons: () => persons,
        findPerson: (root, args) => {
            const {name} = args
            return persons.find(person => person.name === name)
        }
    },
    /* Person: {
        address: (root) =>  `${root.street}, ${root.city}`
    } */
    Person: {
        address: (root) => {
            return {
                street: root.street,
                city: root.city
            }
        }
    }
}

const server = new ApolloServer({
    typeDefs: typeDefinitions,
    resolvers
})

server.listen().then(({url}) => {
    console.log(`Server ready at ${url}`)
});