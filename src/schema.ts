import { buildSchema } from 'graphql';

const schema = buildSchema(`
  type Fragrance {
    id: String!
    name: String!
    description: String!
    category: String!
    created_at: String!
    updated_at: String!
    image_url: String!
  }

  type Query {
    fragrances: [Fragrance]
    fragrance(id: String!): Fragrance
  }

  type Mutation {
    addFragrance(id: String!, name: String!, description: String!, category: String!, image_url: String!): Fragrance
    updateFragrance(id: String!, name: String, description: String, category: String, image_url: String): Fragrance
    deleteFragrance(id: String!): String
  }
`);

export default schema;
