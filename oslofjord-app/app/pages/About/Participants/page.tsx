import React from "react";
import Link from 'next/link';
import Image from 'next/image'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Grid } from "@mui/material";
import ParticipantCard from "../../../components/ParticipantCard/ParticipantCard";
import MainTitle from "@/app/components/MainTitle";


const Participants = () => {
    return (
        <Grid container className="flex flex-col place-content-center mb-16">
                <MainTitle title="Participants"/>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 p-4 place-content-center">
                    <ParticipantCard key="1" name="Einar Broch Johnsen" role="Professor, Department of Informatics, University of Oslo."/>
                    <ParticipantCard key="2" name="Rudolf Schlatte" role="Senior Researcher, Department of Informatics, University of Oslo."/>
                    <ParticipantCard key="3" name="Eduard Kamburjan" role="Senior Researcher, Department of Informatics, University of Oslo."/>
                    <ParticipantCard key="4" name="Silvia Lizeth Tapia Tarifa" role="Associate professor, Department of Informatics, University of Oslo."/>
                    <ParticipantCard key="5" name="Ingrid Chieh Yu" role="Associate professor, Department of Informatics, University of Oslo."/>
                    <ParticipantCard key="5" name="Andrea Pferscher" role="Postdoctoral Research Fellow, Department of Informatics, University of Oslo."/>
                    <ParticipantCard key="5" name="Riccardo Sieve" role="PhD student, Department of Informatics, University of Oslo."/>
                    <ParticipantCard key="6" name="André Finstad" role="Master's student in Programming and System Architecture, University of Oslo."/>
                    <ParticipantCard key="7" name="Ingvild Emilie Øvsthus" role="Master's student in Programming and System Architecture, University of Oslo."/>
                    <ParticipantCard key="8" name="Janaaththan Manokaran" role="Master's student in Programming and System Architecture, University of Oslo."/>
                    <ParticipantCard key="9" name="Mariann Løtvedt" role="Master's student in Programming and System Architecture, University of Oslo."/>
                    <ParticipantCard key="10" name="Sander Sigmundstad" role="Master's student in Programming and System Architecture, University of Oslo."/>
                    <ParticipantCard key="11" name="Vebjørn Olsen Leihne" role="Master's student in Programming and System Architecture, University of Oslo."/>
            </div>
        </Grid>
    )
}



export default Participants;