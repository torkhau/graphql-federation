import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { readFileSync } from 'fs';
import { gql } from 'graphql-tag';
import path from 'path';
import { fileURLToPath } from 'url';
import { books } from './mockBooks.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const schemaPath = `${__dirname}/schemaBook.graphql`;
const typeDefSchema = readFileSync(schemaPath, 'utf-8');

const typeDefs = gql`
  ${typeDefSchema}
`;

const resolvers = {
  Query: {
    books: () => [...books],
    book: (_: any, { isbn }: { isbn: string }) => books.find((book) => book.isbn === isbn),
  },
  Book: {
    __resolveReference: (book: { isbn: string }) => books.find((b) => b.isbn === book.isbn),
  },
};

const server = new ApolloServer({ schema: buildSubgraphSchema({ typeDefs, resolvers }) });

const { url } = await startStandaloneServer(server, { listen: { port: 4001 } });

console.log(`🚀 Subgraph server ready at ${url}`);
