import React from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import{ Box, Button, IconButton } from '@mui/material';
import Link from 'next/link';
import { navigationList } from '@/app/utils/staticData/navigationList';

// A top navigation bar - loosely based on Material UI header components

export default function SideNav() {
    const [menuOpen, setMenuOpen] = React.useState(false)
    const [subMenu, setSubMenu] = React.useState(false)
  
    const handleMenu = () => {
      setMenuOpen(!menuOpen)
    }
  
    const handleSubMenu = () => {
      setSubMenu(!subMenu)
    }
  
  return (
    <Box className="absolute inset-y-0 right-2 visible lg:invisible">
      <IconButton
        size="large"
        id='burger-button'
        onClick={handleMenu}
        className='m-2 text-slate-100 hover:bg-slate-700'
      >
      <MenuIcon />
      </IconButton>
          
      <div className={
          menuOpen
          ? "fixed pt-16 p-10 right-0 top-0 h-screen w-screen sm:w-[45%] lg:hidden bg-slate-900 ease-in-out duration-300 border-l-2 border-slate-800"
          : "fixed pt-16 p-10 left-[-100%] top-0 ease-in-out duration-300"}>
        <CloseIcon onClick={() => {handleMenu(); setSubMenu(false)}} className='m-2 p-2 absolute top-4 right-4 sm:right-8 text-5xl text-slate-100 hover:bg-slate-700 hover:rounded-3xl cursor-pointer'></CloseIcon>
        {navigationList.map((page) => (
          page.subMenus ? (
          <div key={page.title} className='group'>
            <Button
              key={page.title}
              sx={{ my: 2, color: 'white', display: 'block' }}
              id='dropdownHoverButton'
              onClick={handleSubMenu}
              >
              <div className='flex flex-column place-items-center' >
                <Link href={`/pages/${page.navTo}`} className='text-slate-100 text-xl font-mono hover:font-bold hover:drop-shadow-lg'>{page.title}</Link>                        
                <svg className={`w-2.5 h-2.5 ms-3 ${subMenu && 'rotate-180'}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
                </svg>
              </div>
            </Button>
            {subMenu && 
            <div id="dropdownHover" className='delay-300 bg-slate-900 divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-70'>
              <ul className='py-2 text-sm text-gray-700 dark:text-gray-200' aria-labelledby="dropdownHoverButton">
              {page.subMenus.map((submenu, index) => (
                <li key={index} className='block active:font-semibold px-4 py-2 text-xl text-slate-100 hover:bg-slate-100 hover:text-slate-900'>
                    <Link href={`/pages/${page.title}/${submenu.title}`} onClick={() => {handleMenu(); setSubMenu(false)}}>
                        {submenu.title}
                    </Link>
                </li>
              ))}
              </ul>
            </div>
            }
          </div>

          ) : (
            <div  key={page.title}>
              <Button
              key={page.title}
              onClick={() => {handleMenu(); setSubMenu(false)}}
              sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <Link href={`/pages/${page.title}`} className='text-slate-100 text-xl font-mono hover:font-bold hover:drop-shadow-lg'>{page.title}</Link>
              </Button>
            </div>
          )
      ))}
      </div>
    </Box>
  )
}
