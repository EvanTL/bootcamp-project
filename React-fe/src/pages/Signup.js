import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../context/user_context";
import { Loading } from "../components";
import { useNavigate   } from 'react-router-dom';



const Signup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { userState, register } = useUserContext();

  const submitHandler = async (e) => {
    e.preventDefault();
    await register(name, email, password);
    if (userState.message === "Signup success"){
      navigate('/login')
    }
  };

  
  useEffect(()=>{
    if(userState.token){
      navigate("/");
    }
  },[userState])
  


  return (
    
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 mt-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company"/>
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Let's create your account</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        { 
          userState.error ? 
          (
            <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
              {userState.error}
            </div>
           ) : null
        }
        {userState.loading && <Loading />}
        <form className="space-y-6" action="#" method="POST" onSubmit={submitHandler}>
          <div>
          <label for="name" className="block text-sm font-medium leading-6 text-gray-900">Name</label>
            <div class="mt-2">
              <input id="name" name="name" type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>
          <div>
            <label for="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
            <div class="mt-2">
              <input id="email" name="email" type="email" autocomplete="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label for="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
              <div class="text-sm">
                <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
              </div>
            </div>
            <div className="mt-2">
              <input id="password" name="password" type="password" autocomplete="current-password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
          </div>

          <div>
            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Already have an account?
            <Link to='/login' className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Login
            </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
