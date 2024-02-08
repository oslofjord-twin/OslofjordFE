"use client";
import React from "react";
import { useQuery } from "@apollo/client";
import { GET_INTERSECTION } from "./gqlQueries"

const apiCall = () => {
    const { loading, error, data } = useQuery(GET_INTERSECTION, { //set which query to run here with variables
      variables:  { point: { type: "Point", coordinates: [10.62, 59.65] }},
    });
  
    if (loading) {
      return <div>Loading...</div>;
    }
    if (error) {
      console.error(error);
      return <div>Error!</div>;
    }
    console.log(data);
    const coordinates = data.grid[0].geom.coordinates[0]
    const bounds = [[coordinates[0][1], coordinates[0][0]], [coordinates[1][1], coordinates[2][0]]]
    return (
      
        bounds
       // {/*<pre>{JSON.stringify(data, null, 2)}</pre>*/}

    );
  };
 
export default apiCall;