import React, {useState ,useEffect} from "react";
import axios from "axios"
// import { response } from "express";


function Itemlist(){
    const [ itemdata ,setItemdata]=useState([]);
    useEffect(()=>{
        axios.get("http://localhost:3000/item")
        .then(response=>setItemdata(response.data) )
        .catch(error=>
        console.log("error in fetaching", error));

    } ,[]);



  return(
    <itemlist>
        <h2>Item List</h2>
        <table>
            <tr>
                <th>Item Name</th>
                <th> Item Description</th>
                <th> Item price</th>
            </tr>
            {itemdata.map(item=>(
            <tr>
                <th>{item.itemName}</th>
                <th>{item.itemDescription}</th>
                <th>{item.itemPrice}</th>
            </tr>
    ))}
        </table>

    </itemlist>
  )
}
export default Itemlist;