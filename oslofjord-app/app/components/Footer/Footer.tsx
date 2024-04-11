import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

function Footer() {
  return (
    <footer className='footer w-screen mt-4 bg-slate-200'>
        <div className='flex flex-col'>
          <Link href="https://www.mn.uio.no/ifi/" className='font-small bg-clip-text w-fit h-fit'>
            <Image
                src="/static/uiologo.svg"
                height={0}
                width={0}
                style={{width:'360px', height: "auto" }}
                alt="Oslofjord DT"
            />
          </Link> 
          <p className='text-start mb-12 ml-16 font-normal max-w-sm text-slate-900'>
              Oslo Fjord Climate Barometer is a project developed at 
              the Department of Informatics, University of Oslo. 
          </p>
        </div>
    </footer>
  )
}

export default Footer