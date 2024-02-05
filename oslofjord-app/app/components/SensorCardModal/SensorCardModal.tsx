import React from 'react'

interface ModalProps {
    type: string;
    text: string;
}


function SensorCardModal(props: ModalProps) {
  return (
    // Main modal : inspired by Flowbite's modal https://flowbite.com/docs/components/modal/
    <div id="default-modal" className=" justify-center items-center">
        <div className="relative p-4 w-full max-w-2xl ">
            {/*<!-- Modal content -->*/}
            <div className="relative bg-slate-100 rounded-lg shadow-sm shadow-neutral-200 border border-slate-400 ">
                {/*<!-- Modal header -->*/}
                <div className="flex items-center justify-between p-4 md:p-5 border-b  border-slate-400 rounded-t">
                    <h3 className="text-xl font-semibold text-slate-900">
                        {props.type}
                    </h3>
        
                </div>
                {/*<!-- Modal body -->*/}
                <div className="p-4 md:p-5 space-y-4">
                    <p className="text-base leading-relaxed text-slate-700">
                        Shows real-time measurement of {props.type.toLocaleLowerCase()}.
                    </p>
                    <p className="text-base leading-relaxed text-slate-700">
                        {props.text}
                    </p>
                </div>
                {/*<!-- Modal footer -->*/}
                <div className="flex items-center p-4 md:p-5 border-t border-slate-400 rounded-b">
                </div>
            </div>
         </div>
    </div>
  )
}

export default SensorCardModal