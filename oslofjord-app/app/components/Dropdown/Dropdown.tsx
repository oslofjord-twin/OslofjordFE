'use client';
import React, { ChangeEvent, useState } from 'react'
import { Dispatch, SetStateAction } from 'react';
import DropdownItem from '../DropdownItem/DropdownItem';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SearchIcon from '@mui/icons-material/Search';
import { DocumentNode, useQuery } from '@apollo/client';

// Dropdown menu to choose a species from the Knowledge graph

interface DropdownProps{
    setChosen: Dispatch<SetStateAction<{item: string}>>
    styling: string
    placeholder: string
    query: DocumentNode
    temporary: string[]
}

function Dropdown({setChosen, styling, placeholder, query, temporary}: DropdownProps) {
    // Loads data about the species from the API using the GET_SPECIES query
    const { loading, error, data } = useQuery(query)
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
        setChosen({item:''})
    }   

    // Splits the searchQuery string if it is to long, to get a nice format for chosen species in the input value box
    function setInputText() {
        let returnString : string = searchQuery
        searchQuery.length > 34 ? returnString = searchQuery.substring(0,33)+'...' : returnString 
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
        <div className={styling}>
            <div className=' flex flex-row w-96 h-fit bg-slate-100 rounded-md justify-center p-2 border border-slate-600'>
                <div className='relative w-80 h-30 bg-slate-100 rounded-md '>
                    <SearchIcon fontSize='large' className='absolute inset-y-0 left-0 text-slate-500 flex items-center pl-2'></SearchIcon>
                    <input type="search" id={`input-field-${temporary}`} value={setInputText()} onChange={searchHandler} onClick={handleDropdown} placeholder={placeholder} className="block w-full text-center text-sm text-slate-700 border border-slate-300 rounded-lg bg-slate-50 focus:ring-blue-500 focus:border-blue-500"/>
                </div>
                <ArrowDropDownIcon onClick={handleDropdown} fontSize="large" className='place-self-end ml-2 text-slate-600 cursor-pointer hover:text-slate-900'/>
            </div>
            {(dropdown) && (data) && 
            <div className=' bg-slate-100 w-96 max-h-56 min-h-fit overflow-y-scroll mt-2 rounded scroll-smooth cursor-pointer border border-slate-600'>
                <ul id={`${temporary}`} className=' divide-y divide-slate-400 cursor-pointer ' >
                    {temporary[0] == 'null' && 
                    filteredSpecies.map((species: { name: string; }) => (
                        <DropdownItem key={species.name} setChosenSpecies={setChosen} setDropdown={setDropdown} name={species.name} setSearchQuery={setSearchQuery}></DropdownItem>
                    ))}
                    {temporary[0] != 'null' && temporary.map((question) => (
                         <DropdownItem key={question} setChosenSpecies={setChosen} setDropdown={setDropdown} name={question} setSearchQuery={setSearchQuery}></DropdownItem>
                     ))}
                </ul>
            </div>  
            }

        </div>   
)}

export default Dropdown; 