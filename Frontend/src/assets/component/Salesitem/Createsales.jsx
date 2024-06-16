import React, { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";



function Createsales (){
    const navigateTo=useNavigate();
    const [newSale , setNewsale]= useState({
        customerName:"",
        itemName:"",
        quantity:""

    })
    const [customerData,setCustomerdata]=useState([]);
        const [filteredUsers, setFilteredUsers] = useState(customerData)
        const [searchItem,setSearchItem]=useState("");
        const [itemData, setItems] = useState([]);

        useEffect(() => {
     
            axios.get("http://localhost:3000/customer")
            .then(response => setCustomerdata(response.data))
            .catch(error =>
                console.log("Error fetching customer list ", error)
            );
            axios.get("http://localhost:3000/item")
                .then(response => setItems(response.data))
                .catch(error => console.error('Error fetching items:', error));
        }, []);
        
        function handlechange(event){
            const searchTerm = event.target.value;
            setSearchItem(searchTerm)
            const {name , value }=event.target
            const filteredItems = customerData.filter((customerData) =>
            customerData.name.toLowerCase().startsWith(searchTerm.toLowerCase())
            );
        
            setFilteredUsers(filteredItems);
            setNewsale(prevalue=>{
                return{
                ...prevalue,
                [name]:value
            };
    
    
            }); }

        async function handlesubmit (event){
            event.preventDefault();
          try{
            const response=await  axios.post("http://localhost:3000/createSale", newSale); 
          if (response.status===200){
            navigateTo("/sales")
          }
          
          }catch(error){
            alert("Customer name is not found")
        }
            
           }
           const onSearch = (searchTerm) => {
            setSearchItem(searchTerm);
            setNewSale(prevValue => ({
                ...prevValue,
                customerName: searchTerm
            }));
        };
    
    return(

        <createsales>
            <div>
                <h1>Create Sales</h1>
                <form onSubmit={handlesubmit}>
                <label for="customerName">Customer Name:</label>
            <input onChange={handlechange} type="text" id="customerName" name="customerName"
              placeholder="serch customer name" value={searchItem}required/>
            
            <label htmlFor="itemName">Item:</label><br/>
                <select  onChange={handlechange} id="itemName" name="itemName" required>
                    <option value="">Select Item</option>
                    {itemData.map(item => (
                        <option key={item._id} value={item.itemName}>{item.itemName}</option>
                    ))}
                </select><br/>
                <label for="quantity">Quantity:</label>
               <input onChange={handlechange} type="number" id="quantity" name="quantity" min="1" required/>
                <button type="submit">Add Item</button>
              <h1> <Link to="/salesitem">see sales list</Link></h1>
                

                </form>
                <div className="dropdown">
                   { filteredUsers.map(customer=> 
                  <div  onClick={()=>onSearch(customer.name)}  className="dropdown-row" key={customer._id}>{customer.name}</div>
                    )}
                </div>
            </div>
        </createsales>
    )
}


export default Createsales;



