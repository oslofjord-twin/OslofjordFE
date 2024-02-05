import React, { useState } from 'react';
import { MapContainer, TileLayer, FeatureGroup } from "react-leaflet";
import Grid from './Grid';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import 'leaflet-defaulticon-compatibility';
// ^ Compatibility to retrieve leaflet icons https://github.com/ghybs/leaflet-defaulticon-compatibility

// Geodata, pos and setPos from Dashboard.tsx
export default function Map({ geoData, pos, setPos }: any) {

    return (
        <MapContainer className=' -z-0 mt-4 place-self-center' center={[geoData.lat, geoData.lng]} zoom={11} maxZoom={18}
            minZoom={6} style={{ height: "500px", width: "1200px"}}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <FeatureGroup>
                   <Grid pos={pos} setPos={setPos} ></Grid>
            </FeatureGroup>
        </MapContainer>
    );
};



