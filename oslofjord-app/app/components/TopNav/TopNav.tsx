import React from 'react'
import{ Box, Button } from '@mui/material';
import Link from 'next/link';

//Loosely based on Material UI header components

const menuItems = [{title: 'Dashboard'}, {title: 'About', navTo: 'About/Project', subMenus: [{title: 'Project'}, {title: 'Participants'}, {title: 'Contact'}]}]

export default function TopNav() {
  return (
    <Box className='absolute inset-y-0 right-0 flex flex-grow-1 invisible lg:visible'>
          {menuItems.map((page) => (
              page.subMenus ? (
                <div className='group' key={page.title}>
                  <Button
                    key={page.title}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                    id='dropdownHoverButton'
                  >
                    <div className='flex flex-column place-items-center'>
                      <Link href={`/pages/${page.navTo}`} className=' text-slate-100 xl:text-2xl text-lg  font-mono hover:font-bold hover:drop-shadow-lg'>{page.title}</Link>                        
                      <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                      </svg>
                    </div>
                  </Button>
                  <div id="dropdownHover" className='invisible group-hover:visible delay-300 bg-slate-900 divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-70'>
                    <ul className='py-2 text-sm text-gray-700 dark:text-gray-200' aria-labelledby="dropdownHoverButton">
                    {page.subMenus.map((submenu, index) => (
                      <li key={index} className='block active:font-semibold px-4 py-2 text-xl text-slate-100 hover:bg-slate-100 hover:text-slate-900'>
                          <Link href={`/pages/${page.title}/${submenu.title}`}>
                              {submenu.title}
                          </Link>
                      </li>
                    ))}
                    </ul>
                  </div>
                </div>
                
              ) : (
                <div key={page.title}>
                  <Button
                    key={page.title}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    <Link href={`/pages/${page.title}`} className='text-slate-100 xl:text-2xl text-lg font-mono hover:font-bold hover:drop-shadow-lg'>{page.title}</Link>
                  </Button>
                </div>
              )
            ))}
          </Box>
  )
}
