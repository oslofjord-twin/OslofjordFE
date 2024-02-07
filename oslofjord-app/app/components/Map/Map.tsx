"use client";
import { useQuery } from "@apollo/client";
import { GET_INTERSECTION } from "../../api/gqlQueries"
import React from 'react';
import { MapContainer, TileLayer, Popup, FeatureGroup, Marker, useMapEvents } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import 'leaflet-defaulticon-compatibility';
import MapRectangle from './MapRectangle';

// ^ Compatibility to retrieve leaflet icons https://github.com/ghybs/leaflet-defaulticon-compatibility

// Geodata, pos and setPos from Dashboard.tsx
export default function Map({ geoData, pos, setPos }: any) {
    const exampleBounds = [[59.701165, 10.578201],[59.721165, 10.598201]]

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

    // Handles click on the map and returns a marker and a popup window when clicked
    function MapEventsHandler()  {
        const map = useMapEvents({
        click: (loc) => {
            setPos(loc.latlng)
            setTimeout(() => { 
                map.flyTo(loc.latlng, map.getZoom())
            }, 100);
            console.log(loc.latlng)
        },
        })
        return pos === null ? null : (
            <Marker position={pos}>
                <Popup>
                    <h1 className='font-semibold'> Graph of sensor data last 24hrs </h1> <br/>
                    {/* Insert a graph here */}
                </Popup>
            </Marker>
       
        )
    }

    return (
        <MapContainer className=' -z-0 mt-4 place-self-center' center={[geoData.lat, geoData.lng]} zoom={11} maxZoom={18}
            minZoom={6} style={{ height: "500px", width: "1200px"}}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapEventsHandler></MapEventsHandler>
            <MapRectangle pos={pos} setPos={setPos} bounds={exampleBounds}/>
        </MapContainer>
    );
};



