import React, { useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import ResultsCard from '../ResultsCard';
import { conductivityArray, temperatureArray, turbidityArray } from './resultsHelperFunctions';

// Spinning loading circle whilst waiting for data from the twin
function CircularLoader() {
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    );
  }


export default function ResultsDiv({dataReady, setDataReady, displayData, setDisplayData}: any) {

  
  // Display data on suitable temperature, and suitable/preferred spawning temperatures 
  function display() {
    let suitTemp : null|boolean = displayData.data.runtime_monitoring[0].suitable_temperature
    let suitSpawningTemp : null|boolean = displayData.data.runtime_monitoring[0].suitable_spawning_temperature 
    let prefSpawningTemp : null|boolean = displayData.data.runtime_monitoring[0].preferred_spawning_temperature

    const suitTempInfo = [
      "No data availbale on suitable temperatures for the species in the chosen area", 
      "The temperature in the chosen area is suitable for the species", 
      "The temperature in the chosen area is not suitable for the species"
    ]

    const suitSpawningTempInfo = [
      "No data availbale on suitable spawning temperatures for the species in the chosen area",
      "The chosen area has a suitable spawning temperature for the species",
      "The chosen area does not have a suitable spawning temperature for the species"
    ]

    const prefSpawningTempInfo = [
      "No data availbale on preferred spawning temperatures for the species in the chosen area",
      "The chosen area has a spawning temperature that is preferred by the species",
      "The chosen area does not have a spawning temperature that is preferred by the species"
    ]


    return (
      <div>
        <div className=' flex flex-col xl:flex-row xl:gap-2 mt-6'>
        <ResultsCard title={"Suitable Temperature"} information={suitTempInfo} color={suitTemp} ></ResultsCard>
        <ResultsCard title={"Suitable Spawning Temperature"} information={suitSpawningTempInfo} color={suitSpawningTemp} ></ResultsCard>
        <ResultsCard title={"Preferred Spawning Temperature"} information={prefSpawningTempInfo} color={prefSpawningTemp} ></ResultsCard>
        </div>
        <div className='flex flex-row gap-8 m-2 p-2'> 
          <div className='flex flex-col gap-1 mb-2 mt-2'> 
            <p className=' font-semibold'> Last Recorded Data </p>
            <p> Conductivity: {displayData.data.simulations[displayData.data.simulations.length-1].conductivity.toFixed(3)} </p>
            <p> Turbidity: {displayData.data.simulations[displayData.data.simulations.length-1].turbidity.toFixed(3)} </p>
            <p> Temperature: {displayData.data.simulations[displayData.data.simulations.length-1].temperature.toFixed(3)} </p>
          </div>
          <div className='flex flex-col gap-1 mb-2 mt-2'> 
            <p className=' font-semibold'> 24 Hour Average </p>
            <p> Conductivity: {conductivityArray(displayData.data.simulations, 24).toFixed(3)} </p>
            <p> Turbidity: {turbidityArray(displayData.data.simulations, 24).toFixed(3)} </p>
            <p> Temperature: {temperatureArray(displayData.data.simulations, 24).toFixed(3)} </p>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className=' absolute inset-0 z-0 w-auto h-auto p-8 mt-24 mb-24 m-44 md:ml-64 md:mr-64 xl:ml-32 xl:mr-32 rounded-lg border border-slate-400 bg-slate-100 text-black'>
        <CloseIcon onClick={() => {setDataReady(false); setDisplayData(null)}} className='m-2 p-2 absolute top-4 right-4 sm:right-8 text-5xl text-slate-700 bg-slate-200 hover:bg-slate-300 hover:text-slate-900 rounded-3xl cursor-pointer'></CloseIcon>
        {displayData !== null ? (
            <div className='flex p-2 ml-2 mr-2 justify-left' >
              {display()}
            </div>              
        ): <div className='flex flex-col justify-center p-2 m-2' >
                <div className='place-self-center pt-8 p-2 m-4'>
                    <CircularLoader></CircularLoader>
                </div >
                <div className='place-self-center text-xl p-2 m-4'> Loading Results </div>
            </div> 
        }
        
    </div>  
  )
}

