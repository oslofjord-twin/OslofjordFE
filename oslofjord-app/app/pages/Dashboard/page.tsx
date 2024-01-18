import React from "react";
import { Grid } from "@mui/material";
import SensorInfoCard from "@/app/components/SensorInfoCard";

const Dashboard = () => {
    return (
        <Grid container className=" place-content-center">
            <div className="grid grid-flow-row mt-24 w-screen place-content-center">
                <p className=" text-slate-100 font-semibold text-2xl md:text-3xl place-self-center pb-4"> Real-time Data</p>
                <div className="grid grid-rows-1 md:grid-cols-3 mb-12"> 
                    <SensorInfoCard type="Temperature" unit="°C" value="7.5" change="1.6"/>
                    <SensorInfoCard type="Salinity" unit="ppt" value="18" change="0.8"/>
                    <SensorInfoCard type="Turbidity" unit="FTU" value="4.5" change="1.4"/>
                </div>
                <p className=" text-slate-100 font-semibold text-2xl md:text-3xl place-self-center pt-4 mt-4"> Predictions </p>
                <div className="flex flex-col lg:flex-row mt-8 mb-28 p-4">
                    <div className=" w-full m-2 bg-slate-600 rounded-lg h-48"></div>
                    <div className=" w-full m-2 bg-slate-600 rounded-lg h-48"></div>
                </div>
            </div>
        </Grid>

    )
}

export default Dashboard;