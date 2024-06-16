
import React ,{useState} from "react";
import { useNavigate } from "react-router-dom";
import axios  from "axios";

function Createnewitem(){
    const navigateTo = useNavigate();
    const[ addITem , setAdditem ]= useState({
        itemName:"",
        itemDescription:"",
        itemPrice:""

    })
    function handlechange(event){
        const {name , value }=event.target
        setAdditem(prevalue=>{
            return{
            ...prevalue,
            [name]:value
        };

        }); }
      async function handlesubmit (event){
        event.preventDefault();
        try{
        const response = await axios.post("http://localhost:3000/addITem" ,addITem);
        if (response.status==200){
            navigateTo("/itemlist")
        }
        }catch(error){
            alert("error in fetching item")
        }
        
        }
        
    


    return(
        <createitem>
            <div>
            <h2>Add Item</h2>
    <form onSubmit={handlesubmit}>
        <label for="itemName">Item Name:</label><br/>
        <input  onChange ={handlechange}type="text" id="itemName" name="itemName" value={addITem.itemName} required/><br/>

        <label for="itemDescription">Item Description:</label><br/>
        <textarea onChange={handlechange} id="itemDescription" name="itemDescription" value={addITem.itemDescription} required></textarea><br/>

        <label for="itemPrice">Item Price:</label><br/>
        <input onChange={handlechange} type="number" id="itemPrice" name="itemPrice" step="0.01" value={addITem.itemPrice} required/><br/>

        <button type="submit">Submit</button>
    </form>

            </div>
         
  
        </createitem>

    )
}


export default Createnewitem;