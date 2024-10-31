import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { addCustomers } from "../../../redux/Reducer";
import { useDispatch } from "react-redux";

function Createcustomer() {
    const navigateTo = useNavigate();
    const dispatch = useDispatch();
    const [newCustomer, setNewcustomer] = useState({
        name: "",
        TIN: "",
        phoneNumber: "",
        address: "",
        contactPerson: ""
    });

    function handleChange(event) {
        const { name, value } = event.target;
        setNewcustomer((prevValue) => {
            return {
                ...prevValue,
                [name]: value
            };
        });
    }

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/createCustomer", newCustomer);
            if (response.status === 200) {
                dispatch(addCustomers(response.data));
                navigateTo("/customerlist");
            }
        } catch (error) {
            alert("Error in fetching customer list");
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-lg p-8 bg-white rounded shadow-lg">
                <h1 className="mb-6 text-2xl font-semibold text-center text-gray-700">Create Customer</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-600">Name:</label>
                        <input
                            onChange={handleChange}
                            type="text"
                            id="name"
                            name="name"
                            value={newCustomer.name}
                            required
                            className="w-full py-2 pl-2 border rounded-lg focus:outline-none focus:border-lime-600"
                            placeholder="Enter customer's name"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="TIN" className="block mb-2 text-sm font-medium text-gray-600">TIN:</label>
                        <input
                            onChange={handleChange}
                            type="text"
                            id="TIN"
                            name="TIN"
                            value={newCustomer.TIN}
                            required
                            className="w-full py-2 pl-2 border rounded-lg focus:outline-none focus:border-lime-600"
                            placeholder="Enter customer's TIN"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="phoneNumber" className="block mb-2 text-sm font-medium text-gray-600">Phone Number:</label>
                        <input
                            onChange={handleChange}
                            type="text"
                            id="phoneNumber"
                            name="phoneNumber"
                            value={newCustomer.phoneNumber}
                            required
                            className="w-full py-2 pl-2 border rounded-lg focus:outline-none focus:border-lime-600"
                            placeholder="Enter customer's phone number"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-600">Address:</label>
                        <textarea
                            onChange={handleChange}
                            id="address"
                            name="address"
                            rows="4"
                            required
                            value={newCustomer.address}
                            className="w-full py-2 pl-2 border rounded-lg focus:outline-none focus:border-lime-600"
                            placeholder="Enter customer's address"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="contactPerson" className="block mb-2 text-sm font-medium text-gray-600">Contact Person:</label>
                        <input
                            onChange={handleChange}
                            type="text"
                            id="contactPerson"
                            name="contactPerson"
                            required
                            value={newCustomer.contactPerson}
                            className="w-full py-2 pl-2 border rounded-lg focus:outline-none focus:border-lime-600"
                            placeholder="Enter contact person's name"
                        />
                    </div>

                    <div className="flex justify-center">
                        <button type="submit" className="flex justify-center w-64 py-2 text-white bg-green-800 rounded-lg hover:bg-green-700">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Createcustomer;
