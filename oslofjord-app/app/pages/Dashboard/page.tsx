'use client';
import React, { useEffect, useState } from "react";
import SensorInfoCard from "@/app/components/SensorInfoCard";
import dynamic from "next/dynamic"
import Dropdown from "@/app/components/Dropdown";
import { ApolloProvider } from '@apollo/client';
import client from "@/app/api/apolloClient";
import InfoIcon from '@mui/icons-material/Info';
// Next.js combined with leaflet can be problematic, so we need to have dynamic loading
// solution --> https://stackoverflow.com/questions/74289687/leaflet-implementation-on-next-js-13

const FjordMap = dynamic(() => import("@/app/components/Map/index"), { 
    ssr: false,
})

// Dashboard website wrapped in ApolloProvider to interact with the API
const Dashboard = () => {
    // Position of lander: default position to center the map
    const landerPosition = { lat: 59.658233, lng: 10.624583}
    // clicked on map by user
    const [clickedPos, setClickedPos] = useState( landerPosition )
    // written by user in input box
    const [writtenPosition, setWrittenPosition] = useState( landerPosition )
    // species chosen from dropdown menu
    const [chosenSpecies, setChosenSpecies] = useState({item: 'Search for species ...'}) // , id: 0})
    // which tab to display
    //const [tabOne, setTabOne] = useState(true)

    console.log('chosen species is', chosenSpecies)

    return (
        <ApolloProvider client={client()}>
        <div className="grid grid-flow-row mt-12 mb-28 w-screen place-content-center">
            <p className=" text-slate-100 font-semibold text-2xl md:text-3xl place-self-center pt-4 mt-4"> Dashboard </p> 
            <div className=" pb-12 mb-12">
                <div className=" block relative pb-4 mt-12 mb-8 w-full">
                {/*tabOne && */}
                    <div className="grid grid-cols-4 gap-4 m-4 place-content-center">
                    <Dropdown setChosenSpecies={setChosenSpecies}/>
                    {/* 
                    <input type="text" placeholder={clickedPos.lat.toPrecision(8).toString() + ", " + clickedPos.lng.toPrecision(8).toString()} 
                        className='static h-16 col-start-3 col-span-1 w-fit bg-slate-100 p-4 place-self-start placeholder-gray-500 focus:placeholder-opacity-20'>
                    </input>
                    */}
                    <button onClick={() => setClickedPos({ lat: 59.73020, lng: 10.20303 })} 
                        className="col-start-4 col-span-1 place-self-start w-24 rounded bg-slate-100 p-4 "> Go </button>
                    </div>
                
                {/*!tabOne &&*/    }          
                </div>
                <FjordMap geoData={landerPosition} clickedPos={clickedPos} setClickedPos={setClickedPos}></FjordMap>
                <div className=" mt-8 p-4 bg-blue-200 w-5/6 h-16 rounded-md self-center flex flex-row">
                    <InfoIcon className=" text-slate-700 ml-4 mr-4 self-center" fontSize="medium"></InfoIcon>
                    <p className="self-center"> 
                        Choose a species and the position on the map that you would like informaion on. 
                        When you are ready, click the button to get information on the species in the chosen area.
                    </p>
                </div>
            </div>
            <p className=" text-slate-100 font-semibold text-2xl md:text-3xl place-self-center pb-4 mb-8"> Real-time Data from the Drøbak Lander</p>
            <div className="grid grid-rows-1 md:grid-cols-3 mb-12 place-items-center"> 
                <SensorInfoCard type="Temperature" unit="°C" value="7.5" change="1.6"/>
                <SensorInfoCard type="Salinity" unit="ppt" value="18" change="0.8"/>
                <SensorInfoCard type="Turbidity" unit="FTU" value="4.5" change="1.4"/>
            </div>            
            {/* 
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
            */}
            
        
            {/*<button className=" p-4 mt-4 mb-4 rounded border-slate-300 bg-slate-100 hover:bg-blue-400 w-fit h-fit"> Show results</button>*/}

            </div>
            </ApolloProvider>


    )
}

export default Dashboard;