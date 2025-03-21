import React from 'react'

const LocationSearchPanel = (props) => {

  const locations=[
    "24 B, near Police station, Ranchi",
    "2 C, near Cafe, Ranchi",
    "21 B, near railway station, Ranchi"
  ]


  return (
    <div>
        {
          locations.map(function(elem,idx){
            return  <div key={idx} onClick={()=>{
              props.setvehiclePanel(true)
              props.setpanelOpen(false)
            }} className='flex gap-4 border-2 p-3 border-gray-100 active:border-black rounded-xl  items-center justify-start my-2'>
            <h2 className='bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full'><i className="ri-map-pin-fill"></i></h2>
        
            <h4 className='font-medium'>{elem}</h4>
          </div>
          })
        }

       
    </div>
  )
}

export default LocationSearchPanel