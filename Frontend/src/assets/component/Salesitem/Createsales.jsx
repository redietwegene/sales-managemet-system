import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Createsales() {
    const navigateTo = useNavigate();
    const [newSale, setNewsale] = useState({
        customerName: "",
        itemName: "",
        quantity: ""
    });
    const [customerData, setCustomerdata] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState(customerData);
    const [searchItem, setSearchItem] = useState("");
    const [itemData, setItems] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/customer")
            .then(response => setCustomerdata(response.data))
            .catch(error => console.log("Error fetching customer list", error));
        axios.get("http://localhost:3000/item")
            .then(response => setItems(response.data))
            .catch(error => console.error('Error fetching items:', error));
    }, []);

    function handleChange(event) {
        const searchTerm = event.target.value;
        setSearchItem(searchTerm);
        const { name, value } = event.target;

        const filteredItems = customerData.filter((customer) =>
            customer.name.toLowerCase().startsWith(searchTerm.toLowerCase())
        );

        setFilteredUsers(filteredItems);
        setNewsale(prevValue => ({
            ...prevValue,
            [name]: value
        }));
    }

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/createSale", newSale);
            if (response.status === 200) {
                navigateTo("/sales");
            }
        } catch (error) {
            alert("Customer name is not found");
        }
    }

    const onSearch = (searchTerm) => {
        setSearchItem(searchTerm);
        setNewSale(prevValue => ({
            ...prevValue,
            customerName: searchTerm
        }));
        setFilteredUsers([]); // Clear filtered users after selection
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-lg p-8 bg-white rounded shadow-lg">
                <h1 className="mb-6 text-2xl font-semibold text-center text-gray-700">Create Sales</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="customerName" className="block mb-2 text-sm font-medium text-gray-600">Customer Name:</label>
                        <input
                            onChange={handleChange}
                            type="text"
                            id="customerName"
                            name="customerName"
                            placeholder="Search customer name"
                            value={searchItem}
                            required
                            className="w-full py-2 pl-2 border rounded-lg focus:outline-none focus:border-lime-600"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="itemName" className="block mb-2 text-sm font-medium text-gray-600">Item:</label>
                        <select
                            onChange={handleChange}
                            id="itemName"
                            name="itemName"
                            required
                            className="w-full py-2 border rounded-lg focus:outline-none focus:border-lime-600"
                        >
                            <option value="">Select Item</option>
                            {itemData.map(item => (
                                <option key={item._id} value={item.itemName}>{item.itemName}</option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-gray-600">Quantity:</label>
                        <input
                            onChange={handleChange}
                            type="number"
                            id="quantity"
                            name="quantity"
                            min="1"
                            required
                            className="w-full py-2 pl-2 border rounded-lg focus:outline-none focus:border-lime-600"
                        />
                    </div>

                    <div className="flex justify-center mb-4">
                        <button type="submit" className="flex justify-center w-full py-2 text-white bg-green-800 rounded-lg hover:bg-green-700">Add Item</button>
                    </div>
                </form>

                <h1 className="mt-4 text-center">
                    <Link to="/salesitem" className="text-blue-600 hover:underline">See Sales List</Link>
                </h1>

                <div className="mt-4">
                    {filteredUsers.length > 0 && (
                        <div className="absolute z-10 w-full mt-1 bg-white border rounded-lg shadow-lg">
                            {filteredUsers.map(customer => (
                                <div
                                    onClick={() => onSearch(customer.name)}
                                    className="cursor-pointer p-2 hover:bg-gray-100"
                                    key={customer._id}
                                >
                                    {customer.name}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Createsales;
