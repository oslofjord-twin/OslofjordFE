import React, { useState } from 'react'
import Box from '@mui/material/Box';
import ResultsChart from '../ResultsChart';

interface SpeciesResultProps {
    title: string;
    information: string[];
    color: null|boolean; 
    simulations : any;
    runtime_monitoring: any; 
}

// Returns results from the runtime monitoring on the species in the chosen area
export default function SpeciesResults(props: SpeciesResultProps) {

  // keeps track on button click - if true the graph from ResultsChart.tsx will be displayed in a new window
  const [showGraph, setShowGraph] = useState<boolean>(false)

  return (
    <div>
    {/* Display for either null, green or orange */}
    {props.color == null ? <div className='flex flex-col gap-2 p-2 peer'>  <p className=' font-semibold'> {props.title} </p> Not available </div> 
    :
    <button onClick={() => setShowGraph(true)}  className='flex flex-row gap-2 p-2 peer shadow-md border border-gray-200 hover:bg-white hover:border-gray-300 rounded-lg'> 
      { props.color == true ? <div className=' w-6 h-6 grow-0 shrink-0 bg-green-600 rounded-full' /> : <div className=' w-6 h-6 grow-0 shrink-0 bg-orange-400 rounded-full' /> } 
      <p className=' font-semibold '> {props.title} </p> 
    </button> 
    }
    {showGraph == true && 
        <ResultsChart simulations={props.simulations} runtime_monitoring={props.runtime_monitoring} title={props.title} setShowGraph={setShowGraph}/>
    }
    {/* Modal that is visible when hovered to display information about either null results, green or orange values */}
    <div className='invisible peer-hover:visible mt-4' >
      <Box className=" absolute w-fit h-fit p-4 border rounded-md bg-blue-800 border-slate-200 overflow-hidden justify-center">
        <p className='text-white pb-2'>
          {props.color == null? props.information[0] : (
            props.color == true ? props.information[1] : 
            props.information[2]
          )}
          .
        </p>
        {props.color !== null && <p className='text-white'> Click to view 24 hour results if available. </p> }
      </Box>
    </div>
    </div>
  )
}
