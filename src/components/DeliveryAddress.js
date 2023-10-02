import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'

const DeliveryAddress = () =>{
    
    const setAddress = useRef()
    const setCity = useRef()
    const setPostal = useRef()
    const setCountry = useRef()
    const navigate = useNavigate()

    const formHandler = () => (e) => {
          e.preventDefault()
          const DeliveryData = {
            address: setAddress.current.value,
            city: setCity.current.value,
            postal_code: setPostal.current.value,
            country: setCountry.current.value
        }
          localStorage.setItem('delivery', JSON.stringify(DeliveryData))
          navigate('pay')
        }

    return(
        <div className='rounded-lg bg-[#9EDDFF] p-3 w-[400px]'>
            <h4 className='font-semibold text-center'>Delivery Address</h4>
            <form onSubmit={formHandler()}>
                <input placeholder='Enter Address' ref={setAddress} className='rounded-lg w-full h-10 mb-5 p-1' required></input>
                <input placeholder='City' ref={setCity} className='rounded-lg w-full h-10 mb-5 p-1' required></input>
                <input placeholder='Postal Code' ref={setPostal} className='rounded-lg w-full h-10 mb-5 p-1' required></input>
                <input placeholder='Country' ref={setCountry} className='rounded-lg w-full h-10 mb-5 p-1' required></input>
                <button className='btn' type='submit'>Continue</button>
            </form>
        </div>
    )
}

export default DeliveryAddress