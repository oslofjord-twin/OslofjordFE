import React from 'react'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import SensorCardModal from '../SensorCardModal/SensorCardModal';

interface SensorProps {
    type: string;
    value: string;
    unit: string; 
    change: string;
}

function SensorInfoCard(props: SensorProps) {
  return (
    <div className='grid grid-rows-3 w-72 md:w-60 lg:w-72 h-36 bg-slate-100 text-slate-900 p-4 m-4 rounded-lg'>
      <h1 className=' text-start text-2xl font-normal hover:font-bold peer'> {props.type} </h1>
      <div className='invisible peer-hover:visible'> 
        <SensorCardModal type={props.type} text="Add some text"></SensorCardModal>
      </div>
      <div className='mt-4 row-start-2 grid grid-cols-3'>   
        <h1 className='text-start col-span-2 text-3xl font-semibold'> {props.value} {props.unit} </h1>
        <div className='flex flex-row place-content-end mt-1'> 
          <ArrowDropUpIcon fontSize="large"/>
          <h1 className='text-xl font-light'> {props.change}% </h1>
        </div>
      </div>
    </div>
  )
}

export default SensorInfoCard