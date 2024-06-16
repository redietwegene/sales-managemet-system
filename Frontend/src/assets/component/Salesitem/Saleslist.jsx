import React, { useEffect, useState } from "react";
import axios from 'axios';


function Saleslist() {
    const [salesItem, setSalesitem] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/getsales")
            .then(response => setSalesitem(response.data))
            .catch(error =>
                console.log("Error fetching sales list ", error)
            );
    }, []);

    return (
        <customerlist>
            <h2>Sales </h2>
            <table>
               
                    <tr>
                        <th>Customer Name</th>
                        <th>Item Name</th>
                        <th>Item Desciption</th>
                        <th>Item Price</th>
                        <th>Quantity</th>
                        <th>Total Price</th>
                    </tr>
                
               
                    {salesItem.map(item => (
                        <tr key={item.id}>
                            <td>{item.customerName}</td>
                            <td>{item.itemName}</td>
                            <td>{item.itemDescription}</td>
                            <td>{item.itemPrice}</td>
                            <td>{item.quantity}</td>
                            <td>{item.totalPrice}</td>
                        </tr>
                    ))}
                
            </table>
           
        </customerlist>
    );
}

export default Saleslist;
