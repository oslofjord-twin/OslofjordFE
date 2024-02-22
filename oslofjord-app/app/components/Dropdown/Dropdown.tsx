'use client';
import React, { ChangeEvent, useState } from 'react'
import { Dispatch, SetStateAction } from 'react';
import DropdownItem from './DropdownItem';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SearchIcon from '@mui/icons-material/Search';
import { useQuery } from '@apollo/client';
import { GET_SPECIES } from '@/app/api/gqlQueries';

// Dropdown menu to choose a species from the Knowledge graph

interface DropdownProps{
    setChosenSpecies: Dispatch<SetStateAction<{item: string}>>
}

function Dropdown({setChosenSpecies}: DropdownProps) {
    // Loads data about the species from the API using the GET_SPECIES query
    const { loading, error, data } = useQuery(GET_SPECIES)
    if (error) {
        console.error(error);
    }

    const [dropdown, setDropdown] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [filteredSpecies, setFilteredSpecies] = useState(data? data.species : [{name:''}])

    // Shows and hides dropdown menu for species list
    function handleDropdown() {
        setDropdown(!dropdown)
        setSearchQuery('')
        setFilteredSpecies(data.species)
    }   

    // Splits the searchQuery string if it is to long, to get a nice format for chosen species in the input value box
    function setInputText() {
        let returnString : string = searchQuery
        searchQuery.length > 18 ? returnString = searchQuery.substring(0,17)+'...' : returnString 
        return returnString
    }   

    // Keeps track of changes in the input box
    function searchHandler(event: ChangeEvent<HTMLInputElement>) {
        const { target } = event;
        setSearchQuery(target.value);

        const filteredList = data.species.filter((spc: { name: string; }) => 
            spc.name.toLowerCase().startsWith(target.value.toLowerCase()),
        );

        setFilteredSpecies(filteredList)
    }    

    return (
        <div className='absolute top-3 z-10'>
            <div className=' flex flex-row w-80 h-fit bg-slate-100 rounded-md justify-center p-4 border border-slate-600'>
                <div className='relative w-60 h-30 bg-slate-100 rounded-md '>
                    <SearchIcon fontSize='large' className='absolute inset-y-0 left-0 text-slate-500 flex items-center pl-2'></SearchIcon>
                    <input type="search" id="input-field" value={setInputText()} onChange={searchHandler} onClick={handleDropdown} placeholder={'Search for species ...'} className="block w-full text-center text-sm text-slate-700 border border-slate-300 rounded-lg bg-slate-50 focus:ring-blue-500 focus:border-blue-500"/>
                </div>
                <ArrowDropDownIcon onClick={handleDropdown} fontSize="large" className='place-self-end ml-2 text-slate-600 cursor-pointer hover:text-slate-900'/>
            </div>
            {(dropdown) && (data) && 
            <div className=' bg-slate-100 w-80 max-h-56 min-h-fit overflow-y-scroll mt-2 rounded scroll-smooth cursor-pointer border border-slate-600' id="dropdownmenu">
                <ul id={'speciesList'} className=' divide-y divide-slate-400 cursor-pointer ' >
                    {filteredSpecies.map((species: { name: string; }) => (
                        <DropdownItem key={species.name} setChosenSpecies={setChosenSpecies} setDropdown={setDropdown} name={species.name} setSearchQuery={setSearchQuery}></DropdownItem>
                    ))}
                </ul>
            </div>  
            }
        </div>   
)}

export default Dropdown; 