import React from "react";
import { Grid } from "@mui/material";
import Graph from "@/app/components/Graph";

{/* Temporary content */}


let temps = [
    { date: "2023-04-30T12:00:00.00+00:00", value: 4 },
    { date: "2023-05-01T12:00:00.00+00:00", value: 6 },
    { date: "2023-05-02T12:00:00.00+00:00", value: 8 },
    { date: "2023-05-03T12:00:00.00+00:00", value: 7 },
    { date: "2023-05-04T12:00:00.00+00:00", value: 10 },
    { date: "2023-05-05T12:00:00.00+00:00", value: 12 },
    { date: "2023-05-06T12:00:00.00+00:00", value: 4 },
  ];
let data = temps.map((d) => ({ ...d, date: new Date(d.date) }))

const Analytics = () => {
    return (
        <Grid container className=" place-content-center">
            <div className="grid grid-flow-row  w-3/5">
            <div className="mx-auto mt-16 text-center justify-center leading-7">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-wide text-zinc-100"> Analytics </h1>
            </div>
            {/* Have different tabs to show stats for each sensor (i.e. temp)?  https://mui.com/material-ui/react-tabs/ */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-12 p-4 m-8 mt-16 mb-24 ">
            <div className="col-span-2 h-60">
                <Graph data={data} />
            </div>
                <div className="h-40">
                <Graph data={data} />
            </div>
            <div className="h-40">
                <Graph data={data} />
            </div>
            </div>
            </div>
        </Grid>
    )
}

{/* maybe use datacards (mui paper) for showing statistic overview https://www.youtube.com/watch?v=gTI8eiExlPA&list=PLo-5F4Vt4vYTKr_BHrLr59Uh4MQegoWdH&index=6*/}

export default Analytics;