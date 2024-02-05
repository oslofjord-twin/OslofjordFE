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
                            temperature, oxygen, plankton, etc. in the Oslo Fjord.  The topic of this thesis is to develop a semantic digital twin 
                            for the Oslo Fjord.
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
                                The digital twin architecture will be developed using <Link href="https://smolang.org" className="text-blue-600 italic hover:font-bold"> SMOL </Link>, a language developed 
                                at UiO specifically for digital twins. SMOL integrates simulators of physical systems with semantic web technologies and databases. 
                                The thesis encompasses working with SMOL, time series databases, and visualization frameworks. Since the decision of which 
                                visualization framework and database to use is part of the thesis, we welcome students with experience in these areas, 
                                but this is not a necessary prerequisite.
                            </p>
                        </div>
                    </div> 
                </div>
                <div className="mx-auto w-fit mt-24 leading-7">
                    <h1 className="font-semibold text-4xl sm:text-5xl tracking-wide text-slate-200 "> Sensor Data </h1>
                </div>
                <div className="static flex flex-col lg:grid lg:grid-cols-3 m-4 p-12 place-items-center">
                    <Image
                            className="object-contain w-auto h-auto mb-12 lg:mb-0 col-start-1 rounded-lg hover:rounded-lg shadow-green-900/30 hover:shadow-indigo-900/40"
                            src="/static/oslofjord2.png"
                            width={360}
                            height={500}
                            loading="lazy"
                            alt="Oslofjord map"
                    />
                    <div className="col-span-2 mr-4 place-self-start font-semibold leading-7 pl-8 pr-8 rounded-xl">
                        <p className="text-white text-xl lg:text-2xl font-light leading-loose first-letter:text-4xl first-letter:mr-1 first-letter:font-semibold first-letter:text-white first-letter:float-left">
                            The sensors we retrieve data from are placed on a lander located near Drøbak. Here we can write
                            more about the lander and the sensors we have available. 
                        </p>
                        <p className="mt-12 text-white text-xl lg:text-2xl  font-light leading-loose">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur scelerisque scelerisque facilisis. Donec in ultricies ligula. Nunc nec mi volutpat, 
                            iaculis massa a, pulvinar enim. Etiam quis maximus nulla, id accumsan purus. Donec nec sodales mauris. Maecenas malesuada quam eget lacus aliquet, 
                            eu consectetur dui dictum. Pellentesque vulputate tristique sapien, 
                            vehicula condimentum lorem imperdiet a. Donec in aliquet tellus. Donec id luctus ipsum. Vivamus ut hendrerit justo, ut sollicitudin nulla. 
                            Integer malesuada malesuada massa eu dictum. Sed hendrerit libero a sodales consequat. Suspendisse potenti.
                        </p>
                  
                    </div>
                </div>
            </div>
        </Grid>
    )
}

export default Project;