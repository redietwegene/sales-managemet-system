import React, { useEffect, useState } from "react";
import {Link ,useNavigate} from "react-router-dom"
import axios from 'axios';


function Sales() {
    const [itemsInSale, setSalesitem] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/createsale")
            .then(response => setSalesitem(response.data))
            .catch(error =>
                console.log("Error fetching customer list ", error)
            );
    }, []);

   
    return (
        <customerlist>
            <h2>Sales item</h2>
            <table>
               
                    <tr>
                        <th>Customer Name</th>
                        <th>Item Name</th>
                        <th>Item Price</th>
                        <th>Quantity</th>
                        <th>Total Price</th>
                    </tr>
                
               
                    {itemsInSale.map(item => (
                        <tr key={item.id}>
                            <td>{item.customerName}</td>
                            <td>{item.itemName}</td>
                            <td>{item.itemPrice}</td>
                            <td>{item.quantity}</td>
                            <td>{item.totalPrice}</td>
                        </tr>
                    ))}
                
            </table>
            <Link to ="/createSale">ADD OTHER ITEM   </Link>
          

          <Link to ="/aggregatesale"> <button>Aggregate Sale </button> </Link>

     
        </customerlist>
    );
}

export default Sales;
