import React from "react";
import Link from 'next/link';
import Image from 'next/image'
import { Grid } from "@mui/material";
import MainTitle from "@/app/components/MainTitle";


const Project = () => {
    return (
        <Grid container>
            <MainTitle title="A Digital Twin for the Oslo Fjord"/>
            <div className=" w-screen mx-auto mb-36 bg-gradient-to-b from-slate-700 from-90% to-slate-800 to-1%">
                <div className=" flex flex-col gap-16 xl:flex-row p-12 mt-12 mb-12 items-center">
                    <Image
                        className="object-contain w-auto h-auto min-w-sm m-4 rounded-lg hover:rounded-lg shadow-2xl"
                        width={500}
                        height={200}
                        src="/static/CodTwin.jpg"
                        loading="lazy"
                        alt="Cod image"
                    />
                    <div className="text-base font-semibold leading-7 p-8 rounded-xl">
                        <p className="text-white text-xl lg:text-2xl font-light leading-10 first-letter:text-4xl first-letter:mr-1 first-letter:font-semibold first-letter:text-white first-letter:float-left">
                            Our aim is to develop a digital twin to model and analyze climate pressure on ecosystems in the Oslo Fjord. 
                            A digital twin is a modelling framework that integrates real-time sensor data.
                        </p>
                        <p className="mt-12 text-white text-xl lg:text-2xl font-light leading-loose">
                            We collaborate with <Link href="https://friskoslofjord.no" className="text-blue-600 italic hover:font-bold">Frisk Oslofjord </Link>, 
                            a project which collects data from the fjord. Frisk Oslofjord provides real-time and historical data about salinity, 
                            temperature, oxygen, plankton, etc. in the Oslo Fjord. 
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-8">
                    <div className=" static flex flex-col col-start-2 col-end-9 xl:flex-row h-fit items-center mx-auto p-12 mt-4 rounded-l-2xl bg-slate-800">
                        <div className="m-4 p-8 text-base font-semibold leading-7 ">
                            <p className="text-slate-100 text-xl lg:text-2xl  font-light leading-loose">
                                This digital twin will be used in the context of ongoing digital twin activities at UiO and the 
                                <Link href="https://uio.no/dscience" className="text-blue-600 italic hover:font-bold"> dScience center </Link>. The digital twin will ultimately enable semantic analysis
                                and, building on that, data visualization by oceanographers and other interested members of the public.
                            </p>
                            <p className="mt-12 text-slate-100 text-xl lg:text-2xl font-light leading-loose">
                                The digital twin project encompasses working with time-series databases, runtime monitoring, simulations, APIs, knowledge graphs and visualization frameworks. 
                            </p>
                        </div>
                    </div> 
                </div>
                <div className=" self-start ml-28 xl:mx-auto w-fit mt-24 leading-7">
                    <h1 className="self-center font-semibold text-4xl sm:text-5xl tracking-wide text-slate-200 "> Sensor Data </h1>
                </div>
                <div className="static flex flex-col self-center lg:grid lg:grid-cols-3 m-4 p-12">
                    <Image
                            className="object-contain mb-12 ml-10 xl:place-self-end mr-8 lg:mb-0 col-start-1 rounded-lg hover:rounded-lg shadow-green-900/30 hover:shadow-indigo-900/40"
                            src="/static/oslofjord2.png"
                            width={360}
                            height={400}
                            loading="lazy"
                            alt="Oslofjord map"
                    />
                    <div className="col-span-2 mr-4 font-semibold leading-7 pl-8 pr-8 rounded-xl">
                        <p className="w-2/3 text-white text-xl lg:text-2xl font-light leading-loose first-letter:text-4xl first-letter:mr-1 first-letter:font-semibold first-letter:text-white first-letter:float-left">
                            The sensors we retrieve data from are placed on a lander located near Drøbak. 
                        </p>      
                        <p className="w-2/3 mt-2 text-white text-xl lg:text-2xl font-light leading-loose">
                            From collected data, the digital twin can create simulated data for other parts of the fjord. This data is combined
                            with species data, such as suitable temperatures and spawning temperatures for different species. 
                            To further expand the digital twin, more sensors and landers could be added, which will 
                            improve the simulations. 
                        </p>
                    </div>
                </div>
            </div>
        </Grid>
    )
}

export default Project;