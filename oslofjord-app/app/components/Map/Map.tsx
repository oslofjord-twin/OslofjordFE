"use client";
import React from 'react';
import { MapContainer, TileLayer, Popup, Marker, useMapEvents, Circle} from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import 'leaflet-defaulticon-compatibility';
import MapRectangle from '../MapRectangle/MapRectangle';
import { DocumentNode, useQuery} from '@apollo/client';
import { GET_INTERSECTION } from '@/app/api/gqlQueries';
import ResultsWindow from '../ResultsWindow';

//needs to be updated with correct types
interface MapProps {
    landerPos: {lat: number; lng: number;}; 
    clickedPos: {lat: number; lng: number;}; 
    setClickedPos : React.Dispatch<React.SetStateAction<{lat: number; lng: number;}>>;
    setGridID : React.Dispatch<React.SetStateAction<number>>;
    dataReady: boolean;
    setDataReady: React.Dispatch<React.SetStateAction<boolean>>;
    displayData: DocumentNode | null;
    setDisplayData: React.Dispatch<React.SetStateAction<DocumentNode>> | React.Dispatch<React.SetStateAction<null>>;
}

// geoData, clickedPos and setClickedPos are props from Dashboard.tsx
export default function Map(props : MapProps) {
    // grid border values to ensure that the clicked position is within the grid that contains data
    const grid_lng = [10.00, 11.00]
    const grid_lat = [59.00, 59.95]
    
    // Loads data from the API to make the grid rectangle using the GET_INTERSECTION query
    const { error, data } = useQuery(GET_INTERSECTION, {
        variables:  { point: { type: "Point", coordinates: [props.clickedPos.lng, props.clickedPos.lat] }},  //set which query to run here with variables
    })  

    if (error) {
        console.error(error);
    }
      
    // Handles any click on the map that is within the grid borders and returns a marker and a popup window when clicked
    function MapEventsHandler() {
        const map = useMapEvents({
        click: (loc) => {
            if (loc.latlng.lng > grid_lng[0] && loc.latlng.lng < grid_lng[1] && loc.latlng.lat > grid_lat[0] && loc.latlng.lat < grid_lat[1]) {
                props.setClickedPos(loc.latlng)
                props.setGridID(data.grid[0].id)
            }
            map.flyTo(loc.latlng, map.getZoom())
        },
        })
        
        return props.clickedPos === null ? null : (
            <Marker position={props.clickedPos}>
                <Popup>
                    <p className='font-light text-lg self-center'> Results will be based on data from the colored area. </p> 
                </Popup>
            </Marker>
        )
    }

    return (
        <div className='relative '>
        <MapContainer className='-z-0 mt-4 mx-auto w-2/3 xl:w-full items-center' center={[props.landerPos.lat, props.landerPos.lng]} zoom={11} maxZoom={18}
            minZoom={6} style={{ height: '500px', width: 'null'}}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Circle
                center={props.landerPos}
                pathOptions={{ fillColor: 'blue' , color: 'blue'}}
                radius={150}>
                <Popup>
                    <p className='font-light text-lg self-center'> Position of lander </p> 
                </Popup>
            </Circle>
            <MapEventsHandler></MapEventsHandler>
            {/* The rectangular area on the map that the coordinates fall within */}
            {data &&
                <MapRectangle coordinates={data.grid[0].geom.coordinates[0]}/>
            }
        </MapContainer>
        {/* Displays the result from the request */}
        {props.dataReady == true &&
            <ResultsWindow setDataReady={props.setDataReady} displayData={props.displayData} setDisplayData={props.setDisplayData}/>
        }
        </div>
    );
};


