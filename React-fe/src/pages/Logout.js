import React, { useEffect, useState } from "react";
import { useUserContext } from "../context/user_context";
import { useNavigate } from 'react-router-dom';
import { Loading } from "../components";



const Logout = () => {

  const navigate = useNavigate();
  const { logout } = useUserContext();

  
  useEffect(()=>{
    logout();
    setTimeout(() => {
      return navigate('/') ;
    }, 1000)
  },[])
  


  return (
    <div className="min-h-full">
      <Loading/>
    </div>
  );
};

export default Logout;
