import { gql } from "@apollo/client";

// Add position 
export const GET_SALINITY_TIME_FRAME = gql`
    query Salinity($date_from: timestamptz!, $date_to: timestamptz!) {
      salinity(where: {record_time: {_gte: ,$date_from _lte: $date_to}}) {
        record_time
        temperature
        conductivity
      }
    }
  `;

export const GET_SALINITY = gql`
  query Salinity {
    salinity(limit: 10) {
      record_time
      temperature
      conductivity
      location
    }
  }
`;

export const GET_TURBDITY = gql`
  query Turbidity {
    turbidity(limit: 10) {
      record_time
      temperature
      turbidity
      location
    }
  }
`;

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
  query Simulations($_eq: Int!){
    simulations(where: {grid_id: {_eq: $_eq}}, order_by: {id_sim: desc}, limit: 1) {
      temperature
      turbidity
      conductivity
      record_time
    }
  }
`;