import { gql } from "@apollo/client";

export const GET_INTERSECTION = gql`
  query Intersection($point: geometry!){
    grid(where: {geom: {_st_intersects: $point}}) {
      geom 
      id
    }
  }
`;

export const GET_SPECIES = gql`
  query Species{
    species {
      name
    }
  }
`;

export const GET_SIMULATION = gql`
query MyQuery ($grid_id: Int!, $request_id: Int!) {
  simulations(where: {grid_id: {_eq: $grid_id}}) {
    id_sim
    conductivity
    record_time
    temperature
    turbidity
  }
  runtime_monitoring(where: {request_id:{_eq: $request_id}}) {
    id_sim
    preferred_spawning_temperature
    suitable_spawning_temperature
    suitable_temperature
  }
}
`;

export const INSERT_REQUEST = gql`
  mutation InsertRequest ($species: String!, $grid_id: Int!){
    insert_requests_one(object: {species_name: $species, grid_id: $grid_id}) {
      request_id
    }
  }
  `;


export const DONE_SUBSCRIPTION = gql`
  subscription MySubscription {
  requests {
      request_id
      grid_id
      done
      species_name
    }
  }
`;

export const DONE_REQUEST = gql`
  query DoneRequest {
    requests {
      request_id
      species_name
      grid_id
      done
    }
  }
`;

