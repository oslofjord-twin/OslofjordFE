import React from 'react'
import { Line } from 'react-chartjs-2';
import CloseIcon from '@mui/icons-material/Close';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { DocumentNode } from '@apollo/client';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);


interface ResChartProps {
  simulations : any;
  runtime_monitoring : any; 
  title : string;
  setShowGraph : React.Dispatch<React.SetStateAction<boolean>>;
}

// Returns a chart showing temperatures the last 24 hours and the runtime monitoring results
export default function ResultsChart(props : ResChartProps) {
    let arrayCheck = (props.simulations.length !== props.runtime_monitoring.length ) ? false : true

    // array for x-axis values
    const time : number[] = []

    //array for y-axis values 
    const temperatureData : number [] = []
    
    // array containing data that will color the graph 
    const speciesData : boolean [] = []

    // loop through array to find values for x-axis and y-axis
    props.simulations.forEach((obj : any) => {
        if (obj.temperature == 'NaN') {
          arrayCheck = false
        }
        time.push(new Date(obj.record_time).getUTCHours())
        temperatureData.push(obj.temperature)
      }
    )

    // loop through arrray and find what data from runtime monitoring to use
    props.runtime_monitoring.forEach((obj : any) => {
      if (props.title == 'Suitable Temperature') {
        obj.suitable_temperature == null ? arrayCheck = false : speciesData.push(obj.suitable_temperature)
      } else if (props.title == 'Suitable Spawning Temperature') {
        obj.suitable_spawning_temperature == null ? arrayCheck = false : speciesData.push(obj.suitable_spawning_temperature)
      } else if (props.title == 'Preferred Spawning Temperature') {
        obj.preferred_spawning_temperature == null ? arrayCheck = false : speciesData.push(obj.preferred_spawning_temperature)
      }
    })

    // set necessary options for the Chart.js graph
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top' as const,
        },
        filler: {
              propagate: false
        },
        title: {
          display: true,
          text: props.title,
        },
        subtitle: {
          display: true,
          text: 'Custom Chart Sbtitle'
        },
      },
      scales: {
        y: {
          beginAtZero: false,
          title: {
            display: true,
            text: 'Temperature'
          }
        },
        x: {
          title: {
            display: true,
            text: 'Hour registered'
          }
        }
      }
    }
    
    /* 
    Set data for the Chart.js line graph
    Data on y-axis is temperatures, for each hour on the x-axis. 
    Data for each hour is colored based on corresponding index of the array with species results
     */ 
    const data : any = {
      labels: time,
      datasets: [{
          label: 'Temperatures',
          data: temperatureData,
          fill: true,
          borderColor: "gray",
          segment : {
            backgroundColor: (part : any) => {
              const prevIndex = part.p0DataIndex
              const nextIndex = part.p1DataIndex
              return speciesData[prevIndex] == true || speciesData[nextIndex] == true ? "green" : "orange"
            }
          }
      }],
    }
    
  return (
   
    <div className=' absolute flex inset-0 z-0 w-5/6 h-fit xl:h-96 xl:w-auto xl:justify-center p-8 mx-auto my-auto rounded-lg border border-slate-400 bg-slate-100 text-black'>
        <CloseIcon onClick={() => props.setShowGraph(false)} className='m-2 p-2 absolute top-4 right-4 sm:right-8 text-5xl text-slate-500 hover:text-slate-900 hover:shadow-sm cursor-pointer'></CloseIcon>
        {arrayCheck == true && <Line data={data} options={options}/>}
        {arrayCheck == false &&
        <div className='w-fit h-fit p-4 m-8 border-slate-400 bg-slate-100 text-black'>
          There is unfortunately not enough data to create the graph
        </div>}
    </div>
  
  )

}

