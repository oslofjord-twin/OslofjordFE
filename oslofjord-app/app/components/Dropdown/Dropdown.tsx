'use client';
import React, { ChangeEvent, useState } from 'react'
import { Dispatch, SetStateAction } from 'react';
import DropdownItem from './DropdownItem';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SearchIcon from '@mui/icons-material/Search';

const speciesList = [
    {name:'Cod', id:1}, 
    {name:'Herring', id:2}, 
    {name:'Bass', id:3}, 
    {name:'Algae', id:4}, 
    {name:'Seahorse', id:5},
    {name:'a', id:6}, 
    {name:'b', id:7}, 
    {name:'c', id:8},
];

interface DropdownProps{
    chosenSpecies : { item: string; id: number; }
    setChosenSpecies: Dispatch<SetStateAction<{item: string, id: number}>>
}

function Dropdown({chosenSpecies, setChosenSpecies}: DropdownProps) {

    const [dropdown, setDropdown] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [filteredSpecies, setFilteredSpecies] = useState(speciesList)

    // Shows and hides dropdown menu for species list
    function handleDropdown() {
        setDropdown(!dropdown)
        setSearchQuery('')
        setFilteredSpecies(speciesList)
    }   

    // Keeps track of changes made to the input box
    function searchHandler(event: ChangeEvent<HTMLInputElement>) {
        const { target } = event;
        setSearchQuery(target.value);

        const filteredList = speciesList.filter((spc) => 
            spc.name.toLowerCase().startsWith(target.value.toLowerCase()),
        );
        setFilteredSpecies(filteredList)
        console.log(filteredList)
    }
    
    return (
        <div className='absolute top-3 z-10'>
            <div className=' flex flex-row w-80 h-fit bg-slate-100 rounded-md justify-center p-4 border border-slate-600'>
                <div className='relative w-60 h-30 bg-slate-100 rounded-md '>
                    <SearchIcon fontSize='large' className='absolute inset-y-0 left-0 text-slate-500 flex items-center pl-2'></SearchIcon>
                    <input type="search" id="input-field" value={searchQuery} onChange={searchHandler} onClick={()=> {setDropdown(true); setSearchQuery(''); setFilteredSpecies(speciesList);}} placeholder={'Search for species ...'} className="block w-full text-center text-sm text-slate-700 border border-slate-300 rounded-lg bg-slate-50 focus:ring-blue-500 focus:border-blue-500"/>
                </div>
                <ArrowDropDownIcon onClick={handleDropdown} fontSize="large" className='place-self-end ml-2 text-slate-600 cursor-pointer hover:text-slate-900'/>
            </div>
            {dropdown &&
            <div className=' bg-slate-100 w-80 max-h-56 min-h-fit overflow-y-scroll mt-2 rounded scroll-smooth cursor-pointer border border-slate-600' id="dropdownmenu">
                <ul id={'speciesList'} className=' divide-y divide-slate-400 cursor-pointer ' >
                    {filteredSpecies.map((species) => (
                        <DropdownItem setChosenSpecies={setChosenSpecies} setDropdown={setDropdown} itemId={species.id} name={species.name} setSearchQuery={setSearchQuery}></DropdownItem>
                    ))}
                    
                </ul>
            </div>  
            }
        </div>   
)}

export default Dropdown; 