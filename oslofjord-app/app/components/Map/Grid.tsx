import React  from 'react'
import { Marker, Popup, useMapEvents } from 'react-leaflet';
import MapRectangle from './MapRectangle';


//CURRENTLY NOT IN USE
// returns a grid of clickable squares that are to be placed as a layer on top of the leaflet-map

function Grid({ pos, setPos }: any) {

    // Format --> [[minLat, minLng],[maxLat, maxLng]]
    const exampleBounds = [[59.701165, 10.578201],[59.721165, 10.598201]]

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

    return (
        <div>
            <MapRectangle data={exampleBounds}/>
            <MapEventsHandler></MapEventsHandler>
        </div>
    
  )
}

export default Grid