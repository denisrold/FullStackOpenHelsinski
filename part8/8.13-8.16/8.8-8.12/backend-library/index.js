const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { v1: uuid } = require("uuid");

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const Book = require("./models/book.js");
const Author = require("./models/author.js");
const { GraphQLError } = require("graphql");
require("dotenv").config();
const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

let authors = [
  {
    name: "Robert Martin",
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: "Martin Fowler",
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963,
  },
  {
    name: "Fyodor Dostoevsky",
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821,
  },
  {
    name: "Joshua Kerievsky", // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: "Sandi Metz", // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
];

/*
 * Spanish:
 * Podría tener más sentido asociar un libro con su autor almacenando la id del autor en el contexto del libro en lugar del nombre del autor
 * Sin embargo, por simplicidad, almacenaremos el nombre del autor en conexión con el libro
 */

let books = [
  {
    title: "Clean Code",
    published: 2008,
    author: "Robert Martin",
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Agile software development",
    published: 2002,
    author: "Robert Martin",
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ["agile", "patterns", "design"],
  },
  {
    title: "Refactoring, edition 2",
    published: 2018,
    author: "Martin Fowler",
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"],
  },
  {
    title: "Refactoring to patterns",
    published: 2008,
    author: "Joshua Kerievsky",
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "patterns"],
  },
  {
    title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
    published: 2012,
    author: "Sandi Metz",
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "design"],
  },
  {
    title: "Crime and punishment",
    published: 1866,
    author: "Fyodor Dostoevsky",
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "crime"],
  },
  {
    title: "Demons",
    published: 1872,
    author: "Fyodor Dostoevsky",
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "revolution"],
  },
];

/*
  you can remove the placeholder query once your first one has been implemented 
*/
/*
 type Address {
    street: String!
    city: String!
  }

  type Person {
    name: String!
    phone: String
    address: Address!
    id: ID!
  }
*/
const typeDefs = `
  type Book {
    title: String!,
    published: Int!,
    author: Author!,
    id: ID!,
    genres: [String!]!
  }
    
  type Author{
    name: String!,
    id: ID!,
    born: Int
    bookCount:Int
    }

  type Mutation{
    addBook(
      title: String!,
      author: String!,
      published:Int!,
      genres: [String!]!
    ): Book

     editAuthor(name: String!, born: Int!): Author
  }

  type Query {
  allBooks(author: String, genre: String):[Book!]!
  allAuthors:[Author!]!
  bookCount:Int
  authorCount:Int
  }
`;

const resolvers = {
  Query: {
    allAuthors: async () => await Author.find({}),
    allBooks: async (root, args) => {
      if (args.genre && args.author) {
        const author = await Author.findOne({ name: args.author });
        if (!author) {
          return await Book.find({}).populate("author");
        }
        let genre =
          args.genre.charAt(0).toUpperCase() +
          args.genre.slice(1).toLowerCase();

        return await Book.find({
          author: author._id,
          genres: genre,
        }).populate("author");
      }
      if (args.author) {
        const author = await Author.findOne({ name: args.author });
        if (!author) {
          return await Book.find({}).populate("author");
        }

        return await Book.find({ author: author._id }).populate("author");
      }
      if (args.genre) {
        let genre =
          args.genre.charAt(0).toUpperCase() +
          args.genre.slice(1).toLowerCase();
        return await Book.find({ genres: genre }).populate("author");
      }

      return await Book.find({}).populate("author");
    },

    bookCount: async () => await Book.collection.countDocuments(),
    authorCount: async () => await Author.collection.countDocuments(),
  },
  //root apunta a Author
  Author: {
    bookCount: async (root) => {
      const author = await Author.findOne({ name: root.name });
      return (await Book.find({ author: author._id })).length;
    },
  },
  Mutation: {
    addBook: async (root, args) => {
      let authorExist = await Author.findOne({ name: args.author });
      if (!authorExist) {
        authorExist = await Author.create({ name: args.author });
      }
      const book = new Book({
        title: args.title,
        published: args.published,
        author: authorExist._id,
        genres: args.genres,
      });
      await book.save().catch((error) => {
        throw new GraphQLError("Creating the book failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
            error,
          },
        });
      });

      return book.populate("author");
    },
    editAuthor: async (root, args) => {
      try {
        let author = await Author.findOne({ name: args.name });
        if (!author) {
          throw new GraphQLError("Author not found", {
            extensions: {
              code: "NOT_FOUND",
              invalidArgs: args.name,
            },
          });
        }
        const updatedAutor = await Author.findByIdAndUpdate(
          author._id,
          { born: args.born },
          { new: true }
        );
        return updatedAutor;
      } catch (err) {
        throw new GraphQLError("Fail to update author", {
          extensions: {
            code: "INTERNAL_SERVER_ERROR",
            error: err.message,
          },
        });
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
