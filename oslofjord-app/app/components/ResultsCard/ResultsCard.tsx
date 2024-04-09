import React from 'react'
import Box from '@mui/material/Box';

interface ResultsCardProps {
    title: string;
    information: string[];
    color: null|boolean; 
}

export default function ResultsCard(props: ResultsCardProps) {
  return (
    <div>
    {props.color == null ? <div className='flex flex-row gap-4 m-2 p-2 peer'> <div className='w-6 h-6 grow-0 shrink-0 bg-gray-500 rounded-full' /> <p className=' font-semibold'> {props.title} </p> </div>:
    (props.color == true? <div className='flex flex-row gap-4 m-2 p-2 peer'> <div className=' w-6 h-6 grow-0 shrink-0 bg-green-500 rounded-full' /> <p className=' font-semibold '> {props.title} </p> </div> : 
    <div className='flex flex-row gap-4 m-2 p-2 peer'> <div className=' w-6 h-6 grow-0 shrink-0 bg-orange-500 rounded-full' /> <p className=' font-semibold'> {props.title} </p> </div>)}
    <div
      className='invisible peer-hover:visible' >
      <Box className=" absolute w-96 h-fit p-4 border rounded-md bg-blue-800 border-slate-200 overflow-hidden justify-center">
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
