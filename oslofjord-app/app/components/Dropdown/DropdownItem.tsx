import React, { ChangeEvent, ReactElement } from 'react';
import { Dispatch, SetStateAction } from 'react';

interface DropdownItemProps{
    name: string;
    itemId: number; 
    setChosenSpecies: Dispatch<SetStateAction<{item: string, id: number}>>
    setDropdown: Dispatch<SetStateAction<boolean>>
}

function DropdownItem ({name, itemId, setChosenSpecies, setDropdown}: DropdownItemProps) : ReactElement {
  return (
    <li onClick={() => {setChosenSpecies({item: name, id: itemId}); setDropdown(false)}} className='cursor-pointer'>
        <div className="flex items-center ps-2 p-2 rounded hover:bg-slate-500 group cursor-pointer">
        <label htmlFor={itemId.toString()} className="w-full py-2 ms-2 text-sm font-medium cursor-pointer text-gray-900 group-hover:text-slate-100 rounded dark:text-gray-300"> {name} </label>
        </div>
    </li>   
)}

export default DropdownItem