// import { response } from "express";
import React, { useState } from "react";
import { Link , useNavigate } from "react-router-dom";

import { MdVisibility, MdVisibilityOff } from 'react-icons/md';

import axios from 'axios';



function Signup (){
    const navigateTo=useNavigate();
    const [user, setUser ] =useState({
        username:"",
        email:"",
        password:""
        

    })
   

    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };


    function handlechange(event){
        const {name , value }=event.target
        setUser(prevalue=>{
            return{
            ...prevalue,
            [name]:value
        };

        }); }
      async function handlesubmit (event){
        event.preventDefault();
        try{
     const response=await axios.post("http://localhost:3000/signup" ,user)
       if (response.status==200){
        navigateTo("/")
       }
        }catch(error){
            console.log(error)
        }
       }
  
    return(
        <div className="flex items-center justify-center min-h-screen bg-gray-100  ">
            <div className="w-full max-w-sm p-8 bg-white rounded shadow-lg">
                <div>
                <h2 className="mb-6 text-2xl font-semibold text-center text-gray-700">SignUp</h2>
                </div>
              
            <div>
                <form onSubmit={handlesubmit}>
                    <div className="mb-4">
                        <label className="text-gray-600 font-medium text-sm block mb-3">Username</label>
                        <div>
                            <input type="text"
                            name="username"
                            className="border w-full p-2 mb-3 rounded-lg focus:outline-none focus:border-lime-600 "
                            placeholder="Enter your name "
                            value={user.username}
                            onChange={handlechange}
                             />
                        </div>
                        <label className="text-gray-600 font-medium text-sm block mb-3">Email</label>
                        <div>
                            <input type="text"
                            name="email"
                            className="border w-full p-2 mb-3 rounded-lg focus:outline-none focus:border-lime-600"
                            value={user.email}
                            placeholder="Enter your email adress"
                            onChange={handlechange}
                             />
                             
                        </div>
                        <div className="mb-6">
          <label className="block mb-3 text-sm font-medium text-gray-600">Password</label>
          <div className="relative">
            <input
            name="password"
              type={showPassword ? "text" : "password"}
              className="w-full py-2 pl-2 pr-10 border rounded-lg focus:outline-none focus:border-lime-600"
              placeholder="Enter password"
              value={user.password}
              onChange={handlechange}
            />
            
            <button
              type="button"
              className="absolute top-1/2 transform -translate-y-1/2 right-3 text-gray-500"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <MdVisibility /> : <MdVisibilityOff />}
            </button>
            
          </div>
        </div >
                        
                    </div>
                    <div className='flex justify-center'>
        <button className="flex justify-center w-64 py-2 mb-3 text-white bg-green-800 rounded-lg hover:bg-green-700">Sign up</button>
        </div>
           

                </form>
                <div className=" flex justify-center">
                <p>Already have account?</p>
                <h5 className="text-green-800 font-medium"><Link to="/">Login</Link></h5>
              
                </div>
            </div>
            </div>

        </div>
         
         
       
    )
}



export default Signup;