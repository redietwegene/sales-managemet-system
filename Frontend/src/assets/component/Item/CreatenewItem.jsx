import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Createnewitem() {
    const navigateTo = useNavigate();
    const [addItem, setAdditem] = useState({
        itemName: "",
        itemDescription: "",
        itemPrice: ""
    });

    function handleChange(event) {
        const { name, value } = event.target;
        setAdditem((prevValue) => {
            return {
                ...prevValue,
                [name]: value
            };
        });
    }

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/addITem", addItem);
            if (response.status === 200) {
                navigateTo("/itemlist");
            }
        } catch (error) {
            alert("Error in fetching item");
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-lg p-8 bg-white rounded shadow-lg">
                <h2 className="mb-6 text-2xl font-semibold text-center text-gray-700">Add Item</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="itemName" className="block mb-2 text-sm font-medium text-gray-600">Item Name:</label>
                        <input
                            onChange={handleChange}
                            type="text"
                            id="itemName"
                            name="itemName"
                            value={addItem.itemName}
                            required
                            className="w-full py-2 pl-2 border rounded-lg focus:outline-none focus:border-lime-600"
                            placeholder="Enter item name"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="itemDescription" className="block mb-2 text-sm font-medium text-gray-600">Item Description:</label>
                        <textarea
                            onChange={handleChange}
                            id="itemDescription"
                            name="itemDescription"
                            value={addItem.itemDescription}
                            required
                            className="w-full py-2 pl-2 border rounded-lg focus:outline-none focus:border-lime-600"
                            placeholder="Enter item description"
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="itemPrice" className="block mb-2 text-sm font-medium text-gray-600">Item Price:</label>
                        <input
                            onChange={handleChange}
                            type="number"
                            id="itemPrice"
                            name="itemPrice"
                            step="0.01"
                            value={addItem.itemPrice}
                            required
                            className="w-full py-2 pl-2 border rounded-lg focus:outline-none focus:border-lime-600"
                            placeholder="Enter item price"
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

export default Createnewitem;
