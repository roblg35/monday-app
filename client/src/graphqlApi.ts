import { gql } from '@apollo/client';

// Query to get all fragrances
export const GET_ALL_FRAGRANCES = gql`
  query GetAllFragrances {
    fragrances {
      id
      name
      description
      category
      created_at
      updated_at
      image_url
    }
  }
`;

// Mutation to add a fragrance
export const ADD_FRAGRANCE = gql`
  mutation AddFragrance($id: String!, $name: String!, $description: String!, $category: String!, $image_url: String!) {
    addFragrance(id: $id, name: $name, description: $description, category: $category, image_url: $image_url) {
      id
      name
      description
      category
      created_at
      updated_at
      image_url
    }
  }
`;

// Mutation to update a fragrance
export const UPDATE_FRAGRANCE = gql`
  mutation UpdateFragrance($id: String!, $name: String!, $description: String!, $category: String!, $image_url: String!) {
    updateFragrance(id: $id, name: $name, description: $description, category: $category, image_url: $image_url) {
      id
      name
      description
      category
      updated_at
      image_url
    }
  }
`;

// Mutation to delete a fragrance
export const DELETE_FRAGRANCE = gql`
  mutation DeleteFragrance($id: String!) {
    deleteFragrance(id: $id)
  }
`;
