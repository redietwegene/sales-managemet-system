import React ,{useState} from "react";
import {  useNavigate } from "react-router-dom";
import axios  from "axios";
import { addCustomers } from "../../../redux/Reducer";
import { useDispatch } from "react-redux";

function Createcustomer(){
    const navigateTo=useNavigate();
    const dispatch=useDispatch()
    const[ newCustomer , setNewcustomer ]= useState({
        name:"",
        TIN:"",
        phoneNumber:"",
        address:"",
        contactPerson:""

    })
    function handlechange(event){
        const {name , value }=event.target
        setNewcustomer(prevalue=>{
            return{
            ...prevalue,
            [name]:value
        };

        }); }
      async function handlesubmit (event){
        event.preventDefault();
        try{
            const response = await axios.post("http://localhost:3000/createCustomer" ,newCustomer);
            if (response.status== 200){
                dispatch(addCustomers(response.data))
                navigateTo("/customerlist")
            }
        }catch(error){
            alert("error in fetching customer list")
        }
        
        
       }


    return(
        <createcustomer>
            <div>
            <h1>Create Customer</h1>
            <form onSubmit={handlesubmit}>
            <label for="name">Name:</label><br/>
        <input onChange={handlechange} type="text" id="name" name="name" value={newCustomer.name}required/><br/>
        
        <label for="TIN">TIN:</label><br/>
        <input onChange={handlechange} type="text" id="TIN" name="TIN"    value={newCustomer.TIN} required /><br/>
        
        <label for="phoneNumber">Phone Number:</label><br/>
        <input onChange={handlechange} type="text" id="phoneNumber" name="phoneNumber"  value={newCustomer.phoneNumber}required /><br/>
        
        <label for="address">Address:</label><br/>
        <textarea onChange={handlechange}id="address" name="address" rows="4" required value={newCustomer.address}></textarea><br/>
        
        <label for="contactPerson">Contact Person:</label><br/>
        <input onChange={handlechange} type="text" id="contactPerson" name="contactPerson" required value={newCustomer.contactPerson} /><br/>
        
        <button type="submit">Submit</button>
            </form>

            </div>
         
  
        </createcustomer>

    )
}


export default Createcustomer