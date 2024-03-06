"use client";
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Popup, Marker, useMapEvents, CircleMarker, Circle } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import 'leaflet-defaulticon-compatibility';
import MapRectangle from './MapRectangle';
import { useQuery} from '@apollo/client';
import { GET_INTERSECTION } from '@/app/api/gqlQueries';


//export const bounds : any = makeVar([])
// ^ Compatibility to retrieve leaflet icons https://github.com/ghybs/leaflet-defaulticon-compatibility

// geoData, clickedPos and setClickedPos are props from Dashboard.tsx
export default function Map({ geoData, clickedPos, setClickedPos }: any) {
    // grid border values to ensure that the clicked position is within the grid that contains data
    const grid_lng = [10.00, 11.00]
    const grid_lat = [59.00, 59.95]
    const landerPosition = { lat: 59.658233, lng: 10.624583}

    // Loads data from the API to make the grid rectangle using the GET_INTERSECTION query
    const { loading, error, data } = useQuery(GET_INTERSECTION, {
        variables:  { point: { type: "Point", coordinates: [clickedPos.lng, clickedPos.lat] }},  //set which query to run here with variables
    })
    if (error) {
    console.error(error);
    }

    // CURRENTLY NOT IN USE
    // Creates values for the bounds of rectangles and puts it in a list.
    function CalculateSquares() {

        let listOfBounds : any = new Array()

        // minimum and maximum latitude and longitude values to create the grid
        const minLatitude = 59.619587;
        const minLongitude = 10.511458;  
        const maxLatitude = 59.769106;
        const maxLongitude = minLongitude + 2*(maxLatitude - minLatitude);   
  
        const numColumns = 10;
        const numRows = 10;
        const squareWidth = maxLongitude - minLongitude
        const squareHeight = maxLatitude - minLatitude;
    
        const incrementLng  = squareWidth  / numColumns;
        const incrementLat = squareHeight / numRows;
        let column = 0;
        let currentLng = minLongitude;
        let currentLat = minLatitude;

        while (column < numColumns) {
            let row = 0;
            currentLat = minLatitude;
            while (row < numRows) {
                const squareBounds = [[currentLat, currentLng], [currentLat + incrementLat, currentLng + incrementLng]];
                listOfBounds.push(squareBounds);
                currentLat += incrementLat; 
                row += 1;
            }
            currentLng += incrementLng;
            column += 1;
        }
        return (
            listOfBounds
        )
    }

      
    // Handles any click on the map that is within the grid borders and returns a marker and a popup window when clicked
    function MapEventsHandler() {
        const map = useMapEvents({
        click: (loc) => {
            if (loc.latlng.lng > grid_lng[0] && loc.latlng.lng < grid_lng[1] && loc.latlng.lat > grid_lat[0] && loc.latlng.lat < grid_lat[1]) {
                setClickedPos(loc.latlng)
            }
            map.flyTo(loc.latlng, map.getZoom())
            console.log('current location: ', loc.latlng)
        },
        })
        
        return clickedPos === null ? null : (
            <Marker position={clickedPos}>
                <Popup>
                    <h1 className='font-semibold'> Graph of sensor data last 24hrs </h1> <br/>
                    {/* Insert a graph here */}
                </Popup>
            </Marker>
        )
    }

    return (
        <MapContainer className='-z-0 mt-4 mx-auto w-2/3 xl:w-full items-center' center={[geoData.lat, geoData.lng]} zoom={11} maxZoom={18}
            minZoom={6} style={{ height: '500px', width: 'null'}}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Circle
                center={landerPosition}
                pathOptions={{ fillColor: 'blue' , color: 'blue'}}
                radius={150}>
                <Popup>
                    <h1 className='font-semibold'> Position of lander </h1> <br/>
                    {/* Insert a graph here */}
                </Popup>
            </Circle>
            <MapEventsHandler></MapEventsHandler>
            {data &&
                <MapRectangle data={data}/>
            }
        </MapContainer>
    );
};


