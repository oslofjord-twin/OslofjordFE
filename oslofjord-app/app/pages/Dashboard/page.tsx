'use client';
import React, { useState } from "react";
import dynamic from "next/dynamic"
import Dropdown from "@/app/components/Dropdown";
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import InfoIcon from '@mui/icons-material/Info';
import { DONE_REQUEST, GET_INTERSECTION, GET_RESULTS, GET_SPECIES, INSERT_REQUEST } from "@/app/api/gqlQueries";
import { twinQuestionList } from "@/app/utils/staticData/twinQuestions";

// Next.js combined with leaflet can be problematic, so we need a dynamic loading
// solution --> https://stackoverflow.com/questions/74289687/leaflet-implementation-on-next-js-13
const FjordMap = dynamic(() => import("@/app/components/Map/index"), { 
    ssr: false,
})

async function insertMutation (insertReq : any, gridID: number, species : string) {
    insertReq({ variables: { species: species, grid_id: gridID }}).onCompleted
}

// Dashboard page wrapped in ApolloProvider to interact with the API.
// The Dashboard export function coordinates the interaction between all elements on the dashboard page
export default function Dashboard() {

    // Position of lander: default position to center the map
    const landerPosition = { lat: 59.658233, lng: 10.624583}
    // clicked on map by user
    const [clickedPos, setClickedPos] = useState<{lat: number; lng: number;}>( landerPosition )
    // question chosen from dropdown menu
    const [chosenQuestion, setChosenQuestion] = useState({item: ''}) 
    // species chosen from dropdown menu
    const [chosenSpecies, setChosenSpecies] = useState({item: ''}) 
    // signals if there is data ready to display
    const [dataReady, setDataReady] = useState<boolean>(false)
    // sets any data that is ready for display, default is null
    const [displayData, setDisplayData] = useState(null)
    
  
    // QUERIES
    // Loads data from the API to make the grid rectangle using the GET_INTERSECTION query
    const { data: gridData } = useQuery(GET_INTERSECTION, {
        variables:  { point: { type: "Point", coordinates: [clickedPos.lng, clickedPos.lat] }},  //set which query to run here with variables
    })  
    // Fetches data about the request to runtime verification to see if results are ready 
    const { data, refetch } = useQuery(DONE_REQUEST)
    // Fetches result from the request
    const [getData] = useLazyQuery(GET_RESULTS)  

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
        let dataset
        //find the request
        let mutatedEl 
        // Ensure the while loop stops if no data is found
        let whileSafeCheck = true
        //If the request is found, done will turn false 
        let done = false

        let countTimeouts = 0
        while (done == false && whileSafeCheck) {
            dataset = await refetch()
            // check if the request is updated in the back-end by finding the request_id
            mutatedEl = await dataset.data.requests.find((request : any) => request.request_id == mutation)
            if (mutatedEl == undefined) {
                whileSafeCheck = false
                break;
            }
            if (mutatedEl.done == true) {
                done = true
            } else {
                await new Promise(resolve => setTimeout(resolve, 500))
                countTimeouts = countTimeouts + 1
                countTimeouts >= 40 ? whileSafeCheck = false : whileSafeCheck = true
            }
        }    
    }

    async function findMutation (request_id : number) {
        let mutation = data.requests.find((request : any) => request.request_id == request_id)
        //console.log('mutation',mutation)
        return mutation
    }

    async function displayResult(data : any) {
        setDisplayData(data)  
    }

    async function updateTable (request_id: number) {
        await refetchFunc(request_id) 
        const request = await findMutation(request_id)
        const gridID : null | number = request == undefined ? null : await request.grid_id
        const result = await getData({variables: { "grid_id": gridID , "request_id": request_id}})
        //console.log('Results from final query', result)
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
                    <div className="grid grid-rows-4 xl:grid-cols-4 p-2 place-items-center xl:place-items-baseline bg-slate-100 h-60 xl:h-20 w-2/3 mx-auto xl:w-full rounded-lg">
                    <Dropdown styling='absolute top-3 z-20 xl:z-30' list={twinQuestionList} query={GET_SPECIES} placeholder={'Choose a question ...'} setChosen={setChosenQuestion}/>
                    <Dropdown styling='absolute top-20 z-10 xl:top-3 xl:left-96 xl:ml-8' list={['null']} query={GET_SPECIES} placeholder={'Search for species ...'} setChosen={setChosenSpecies}/>
                    <button onClick={() => makeRequest(gridData.grid[0].id, chosenSpecies.item)} disabled={chosenQuestion.item == '' || chosenSpecies.item == ''}
                        className=" row-start-4 row-span-1 xl:col-start-4 xl:col-span-1 xl:place-self-end my-2 mr-4 w-24 h-12 rounded bg-blue-400 hover:bg-blue-500 disabled:bg-slate-300 text-lg"> Go </button>
                    </div>
                </div>
                <FjordMap gridData={gridData} landerPos={landerPosition} clickedPos={clickedPos} setClickedPos={setClickedPos} dataReady={dataReady} setDataReady={setDataReady} displayData={displayData} setDisplayData={setDisplayData}></FjordMap>
                <div className=" mt-8 p-4 bg-blue-200 w-2/3 xl:w-full h-fit mx-auto rounded-md self-center flex flex-row">
                    <InfoIcon className=" text-slate-700 ml-4 mr-4 self-start" fontSize="medium"></InfoIcon>
                    <p className="self-center"> 
                        Choose a question, a species, and a position on the map that you would like information on. 
                        When you are ready, click the &apos;Go&apos; button to get answers from the digital twin.
                    </p>
                </div>
            </div>  
        </div>
    )
}
