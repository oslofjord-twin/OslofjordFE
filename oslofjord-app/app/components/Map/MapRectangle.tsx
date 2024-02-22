import React, {useState } from 'react'
import { Rectangle } from 'react-leaflet'

// Single rectangle for grid on the map, based on react-leaflet Rectangle. 
// The returned rectangle is clickable and changes color when hovered. 

interface RectangleProps {
    data: any
}

function MapRectangle(props: RectangleProps) {
    const[isHovered, setIsHovered] = useState(false)
    const[isClicked, setIsClicked] = useState(false)
    const coordinates : any = props.data.grid[0].geom.coordinates[0] 
    const boundaries : any = [[coordinates[0][1], coordinates[0][0]], [coordinates[1][1], coordinates[2][0]]]    
    
    return (
        <Rectangle 
            bounds={boundaries}
            pathOptions={ isHovered? {fillColor: 'red', fillOpacity: .4, color:'red', opacity: .4} : {fillColor:'red', fillOpacity: .2, color:'red', opacity: .4}}
            eventHandlers={{
                click: () => {
                    console.log("Rectangle boundaries: minLat", boundaries[0][0], " minLng ", boundaries[0][1], " maxLat", boundaries[1][0], " maxLng", boundaries[1][1])
                    setIsClicked(!isClicked)
                },
                mouseover: () => {
                setIsHovered(true)
                },
                mouseout: () => {
                setIsHovered(false)
                }
            }} className={` visible invisible:${isClicked == true}`}>
        </Rectangle> 
    )
}

export default MapRectangle