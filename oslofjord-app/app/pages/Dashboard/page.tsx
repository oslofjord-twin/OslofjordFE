'use client';
import React, { useState } from "react";
import SensorInfoCard from "@/app/components/SensorInfoCard";
import dynamic from "next/dynamic"
import Dropdown from "@/app/components/Dropdown";
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import InfoIcon from '@mui/icons-material/Info';
import { DONE_REQUEST, GET_SIMULATION, GET_SPECIES, INSERT_REQUEST } from "@/app/api/gqlQueries";

// Next.js combined with leaflet can be problematic, so we need a dynamic loading
// solution --> https://stackoverflow.com/questions/74289687/leaflet-implementation-on-next-js-13
const FjordMap = dynamic(() => import("@/app/components/Map/index"), { 
    ssr: false,
})

async function insertMutation (insertReq : any, gridID: number, species : string) {
    insertReq({ variables: { species: species, grid_id: gridID }}).onCompleted
}

// Dashboard website wrapped in ApolloProvider to interact with the API
export default function Dashboard() {


    // Position of lander: default position to center the map
    const landerPosition = { lat: 59.658233, lng: 10.624583}
    // clicked on map by user
    const [clickedPos, setClickedPos] = useState( landerPosition )
    // question chosen from dropdown menu
    const [chosenQuestion, setChosenQuestion] = useState({item: ''}) 
    // species chosen from dropdown menu
    const [chosenSpecies, setChosenSpecies] = useState({item: ''}) // , id: 0})
    // grid id from the rectangle on the map
    const [gridID , setGridID] = useState(1) // , id: 0})
    // is set to true when popup window is displayed
    const [popup, setPopup] = useState(false)

    // will this work with several clients?
    const [dataReady, setDataReady] = useState(false)
    const [displayData, setDisplayData] = useState(null)
    
    // temporary list of questions the user can ask the twin
    const temporaryQuestionlist = ['Is this a good place for']

    console.log('chosen species is', chosenSpecies)
    console.log('chosen question is', chosenQuestion)
    console.log('the grid id is ', gridID)
    
    // QUERIES
    const [getData, { loading: otherLoading, error: otherError, data: otherData }] = useLazyQuery(GET_SIMULATION)  //set which query to run here with variables
    const {loading, error, data, refetch} = useQuery(DONE_REQUEST)
    // MUTATION
    const [insertReq] = useMutation(INSERT_REQUEST, {
        refetchQueries: [{query: DONE_REQUEST}],
        awaitRefetchQueries: true,
        onCompleted: (dataset : any) => {
            const request_id = dataset.insert_requests_one.request_id // the response's request_id
            findMutation(request_id)
            updateTable(request_id)
        },
        onError: (error) => {
          console.log(error); 
        },
      }
    );

    async function refetchFunc(mutation : any) {
        //remember to check that length is 1, only one element with identical requestid
        let dataset = await refetch()
        console.log('dataset', dataset)

        let mutatedEl = await dataset.data.requests.find((request : any) => request.request_id == mutation)
        //remember to check that it is found too
        let done = mutatedEl.done    
        console.log('done', done,' ', mutatedEl)

        // remember to add a timeout to make sure the while loop does not run infinitely
        while (done == false) {
            dataset = await refetch()
            mutatedEl = dataset.data.requests.find((request : any) => request.request_id == mutation)
            if (mutatedEl.done == true) {
                done = true
                console.log('Results available!')
            } else {
                await new Promise(resolve => setTimeout(resolve, 500))
            
            }
        }    
    }

    async function findMutation (request_id : number) {
        let mutation = data.requests.find((request : any) => request.request_id == request_id)
        console.log('mutation',mutation)
        return mutation
    }


    async function displayResult(data : any) {
        setDisplayData(data)  
    }

    async function updateTable (request_id: number) {
        await refetchFunc(request_id) 
        const request = await findMutation(request_id)
        const gridID : number = await request.grid_id
        //const species : string = await request.species_name
        const result = await getData({variables: { "grid_id": gridID , "request_id": request_id}})
        console.log('Results from final query', result)
        await displayResult(result)
    }

    async function makeRequest(gridID : number, species: string) {
        // first, reset any previous data request results
        setDataReady(false)
        setDisplayData(null)
        // insert new mutation in the database
        await insertMutation(insertReq, gridID, species)
        setDataReady(true)
    }

    return (
        <div className="grid grid-flow-row mt-12 mb-28 w-screen place-content-center">
            <p className=" text-slate-100 font-semibold text-2xl md:text-3xl place-self-center pt-4 mt-4"> Dashboard </p> 
            <div className=" pb-12 mb-12 items-center" >
                <div className=" block relative pb-4 mt-12 mb-8 w-full">
                {/*tabOne && */}
                    <div className="grid grid-rows-4 xl:grid-cols-4 p-2 place-items-center xl:place-items-baseline bg-slate-100 h-60 xl:h-20 w-2/3 mx-auto xl:w-full rounded-lg">
                    
                    <Dropdown styling='absolute top-3 z-20 xl:z-30' temporary={temporaryQuestionlist} query={GET_SPECIES} placeholder={'Choose a question ...'} setChosen={setChosenQuestion}/>
                    <Dropdown styling='absolute top-20 z-10 xl:top-3 xl:left-96 xl:ml-8' temporary={['null']} query={GET_SPECIES} placeholder={'Search for species ...'} setChosen={setChosenSpecies}/>
                    <button onClick={() => makeRequest(gridID, chosenSpecies.item)} disabled={chosenQuestion.item == '' || chosenSpecies.item == ''}
                        className=" row-start-4 row-span-1 xl:col-start-4 xl:col-span-1 xl:place-self-end my-2 mr-4 w-24 h-12 rounded bg-blue-400 hover:bg-blue-500 disabled:bg-slate-300 text-lg"> Go </button>
                    </div>
                {/*!tabOne &&*/}          
                </div>
                <FjordMap geoData={landerPosition} clickedPos={clickedPos} setClickedPos={setClickedPos} setGridID={setGridID} popup={popup} dataReady={dataReady} setDataReady={setDataReady} displayData={displayData} setDisplayData={setDisplayData}></FjordMap>
                <div className=" mt-8 p-4 bg-blue-200 w-2/3 xl:w-full h-fit mx-auto rounded-md self-center flex flex-row">
                    <InfoIcon className=" text-slate-700 ml-4 mr-4 self-start" fontSize="medium"></InfoIcon>
                    <p className="self-center"> 
                        Choose a question, a species, and a position on the map that you would like information on. 
                        When you are ready, click the button to get information from the digital twin.
                    </p>
                </div>
            </div>
            { /* MIGHT REMOVE -- previous functionality
            <p className=" text-slate-100 font-semibold text-2xl md:text-3xl place-self-center pb-4 mb-8"> Real-time Data from the Drøbak Lander</p>
            <div className="grid grid-rows-1 md:grid-cols-3 mb-12 place-items-center"> 
                <SensorInfoCard type="Temperature" unit="°C" value="7.5" change="1.6"/>
                <SensorInfoCard type="Salinity" unit="ppt" value="18" change="0.8"/>
                <SensorInfoCard type="Turbidity" unit="FTU" value="4.5" change="1.4"/>
            </div>       
             
        

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
    )
}
