import React, { useState } from 'react'
import GridRectangle from './GridRectangle';
import { Popup, useMapEvents } from 'react-leaflet';

// returns a grid of clickable squares that are to be placed as a layer on top of the leaflet-map

function Grid({ pos, setPos }: any) {
    // To retrieve the bounds of the clicked rectangle object 
    const [currentBounds, setCurrentBounds] = useState([[59.619587,59.769106],[10.511458, 10.7114]])
    
    // minimum and maximum latitude and longitude values to create the grid
    const minLatitude = 59.619587;
    const minLongitude = 10.511458;  
    const maxLatitude = 59.769106;
    const maxLongitude = minLongitude + 2*(maxLatitude - minLatitude); 

    function MapEventsHandler()  {
        
        const map = useMapEvents({
        click: (loc) => {
            if ( loc.latlng.lat > minLatitude && loc.latlng.lat < maxLatitude 
                && loc.latlng.lng > minLongitude && loc.latlng.lng < maxLongitude) {
                setPos(loc.latlng)
                setTimeout(() => { 
                    map.flyTo(loc.latlng, map.getZoom())
                }, 100);
            }     
        },
        })
        console.log('current bounds for rectangle:', currentBounds)
        return pos === null ? null : (
            <Popup>
                <h1 className='font-semibold'> Graph of sensor data last 24hrs </h1> <br/>
                {/* Insert a graph here */}
             </Popup>
        )
    }

    // Creates values for the bounds of rectangles and puts it in a list. 
    function CalculateSquares() {

        let listOfBounds : any = new Array()  
  
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

    return (
        <div>
            {CalculateSquares().map((cellBounds: any, index: React.Key | null | undefined) => 
                <GridRectangle key={index} bounds={cellBounds} pos={pos} setPos={setPos} setCurrentBounds={setCurrentBounds}/>)}
            <MapEventsHandler></MapEventsHandler>
        </div>
    
  )
}

export default Grid