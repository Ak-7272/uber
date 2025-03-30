import React, { useState ,useEffect} from 'react'
import {useGSAP} from '@gsap/react'
import gsap from 'gsap'
import axios from 'axios';
import { useRef } from 'react'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel'
import VehiclePanel from '../components/vehiclePanel'
import ConfirmRide from '../components/ConfirmRide'
import LookingForDriver from '../components/LookingForDriver'
import WaitingForDriver from '../components/WaitingForDriver'
import { SocketContext } from '../context/SocketContext';
import { useContext } from 'react';
import { UserDataContext } from '../context/UserContext';


const Home = () => {
  const [pickup, setpickup] = useState('')
  const [destination, setdestination] = useState('')
  
  const [panelOpen, setpanelOpen] = useState(false)
  const panelRef = useRef(null)
  const vehiclePanelRef = useRef(null)
  const confirmRidePanelRef = useRef(null)
  const panelCloseRef= useRef(null)
  const vehicleFoundRef= useRef(null)
  const waitingForDriverRef= useRef(null)

  const [vehiclePanel, setvehiclePanel] = useState(false)
  const [confirmRidePanel, setconfirmRidePanel] = useState(false)
  const [vehicleFound, setvehicleFound] = useState(false)
  const [waitingForDriver, setwaitingForDriver] = useState(false)
  const [ pickupSuggestions, setPickupSuggestions ] = useState([])
  const [ destinationSuggestions, setDestinationSuggestions ] = useState([])
  const [ activeField, setActiveField ] = useState(null)
  const [ fare, setFare ] = useState({})
  const [ vehicleType, setVehicleType ] = useState(null)
  const [ ride, setRide ] = useState(null)


  const { socket } = useContext(SocketContext)
  const { user } = useContext(UserDataContext)



  

  useEffect(() => {
    // if (!socket) return;

    // socket.on("connect", () => {
    //     console.log("Connected to socket");

    //     if (user?._id) {
    //         socket.emit("join", { userId: user._id, userType: "user" });
    //     }
    // });
      console.log(user)

      socket.emit("join", { userId: user._id, userType: "user" });

}, [user]);

  const handlePickupChange = async (e) => {
    setpickup(e.target.value)
    try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
            params: { input: e.target.value },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }

        })
        setPickupSuggestions(response.data)
    } catch (error) {
      // handle error
      console.error('Error fetching pickup suggestions:', error);
    }
  }

  const handleDestinationChange = async (e) => {
    setdestination(e.target.value)
    try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
            params: { input: e.target.value },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        setDestinationSuggestions(response.data)
    } catch {
        // handle error
    }
}




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
  

  useGSAP(function () {
    if (vehiclePanel) {
        gsap.to(vehiclePanelRef.current, {
            transform: 'translateY(0)'
        })
    } else {
        gsap.to(vehiclePanelRef.current, {
            transform: 'translateY(100%)'
        })
    }
}, [ vehiclePanel ])
 
useGSAP(function () {
  if (confirmRidePanel) {
      gsap.to(confirmRidePanelRef.current, {
          transform: 'translateY(0)'
      })
  } else {
      gsap.to(confirmRidePanelRef.current, {
          transform: 'translateY(100%)'
      })
  }
}, [ confirmRidePanel ])

useGSAP(function () {
  if (vehicleFound) {
      gsap.to(vehicleFoundRef.current, {
          transform: 'translateY(0)'
      })
  } else {
      gsap.to(vehicleFoundRef.current, {
          transform: 'translateY(100%)'
      })
  }
}, [ vehicleFound ])

useGSAP(function () {
  if (waitingForDriver) {
      gsap.to(waitingForDriverRef.current, {
          transform: 'translateY(0)'
      })
  } else {
      gsap.to(waitingForDriverRef.current, {
          transform: 'translateY(100%)'
      })
  }
}, [ waitingForDriver ])


async function findTrip() {
  setvehiclePanel(true)
  setpanelOpen(false)

  const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
      params: { pickup, destination },
      headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
      }
  })

  console.log(response.data)
  setFare(response.data)


}

async function createRide() {
  const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
      pickup,
      destination,
      vehicleType
  }, {
      headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
      }
  })


 }

  

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
                  setActiveField('pickup')
                }}
                value={pickup}
                onChange={handlePickupChange}
                className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-5' 
                type="text" 
                placeholder='Add a pick-up location' />
                <input 
                onClick={()=>{
                  setpanelOpen(true)
                  setActiveField('destination')
                }}
                value={destination}
                onChange={handleDestinationChange}
                className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-3' 
                type="text" 
                placeholder='Enter your destination' />
            </form>
            <button
                        onClick={findTrip}
                        className='bg-black text-white px-4 py-2 rounded-lg mt-3 w-full'>
                        Find Trip
                    </button> 
            </div>
            <div ref={panelRef} className=' bg-white h-0'>
              <LocationSearchPanel  
                 suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
                setpanelOpen={setpanelOpen}  setvehiclePanel={setvehiclePanel} 
                setpickup={setpickup}  setdestination={setdestination}
                activeField={activeField}
              />

            </div>
        </div>
        <div ref={vehiclePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
            <VehiclePanel 
             selectVehicle={setVehicleType}
            fare={fare}
            setconfirmRidePanel={setconfirmRidePanel} setvehiclePanel={setvehiclePanel} />
        </div>
        <div ref={confirmRidePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
            <ConfirmRide
            pickup={pickup}
             destination={destination}
            createRide={createRide}
            fare={fare}
            vehicleType={vehicleType}
            setconfirmRidePanel={setconfirmRidePanel} setvehicleFound={setvehicleFound}   />
        </div>
        <div ref={vehicleFoundRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12'>
            <LookingForDriver 
             pickup={pickup}
             destination={destination}
            createRide={createRide}
            fare={fare}
            vehicleType={vehicleType}
            setvehicleFound={setvehicleFound} />
        </div>
        <div ref={waitingForDriverRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
            <WaitingForDriver waitingForDriver={waitingForDriver} />
        </div>

    </div>
  )
}

export default Home