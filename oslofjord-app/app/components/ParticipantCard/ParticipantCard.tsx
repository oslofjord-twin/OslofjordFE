import React from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

interface Card {
    name: string; 
    role: string
}

// Container for each participant on the contact page

const ParticipantCard = ({ name, role } : Card) => {
    return (
        <div className="flex flex-col md:flex-row items-center max-w-sm md:max-w-md lg:max-w-lg p-4 bg-slate-200 border border-slate-500 rounded-lg shadow">
            <AccountCircleIcon className=" text-slate-500 w-24 h-24 md:w-36 md:h-36 m-4 "/>
            <div className="m-4 flex flex-col divide-y divide-slate-500">
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{name}</h5>
                <p className="mt-2 pt-2"> {role} </p>
            </div>
        </div>
    )
}

export default ParticipantCard;