import React from 'react'

interface TitleProps {
  title: string;
}

// A title component that can be reused for website pages

function MainTitle( props: TitleProps ) {
  return (
    <div className="h-96 mx-auto text-center justify-center flex flex-col font-semibold leading-7">
        <h1 className="text-4xl md:text-5xl lg:text-6xl tracking-wide text-zinc-100"> {props.title} </h1>
    </div>
  )
}

export default MainTitle