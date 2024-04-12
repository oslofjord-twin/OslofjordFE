import React from 'react'
import { conductivityArray, findAverage, temperatureArray, turbidityArray } from "@/app/utils/functions/resultsFunctions"
import { prefSpawningTempInfo, suitSpawningTempInfo, suitTempInfo } from "@/app/utils/staticData/resultsInfo"
import SpeciesResults from '../SpeciesResults'

interface ResultsDivProps {
    displayData : any
}

  // Display data on suitable temperature, and suitable/preferred spawning temperatures 
export default function ResultsDiv(props: ResultsDivProps) {

    // check that simulations and runtime_monitoring contain data
    const simulations = props.displayData.data.simulations !== undefined ? props.displayData.data.simulations : null
    const runtime_monitoring = props.displayData.data.runtime_monitoring !== undefined ? props.displayData.data.runtime_monitoring : null

    // find last recorded data from runtime_monitoring results
    const suitTemp : null|boolean = runtime_monitoring !== null && runtime_monitoring.length !== 0 ? runtime_monitoring[runtime_monitoring.length-1].suitable_temperature : null
    const suitSpawningTemp : null|boolean = runtime_monitoring !== null && runtime_monitoring.length !== 0 ? runtime_monitoring[runtime_monitoring.length-1].suitable_spawning_temperature : null
    const prefSpawningTemp : null|boolean = runtime_monitoring !== null && runtime_monitoring.length !== 0 ? runtime_monitoring[runtime_monitoring.length-1].preferred_spawning_temperature : null

    // make arrays containing results of conductivity, turbidity, and temperature results
    const conductivity : number[] | null = simulations !== null && simulations.length !== 0 ? (
        conductivityArray(simulations, 24) == null ? null 
        : conductivityArray(simulations,24)) : null

    const turbidity : number[] | null = simulations !== null && simulations.length !== 0 ? (
        turbidityArray(simulations, 24) == null ? null 
        : turbidityArray(simulations,24)) : null
    
    const temperature : number[] | null = simulations !== null && simulations.length !== 0 ? (
        temperatureArray(simulations, 24) == null ? null 
        : temperatureArray(simulations,24)) : null
  

    return (
      <div className='flex flex-col gap-4'>
        <div className=' flex flex-col xl:flex-row xl:gap-6 mt-2'>
        <SpeciesResults title={"Suitable Temperature"} information={suitTempInfo} color={suitTemp} simulations={simulations} runtime_monitoring={runtime_monitoring}></SpeciesResults>
        <SpeciesResults title={"Suitable Spawning Temperature"} information={suitSpawningTempInfo} color={suitSpawningTemp} simulations={simulations} runtime_monitoring={runtime_monitoring}></SpeciesResults>
        <SpeciesResults title={"Preferred Spawning Temperature"} information={prefSpawningTempInfo} color={prefSpawningTemp} simulations={simulations} runtime_monitoring={runtime_monitoring}></SpeciesResults>
        </div>  
        {/* Environmental data measurements/simulations */}
        <div className='flex flex-row gap-8 p-2'> 
          <div className='flex flex-col gap-1 mb-2 mt-2'> 
            <p className=' font-semibold'> Last Recorded Data </p> 
            {simulations.length < 1 && <p> No data available </p> } 
            {simulations.length >= 1 && (simulations[simulations.length-1].conductivity !== 'NaN' ? 
            <p> Conductivity: {simulations[simulations.length-1].conductivity.toFixed(2)} </p> 
            : <p> Conductivity: No data</p>)}
            {simulations.length >= 1 && (simulations[simulations.length-1].turbidity !== 'NaN' ? 
            <p> Turbidity: {simulations[simulations.length-1].turbidity.toFixed(2)} </p> 
            : <p> Turbidity: No data </p>)}
            {simulations.length >= 1 && (simulations[simulations.length-1].temperature !== 'NaN' ? 
            <p> Temperature: {simulations[simulations.length-1].temperature.toFixed(2)} </p> 
            : <p> Temperature: No data </p>)}   
          </div>
          <div className='flex flex-col gap-1 mb-2 mt-2'> 
            <p className=' font-semibold'> 24 Hour Average </p>
            {conductivity !== null ? <p> Conductivity: {findAverage(conductivity).toFixed(2)} </p> : <p> Conductivity: Not available </p>} 
            {turbidity !== null ? <p> Turbidity: {findAverage(turbidity).toFixed(2)} </p> : <p> Turbidity: Not available </p>}
            {temperature !== null ? <p> Temperature: {findAverage(temperature).toFixed(2)} </p> : <p> Temperature: Not available </p>} 
          </div>
        </div>
        <div className='flex flex-col xl:flex-row gap-2 p-4 place-self-start bg-white border border-gray-200 '>
            <div className='p-2 w-6 h-6 grow-0 shrink-0 bg-green-600 rounded-full'/>
            <p> Suitable/Preferred </p>
            <div className=' mt-4 xl:mt-0 xl:ml-4 p-2 w-6 h-6 grow-0 shrink-0 bg-orange-400 rounded-full'/>
            <p> Not Suitable/Preferred </p>
        </div> 
      </div>
    )
  }