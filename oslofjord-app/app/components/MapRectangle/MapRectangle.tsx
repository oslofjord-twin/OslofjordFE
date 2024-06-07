import { LatLngBoundsExpression } from 'leaflet'
import React from 'react'
import { Rectangle } from 'react-leaflet'

// Returns a single rectangle for the map, based on react-leaflet Rectangle. 
 
interface RectangleProps {
    coordinates: number [][];
    fillColor: string;
    color: string;

}

function MapRectangle(props: RectangleProps) {
    const boundaries : LatLngBoundsExpression = [[props.coordinates[0][1], props.coordinates[0][0]], [props.coordinates[1][1], props.coordinates[2][0]]]    
    return (
        <Rectangle 
            bounds={boundaries}
            pathOptions={ {fillColor: props.fillColor, fillOpacity: .2, color:props.color, opacity: .8}}
        />
    )
}

export default MapRectangle