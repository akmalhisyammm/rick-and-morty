import { gql } from '@apollo/client';

export const GET_CHARACTERS = gql`
  query GetCharacters($page: Int, $filter: FilterCharacter) {
    characters(page: $page, filter: $filter) {
      info {
        count
        pages
        next
        prev
      }
      results {
        id
        name
        status
        species
        type
        gender
        # origin
        # location
        image
        # episode
        created
      }
    }
  }
`;

export const GET_CHARACTER = gql`
  query GetCharacter($id: ID!) {
    character(id: $id) {
      id
      name
      status
      species
      type
      gender
      origin {
        id
        name
        type
        dimension
        # residents
        created
      }
      location {
        id
        name
        type
        dimension
        # residents
        created
      }
      image
      episode {
        id
        name
        air_date
        episode
        # characters
        created
      }
      created
    }
  }
`;

export const GET_CHARACTERS_BY_IDS = gql`
  query GetCharactersByIds($ids: [ID!]!) {
    charactersByIds(ids: $ids) {
      id
      name
      status
      species
      type
      gender
      origin {
        id
        name
        type
        dimension
        # residents
        created
      }
      location {
        id
        name
        type
        dimension
        # residents
        created
      }
      image
      episode {
        id
        name
        air_date
        episode
        # characters
        created
      }
      created
    }
  }
`;
