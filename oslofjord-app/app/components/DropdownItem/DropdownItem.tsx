import React, { ChangeEvent, ReactElement } from 'react';
import { Dispatch, SetStateAction } from 'react';

interface DropdownItemProps{
    name: string;
    setChosenSpecies: Dispatch<SetStateAction<{item: string}>> //, id: number}>>
    setDropdown: Dispatch<SetStateAction<boolean>>
    setSearchQuery:  Dispatch<SetStateAction<string>>
}

// returns a single list element in the dropdown menu

function DropdownItem ({name, setChosenSpecies, setDropdown, setSearchQuery}: DropdownItemProps) : ReactElement {
  return (
    <li id={name} onClick={() => {setChosenSpecies({item: name}); setDropdown(false); setSearchQuery(name);}} className='cursor-pointer'>
        <div className="flex items-center ps-2 p-2 rounded hover:bg-slate-500 group cursor-pointer">
        <label htmlFor={'input-field'} id={name} className="w-full py-2 ms-2 text-sm font-medium cursor-pointer text-gray-900 group-hover:text-slate-100 rounded dark:text-gray-300"> {name} </label>
        </div>
    </li>   
)}

export default DropdownItem