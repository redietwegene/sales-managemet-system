import React from 'react';
import { Link } from 'react-router-dom';

function Homepage() {
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100  ">
    <div className="w-full max-w-sm p-8 bg-white rounded shadow-lg">
      <div className='flex justify-center text-3xl mb-4' >
      <h1>Welcome</h1> 
      </div>
      <nav>
        <ul>
          <li   className="w-full py-2 pl-2 pr-10  text-green-900 font-semibold">
            <Link to="/createCustomer">Create Customer</Link>
          </li>
          <li  className="w-full py-2 pl-2 pr-10  text-green-900 font-semibold">
            <Link to="/createSale">Create Sale</Link>
          </li>
          <li  className="w-full py-2 pl-2 pr-10  text-green-900 font-semibold"   >
            <Link to="/createItem">Create Item</Link>
          </li>
        </ul>
      </nav>
    </div>
    </div>
  );
}

export default Homepage;
