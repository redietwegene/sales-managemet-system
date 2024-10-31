import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

function Sales() {
    const [itemsInSale, setSalesitem] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/createsale")
            .then(response => setSalesitem(response.data))
            .catch(error =>
                console.log("Error fetching sales items: ", error)
            );
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <h2 className="mb-4 text-2xl font-semibold text-gray-700">Sales Items</h2>
            <div className="overflow-x-auto w-full max-w-3xl bg-white rounded-lg shadow-lg">
                <table className="min-w-full">
                    <thead className="bg-green-800 text-white">
                        <tr>
                            <th className="py-2 text-left">Customer Name</th>
                            <th className="py-2 text-left">Item Name</th>
                            <th className="py-2 text-left">Item Price</th>
                            <th className="py-2 text-left">Quantity</th>
                            <th className="py-2 text-left">Total Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {itemsInSale.length > 0 ? (
                            itemsInSale.map(item => (
                                <tr key={item.id} className="border-b hover:bg-gray-100">
                                    <td className="py-2 px-4">{item.customerName}</td>
                                    <td className="py-2 px-4">{item.itemName}</td>
                                    <td className="py-2 px-4">{item.itemPrice}</td>
                                    <td className="py-2 px-4">{item.quantity}</td>
                                    <td className="py-2 px-4">{item.totalPrice}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="py-4 text-center text-gray-500">No sales items found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="mt-4">
                <Link to="/createSale">
                    <button className="mr-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500">Add Other Item</button>
                </Link>
                <Link to="/aggregatesale">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500">Aggregate Sale</button>
                </Link>
            </div>
        </div>
    );
}

export default Sales;
