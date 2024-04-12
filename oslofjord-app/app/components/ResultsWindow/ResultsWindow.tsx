import React, { useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import AspectRatioOutlinedIcon from '@mui/icons-material/AspectRatioOutlined';
import ResultsDiv from '../ResultsDiv';

// Spinning loading circle whilst waiting for data from the runtime monitoring
function CircularLoader() {
    return (
      <Box className="flex">
        <CircularProgress />
      </Box>
    );
}

export default function ResultsWindow({setDataReady, displayData, setDisplayData}: any) {

  const [shrinkWindow, setShrinkWindow] = useState(false)
  
  return (
    <div>
    {shrinkWindow == false && 
    <div className=' absolute inset-0 z-0 w-2/3 h-fit mx-auto xl:my-auto xl:w-auto xl:mx-10 p-8 rounded-lg border border-slate-400 bg-slate-100 text-black'>
        <CloseIcon onClick={() => {setDataReady(false); setDisplayData(null)}} className='m-2 p-2 absolute top-4 right-4 sm:right-8 text-5xl text-slate-700 bg-slate-200 hover:bg-slate-300 hover:text-slate-900 rounded-3xl cursor-pointer'></CloseIcon>
        {displayData !== null ? (
            <div className='flex p-2 ml-2 mr-2' >
              {/* ResultsDiv displaying all information from the twin*/}
              {displayData !== undefined && 
              <ResultsDiv displayData={displayData}></ResultsDiv>
              }
              <button className=' absolute z-0 bottom-0 right-0 mr-12 flex flex-row gap-4 w-fit h-fit  mb-8 rounded-lg' onClick={() => setShrinkWindow(true)}> 
                <p className='w-fit h-fit invisible mb-2 xl:visible'> Show Map </p>
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

