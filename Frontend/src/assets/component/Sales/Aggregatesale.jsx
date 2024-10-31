import React, { useState, useEffect } from "react";
import axios from "axios";

function Aggregatesale() {
    const [total, setAggregate] = useState({});

    useEffect(() => {
        axios.get("http://localhost:3000/aggregateSale")
            .then(response => setAggregate(response.data))
            .catch(error =>
                console.log("Error fetching final sale data: ", error)
            );
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                <h4 className="text-xl font-semibold mb-4">Customer Name: {total.customerName}</h4>
                <ul className="mb-4">
                    {total.items && total.items.map((item, index) => (
                        <li key={index} className="border-b py-2">
                            <p>{item.itemName} ----- {item.quantity} * ${item.itemPrice}</p>
                        </li>
                    ))}
                </ul>
                <h3 className="text-lg font-semibold">Total Price: ${total.Price}</h3>
                <h3 className="text-lg font-semibold">Tax Rate: {total.taxRate}%</h3>
                <h3 className="text-lg font-semibold">Paid: ${total.totalPrice}</h3>
            </div>
        </div>
    );
}

export default Aggregatesale;
