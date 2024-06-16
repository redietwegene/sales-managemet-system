import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useDispatch,useSelector} from "react-redux";
import { getCustomer } from "../../../redux/Reducer";



function Customerlist() {

    const dispatch = useDispatch()
    const customer=useSelector(state => state.customers.customers)
    // const [customerData, setCustomerdata] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/customer")
            .then(response => {
                // setCustomerdata(response.data);
                dispatch(getCustomer(response.data))
            })
            
            .catch((error) => {
                console.log("Error fetching customer list", error);
            });
    }, []);
     return (
        <div className="customerlist">
            <h2>Customer List</h2>
            <table>
                <thead>
                    <tr>
                        <th>Customer Name</th>
                        <th>TIN</th>
                        <th>Phone Number</th>
                        <th>Address</th>
                        <th>Contact Person</th>
                    </tr>
                </thead>
                <tbody>
                    
                    {customer.map(item => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.TIN}</td>
                            <td>{item.phoneNumber}</td>
                            <td>{item.address}</td>
                            <td>{item.contactPerson}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Customerlist;
