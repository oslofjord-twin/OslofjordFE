import React, {useState } from 'react'
import { Rectangle } from 'react-leaflet'

interface RectangleProps {
    bounds: any
    setPos: any
    pos: any
}

// Single rectangle for grid on the map, based on react-leaflet Rectangle. 
// The returned rectangle is clickable and changes color when hovered. 

function MapRectangle(props: RectangleProps) {
    const[isHovered, setIsHovered] = useState(false)
    const[isClicked, setIsClicked] = useState(false)

  return (
    <Rectangle 
        //takes latitude and longitude of position to center, and the size to create the square
        bounds={props.bounds}
        pathOptions={ isHovered? {fillColor: 'red', fillOpacity: .4, color:'red', opacity: .4} : {fillColor:'red', fillOpacity: .2, color:'red', opacity: .4}}
        eventHandlers={{
            click: () => {
                console.log("corners: minLat", props.bounds[0][0], " minLng ", props.bounds[0][1], " maxLat", props.bounds[1][0], " maxLng", props.bounds[1][1])
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