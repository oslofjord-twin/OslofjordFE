"use client";
import React from "react";
import { useQuery } from '@apollo/client';
import { GET_INTERSECTION } from "./gqlQueries"

// Currently not used
function apiCall ( lngLat) {
    const { loading, error, data } = useQuery(GET_INTERSECTION , { //set which query to run here with variables
      variables:  { point: { type: "Point", coordinates: lngLat }},
    });

    if (loading) {
      return <div>Loading...</div>;
    }
    if (error) {
      console.error(error);
      return <div>Error!</div>;
    }
    return (
        data
       // {/*<pre>{JSON.stringify(data, null, 2)}</pre>*/}
    );

  
};

export default apiCall; 
