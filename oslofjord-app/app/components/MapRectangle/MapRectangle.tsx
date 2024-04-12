import React, {useState } from 'react'
import { Rectangle } from 'react-leaflet'

// Returns a single rectangle for the map, based on react-leaflet Rectangle. 
 
interface RectangleProps {
    coordinates: number [][]
}

function MapRectangle(props: RectangleProps) {
    const boundaries : any = [[props.coordinates[0][1], props.coordinates[0][0]], [props.coordinates[1][1], props.coordinates[2][0]]]    
    
    return (
        <Rectangle 
            bounds={boundaries}
            pathOptions={ {fillColor:'red', fillOpacity: .2, color:'orange', opacity: .8}}
        />
    )
}

export default MapRectangle