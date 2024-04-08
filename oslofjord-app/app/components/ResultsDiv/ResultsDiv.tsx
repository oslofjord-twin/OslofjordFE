import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';

// Spinning loading circle whilst waiting for data from the twin
function CircularIndeterminate() {
    return (
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    );
  }

export default function ResultsDiv({dataReady, setDataReady, displayData, setDisplayData}: any) {
  return (
    <div className=' absolute inset-0 z-0 w-auto h-auto p-8 mt-24 mb-24 m-44 md:ml-64 md:mr-64 xl:ml-32 xl:mr-32 rounded-lg border border-slate-400 bg-slate-100 text-black'>
        <CloseIcon onClick={() => {setDataReady(false); setDisplayData(null)}} className='m-2 p-2 absolute top-4 right-4 sm:right-8 text-5xl text-slate-700 bg-slate-200 rounded-3xl cursor-pointer'></CloseIcon>
        {displayData !== null ? (
            <div className='flex p-2 m-2 justify-center' >
             {displayData.data.runtime_monitoring[0].id_sim}
            </div>              
        ): <div className='flex flex-col justify-center p-2 m-2' >
                <div className='place-self-center pt-8 p-2 m-4'>
                    <CircularIndeterminate></CircularIndeterminate>
                </div >
                <div className='place-self-center text-xl p-2 m-4'> Loading Results </div>
            </div> 
        }
        
    </div>  
  )
}

