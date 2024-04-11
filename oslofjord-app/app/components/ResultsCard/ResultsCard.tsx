import React, { useState } from 'react'
import Box from '@mui/material/Box';
import ResultsChart from '../ResultsChart';


interface ResultsCardProps {
    title: string;
    information: string[];
    color: null|boolean; 
    simulations : any;
    runtime_monitoring: any; 
    //variable : string;
}

export default function ResultsCard(props: ResultsCardProps) {
  // when clicked, the graph from ResultsChart.tsx will be displayed in a new window
  const [showGraph, setShowGraph] = useState(false)

  return (
    <div>
    {props.color == null ? <div className='flex flex-col p-2 peer'>  <p className=' font-semibold'> {props.title} </p> No data available </div> 
    :
    <button onClick={() => setShowGraph(true)}  className='flex flex-row gap-2 p-2 peer'> 
      { props.color == true ? <div className=' w-6 h-6 grow-0 shrink-0 bg-green-600 rounded-full' /> : <div className=' w-6 h-6 grow-0 shrink-0 bg-orange-400 rounded-full' /> } 
      <p className=' font-semibold '> {props.title} </p> 
    </button> 
    }
    {showGraph == true && 
        <ResultsChart simulations={props.simulations} runtime_monitoring={props.runtime_monitoring} title={props.title} setShowGraph={setShowGraph}/>
    }
    <div className='invisible peer-hover:visible' >
      <Box className=" absolute w-fit h-fit p-4 border rounded-md bg-blue-800 border-slate-200 overflow-hidden justify-center">
        <p className='text-white'>
          {props.color == null? props.information[0] : (
            props.color == true ? props.information[1] : 
            props.information[2]
          )}
        </p>
      </Box>
    </div>
    </div>
  )
}
