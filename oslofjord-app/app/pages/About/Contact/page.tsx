import React from "react";
import { Grid } from "@mui/material";
import MainTitle from "@/app/components/MainTitle";
import Link from "next/link";


const Contact = () => {
    return (
        <Grid container className="h-fit flex flex-col place-content-center">
            <MainTitle title="Contact"/>
            <div className="w-screen h-1/3 mx-auto my-auto mb-56  bg-gradient-to-b from-slate-700 from-75% to-slate-800 to-1%">
            <div className=" w-1/3 mx-auto place-items-center text-base font-semibold p-8 mt-12 mb-56 rounded-xl">
                        <p className="text-white text-xl lg:text-2xl font-light first-letter:font-semibold first-letter:text-white first-letter:float-left">
                            For any information regarding the project, please contact Einar Broch Johnsen: 
                        </p>
                        <p className="text-slate-200 font-light text-center text-xl lg:text-2xl mt-8">
                        E-mail: einarj@uio.no 
                        </p>
                        <p className=" text-white font-light text-center text-xl lg:text-2xl leading-loose mt-2">
                            Website: <Link href="https://ebjohnsen.org" className="text-blue-500 italic hover:font-bold"> ebjohnsen </Link> 
                            
                        </p>
                    </div>
            </div>
        </Grid>
    )
}

export default Contact;