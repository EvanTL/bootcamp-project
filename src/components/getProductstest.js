import React, { useEffect, useState } from 'react';
import Loading from './Loading';

export default function GetProducts(){
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    async function fetchData() {
        await fetch('http://localhost:8000/shop/product/65424e6b05ae1764ef3710e8',{
            crossDomain: true,
        })
        .then(response => response.json())
        .then(data => {
            setProduct(data)
            setError(null)
            console.log(product)
        })
        .catch(err => {
            setError(err.message)
            console.log(error)
            setProduct(null)
        })
        .finally(() => {
            setLoading(false)
        })
    }

    useEffect(() => {
        fetchData()
    })

    if(loading){
        return <Loading/>
    }

    
}