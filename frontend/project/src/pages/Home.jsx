import React, { useState } from 'react'
import {useGSAP} from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel'

const Home = () => {
  const [pickup, setpickup] = useState('')
  const [destination, setdestination] = useState('')
  
  const [panelOpen, setpanelOpen] = useState(false)
  const panelRef = useRef(null)
  const panelCloseRef= useRef(null)
  
  
  const submitHandler = (e) => {
    e.preventDefault()
    
  }

  useGSAP(function(){
   if(panelOpen){
     gsap.to(panelRef.current,{
      height :'70%',
      padding:24
     })
     gsap.to(panelCloseRef.current,{
        opacity:1
     })
   }
   else{
     gsap.to(panelRef.current,{
      height :'0%',
      padding:0
     });
     gsap.to(panelCloseRef.current,{
        opacity:0
     })
   }
  },[panelOpen])
  

  

  return (
    <div className='h-screen relative overflow-hidden'>
         <img className='w-16 absolute left-5 top-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
    
        <div className='h-screen w-screen'>
            <img className='h-full w-full object-cover' src="https://s.wsj.net/public/resources/images/BN-XR452_201802_M_20180228165525.gif" alt="" />
        </div>
        <div className='flex flex-col justify-end h-screen absolute top-0 w-full '>
            <div className='h-[30%] p-6 bg-white relative'>
              <h5 ref={panelCloseRef} onClick={()=>{
                setpanelOpen(false)
              }} 
              className='absolute opacity-0 right-6 top-6 text-2xl'>
              <i className="ri-arrow-down-wide-line"></i>
              </h5>
            <h4 className='text-3xl font-semibold'>Find a trip</h4>
            <form onSubmit={(e)=>{
              submitHandler(e)
            }}>
                <div className="line absolute h-16 w-1 top-[38%] left-10 bg-gray-900 rounded-full"></div>
                <input 
                onClick={()=>{
                  setpanelOpen(true)
                }}
                value={pickup}
                onChange={(e)=>{
                  setpickup(e.target.value)
                }}
                className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-5' 
                type="text" 
                placeholder='Add a pick-up location' />
                <input 
                onClick={()=>{
                  setpanelOpen(true)
                }}
                value={destination}
                onChange={(e)=>{
                  setdestination(e.target.value)
                }}
                className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-3' 
                type="text" 
                placeholder='Enter your destination' />
            </form>
            </div>
            <div ref={panelRef} className=' bg-white h-0'>
              <LocationSearchPanel/>

            </div>
        </div>
        <div className='fixed w-full z-10 bottom-10 bg-white px-3 py-6'>
                <h3 className='text-2xl font-semibold mb-5'>Choose a Vehicle</h3>
                <div className='flex border-2  active:border-black   mb-2 rounded-xl w-full p-3  items-center justify-between'>
                  <img className='h-10' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1712027307/assets/42/eb85c3-e2dc-4e95-a70d-22ee4f08015f/original/Screenshot-2024-04-01-at-9.08.07p.m..png" alt="" />
                  <div className='ml-2 w-1/2'>
                    <h4 className='font-medium text-sm'>UberGo <span><i className='ri-user-3-fill'></i>4</span></h4>
                    <h5 className='font-medium text-sm'>2 mins away</h5>
                    <p className='font-normal text-xs text-gray-600'>Affordable,compact ride</p>
                  </div>
                  <h2 className='text-xl font-semibold'>Rs 193.20</h2>
                </div>
                <div className='flex border-2  active:border-black   mb-2 rounded-xl w-full p-3  items-center justify-between'>
                  <img className='h-10' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" alt="" />
                  <div className=' ml-2 w-1/2'>
                    <h4 className='font-medium text-sm'>UberAuto <span><i className='ri-user-3-fill'></i>4</span></h4>
                    <h5 className='font-medium text-sm'>2 mins away</h5>
                    <p className='font-normal text-xs text-gray-600'>Affordable,compact ride</p>
                  </div>
                  <h2 className='text-xl font-semibold'>Rs 63.00</h2>
                </div>
                <div className='flex border-2 active:border-black    mb-2 rounded-xl w-full p-3  items-center justify-between'>
                  <img className='h-10' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" alt="" />
                  <div className=' ml-2 w-1/2'>
                    <h4 className='font-medium text-sm'>Moto <span><i className='ri-user-3-fill'></i>1</span></h4>
                    <h5 className='font-medium text-sm'>1 min away</h5>
                    <p className='font-normal text-xs text-gray-600'>Affordable,compact ride</p>
                  </div>
                  <h2 className='text-xl font-semibold'>Rs 93.20</h2>
                </div>

        </div>
    </div>
  )
}

export default Home