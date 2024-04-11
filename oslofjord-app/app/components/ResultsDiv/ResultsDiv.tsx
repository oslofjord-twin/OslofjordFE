import React, { useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';
import ResultsCard from '../ResultsCard';
import { conductivityArray, findAverage, temperatureArray, turbidityArray } from './resultsHelperFunctions';
import AspectRatioOutlinedIcon from '@mui/icons-material/AspectRatioOutlined';

// Spinning loading circle whilst waiting for data from the twin
function CircularLoader() {
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    );
  }


export default function ResultsDiv({dataReady, setDataReady, displayData, setDisplayData}: any) {

  const [shrinkWindow, setShrinkWindow] = useState(false)

  let simulations = displayData !== null ? displayData.data.simulations : null
  let runtime_monitoring = displayData !== null ? displayData.data.runtime_monitoring : null

  let conductivity : number[] | null = displayData !== null ? (
    conductivityArray(displayData.data.simulations, 24) == null ? null 
    : conductivityArray(displayData.data.simulations,24)) : null

  let turbidity = displayData !== null ? (
    turbidityArray(displayData.data.simulations, 24) == null ? null 
    : turbidityArray(displayData.data.simulations,24)) : null
  
  let temperature = displayData !== null ? (
    temperatureArray(displayData.data.simulations, 24) == null ? null 
    : temperatureArray(displayData.data.simulations,24)) : null
  

  // Display data on suitable temperature, and suitable/preferred spawning temperatures 
  function display() {
    let suitTemp : null|boolean = runtime_monitoring[0].suitable_temperature
    let suitSpawningTemp : null|boolean = runtime_monitoring[0].suitable_spawning_temperature 
    let prefSpawningTemp : null|boolean = runtime_monitoring[0].preferred_spawning_temperature

    const suitTempInfo = [
      "Unfortunately there is no data availbale for the species in the chosen area", 
      "The last recorded temperature in the chosen area is suitable for the species", 
      "The last recorded temperature in the chosen area is not suitable for the species"
    ]

    const suitSpawningTempInfo = [
      "Unfortunately there is no data availbale for the species in the chosen area", 
      "The last recorded temperature in the chosen area is a suitable spawning temperature for the species",
      "The last recorded temperature in the chosen area is not a suitable spawning temperature for the species"
    ]

    const prefSpawningTempInfo = [
      "Unfortunately there is no data availbale for the species in the chosen area", 
      "The last recorded temperature in the chosen area is a spawning temperature that is preferred by the species",
      "The last recorded temperature in the chosen area is a spawning temperature that is preferred by the species"
    ]


    return (
      <div className='flex flex-col gap-4'>
        <div className=' flex flex-col xl:flex-row xl:gap-6 mt-2'>
        <ResultsCard title={"Suitable Temperature"} information={suitTempInfo} color={suitTemp} simulations={simulations} runtime_monitoring={runtime_monitoring}></ResultsCard>
        <ResultsCard title={"Suitable Spawning Temperature"} information={suitSpawningTempInfo} color={suitSpawningTemp} simulations={simulations} runtime_monitoring={runtime_monitoring}></ResultsCard>
        <ResultsCard title={"Preferred Spawning Temperature"} information={prefSpawningTempInfo} color={prefSpawningTemp} simulations={simulations} runtime_monitoring={runtime_monitoring}></ResultsCard>
        </div>
        {temperature !== null &&
        <div className=" ml-2 p-2 pr-4 bg-blue-200 w-fit h-fit rounded-md flex flex-row">
          <InfoIcon className=" text-slate-700 ml-2 mr-2 self-center" fontSize="small"></InfoIcon>
          <p> Click on the titles above to view 24 hour results if available </p>
        </div>
        }
        
        <div className='flex flex-row gap-8 p-2'> 
          <div className='flex flex-col gap-1 mb-2 mt-2'> 
            <p className=' font-semibold'> Last Recorded Data </p> 
            {simulations.length < 1 && <p> No data available </p> } 
            {simulations.length >= 1 && (simulations[simulations.length-1].conductivity !== 'NaN' ? 
            <p> Conductivity: {simulations[simulations.length-1].conductivity.toFixed(2)} </p> 
            : <p> No data on conductivity </p>)}
            {simulations.length >= 1 && (simulations[simulations.length-1].turbidity !== 'NaN' ? 
            <p> Turbidity: {simulations[simulations.length-1].turbidity.toFixed(2)} </p> 
            : <p>No data on turbidity </p>)}
            {simulations.length >= 1 && (simulations[simulations.length-1].temperature !== 'NaN' ? 
            <p> Temperature: {simulations[simulations.length-1].temperature.toFixed(2)} </p> 
            : <p> No data on temperature </p>)}   
          </div>
        
          <div className='flex flex-col gap-1 mb-2 mt-2'> 
            <p className=' font-semibold'> 24 Hour Average </p>
            <div> Conductivity: {conductivity !== null ? findAverage(conductivity).toFixed(2) : <p> No conductivity values </p>} </div>
            <div> Turbidity: {turbidity !== null ? findAverage(turbidity).toFixed(2) : <p> No turbidity values </p>} </div>
            <div> Temperature: {temperature !== null ? findAverage(temperature).toFixed(2) : <p> No temperature values </p>} </div>
          </div>
          
        </div>
      </div>
    )
  }
  
  return (
    <div>
    {shrinkWindow == false && 
    <div className=' absolute inset-0 z-0 w-2/3 mx-auto xl:w-auto h-fit xl:mx-10 my-auto p-8 rounded-lg border border-slate-400 bg-slate-100 text-black'>
        <CloseIcon onClick={() => {setDataReady(false); setDisplayData(null)}} className='m-2 p-2 absolute top-4 right-4 sm:right-8 text-5xl text-slate-700 bg-slate-200 hover:bg-slate-300 hover:text-slate-900 rounded-3xl cursor-pointer'></CloseIcon>
        {displayData !== null ? (
            <div className='flex p-2 ml-2 mr-2 justify-left' >
              {display()}
              <button className=' flex flex-row gap-4 w-fit h-fit mb-2 lg:ml-32 rounded-lg justify-end self-end' onClick={() => setShrinkWindow(true)}> 
                <p> Show Map </p>
                <AspectRatioOutlinedIcon fontSize='medium' ></AspectRatioOutlinedIcon>
              </button>     
            </div>
        ): <div className='flex flex-col justify-center p-2 m-2' >
                <div className='place-self-center pt-8 p-2 m-4'>
                    <CircularLoader></CircularLoader>
                </div >
                <div className='place-self-center text-xl p-2 m-4'> Loading Results </div>
            </div> 
        }
        
    </div>  
    }
    {shrinkWindow == true && 
    <div className=' absolute inset-0 z-0 w-fit h-fit p-8 mt-96 mx-auto rounded-lg border border-slate-400 bg-slate-100 text-black'>
      <button className=' flex flex-row gap-4 w-36 h-6 rounded-lg self-center' onClick={() => setShrinkWindow(false)}> 
        <p> Show Results </p>
        <AspectRatioOutlinedIcon fontSize='medium' ></AspectRatioOutlinedIcon>
      </button>      
    </div>
    }
    </div>
  )
}

