'use client';
import * as React from 'react';
import{AppBar, Toolbar, Container} from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
import SideNav from '../SideNav';
import TopNav from '../TopNav';

function Header(){

  return (
    <AppBar position="sticky"  sx={{background:'rgb(15 23 42)'}} className='bg-slate-900 w-full'>
      <Container maxWidth="xl" className='flex flex-col w-screen h-36 pt-12 pb-2'>
        <Toolbar disableGutters>
        <Link href="/" className='mr-4 pr-2 absolute'>  
            <Image
                src="/static/ofdt5.svg"
                 height={0}
                width={0}
                style={{width:'86px', height: "auto" }}
                alt="Oslofjord DT"
                priority={true}
            />
        </Link>  
        
        <Link href="/" className='invisible font-light sm:visible text-2xl l:text-3xl xl:text-4xl object-fit inline-block xl:pb-2 ml-28 bg-clip-text text-transparent bg-slate-100 hover:bg-gradient-to-r hover:from-orange-400 via-20% to-slate-100 to-80%'>
          Oslo Fjord Climate Barometer
        </Link>
    
        {/* Small screens side bar navigation */}
        <SideNav/>

        {/*Large screen top bar navigation */} 
        <TopNav/>
      
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;