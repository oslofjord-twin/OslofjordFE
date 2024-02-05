'use client';
import React, { useState } from "react";
import SensorInfoCard from "@/app/components/SensorInfoCard";
import dynamic from "next/dynamic"
import Dropdown from "@/app/components/Dropdown";

// Next.js combined with leaflet can be problematic, so we need to have dynamic loading
// solution --> https://stackoverflow.com/questions/74289687/leaflet-implementation-on-next-js-13

const FjordMap = dynamic(() => import("@/app/components/Map/index"), { 
    ssr: false,
})

const Dashboard = () => {
    // Position of lander: default position to center the map
    const landerPosition = { lat: 59.658233, lng: 10.624583}
    // clicked on map by user
    const [clickedPosition, setClickedPosition] = useState( landerPosition )
    // written by user in input box
    const [writtenPosition, setWrittenPosition] = useState( landerPosition )
    // species chosen from dropdown menu
    const [chosenSpecies, setChosenSpecies] = useState({item: '', id: 0})
    // which tab to display
    const [tabOne, setTabOne] = useState(true)

    return (
        <div className="grid grid-flow-row mt-24 mb-28 w-screen place-content-center">
            <p className=" text-slate-100 font-semibold text-2xl md:text-3xl place-self-center pb-4 mb-8"> Real-time Data</p>
            <div className="grid grid-rows-1 md:grid-cols-3 mb-12 place-items-center"> 
                <SensorInfoCard type="Temperature" unit="°C" value="7.5" change="1.6"/>
                <SensorInfoCard type="Salinity" unit="ppt" value="18" change="0.8"/>
                <SensorInfoCard type="Turbidity" unit="FTU" value="4.5" change="1.4"/>
            </div>
            <p className=" text-slate-100 font-semibold text-2xl md:text-3xl place-self-center pt-4 mt-4"> Predictions </p>
            
            <div className="mt-8 place-self-center">
                <ul className="flex flex-wrap text-lg font-medium text-center" id="default-tab" data-tabs-toggle="#default-tab-content" role="tablist">
                    <li>
                        <button onClick={() => setTabOne(true)} className={`inline-block w-80 p-4 mr-4 border-b-2 ${tabOne ? 'border-orange-400 text-slate-200' : 'border-slate-200  text-slate-200/50'}`} 
                        id="profile-tab" data-tabs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false"> Marine Conditions </button>
                    </li>
                    <li>
                        <button onClick={() => setTabOne(false)} className={`inline-block w-80 p-4 ml-4 border-b-2 ${!tabOne?'border-orange-400 text-slate-200' : 'border-slate-200  text-slate-200/50'}`} 
                        id="dashboard-tab" data-tabs-target="#dashboard" type="button" role="tab" aria-controls="dashboard" aria-selected="false"> Environmental Measurements </button>
                    </li>
                    
                </ul>
            </div>
            
            <div className=" block relative mt-12 mb-8 w-full">
        
                {tabOne && 
                    <div className="grid grid-cols-4 gap-4 m-4 place-content-center">
                    <Dropdown setChosenSpecies={setChosenSpecies}/>
                    <p className='static h-16 rounded-md  border border-slate-600 col-start-2 col-span-1 w-52 bg-slate-100 p-4 ml-12 place-self-start'> Chosen species is {chosenSpecies.item} with id: {chosenSpecies.id} </p>
                    <input type="text" placeholder={clickedPosition.lat.toPrecision(8).toString() + ", " + clickedPosition.lng.toPrecision(8).toString()} 
                        className='static h-16 col-start-3 col-span-1 w-fit bg-slate-100 p-4 place-self-start placeholder-gray-500 focus:placeholder-opacity-20'>
                    </input>
                    <button onClick={() => setClickedPosition({ lat: 59.73020, lng: 10.20303 })} 
                        className="col-start-4 col-span-1 place-self-start w-24 rounded bg-slate-100 p-4 "> Enter </button>
                    </div>
                }
                {!tabOne &&
                <p className="text-xl text-slate-100"> Place functionality surrounding temp, salinity etc. here  </p>
                }  
        
            </div>
            <FjordMap geoData={landerPosition} pos={clickedPosition} setPos={setClickedPosition}></FjordMap>
        
            {/*<button className=" p-4 mt-4 mb-4 rounded border-slate-300 bg-slate-100 hover:bg-blue-400 w-fit h-fit"> Show results</button>*/}

            </div>


    )
}

export default Dashboard;