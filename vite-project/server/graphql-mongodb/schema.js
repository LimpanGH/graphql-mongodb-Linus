// schema.js
const { GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLInt, GraphQLList, GraphQLID } = require('graphql');
const { Book } = require('./models');

// Define the Book type
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        author: { type: GraphQLString },
        publishedYear: { type: GraphQLInt }
    })
});

// Define the Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Book.findById(args.id);
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve() {
                return Book.find({});
            }
        }
    }
});

// Define the Mutation
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addBook: {
            type: BookType,
            args: {
                title: { type: GraphQLString },
                author: { type: GraphQLString },
                publishedYear: { type: GraphQLInt }
            },
            resolve(parent, args) {
                const book = new Book({
                    title: args.title,
                    author: args.author,
                    publishedYear: args.publishedYear
                });
                return book.save();
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});