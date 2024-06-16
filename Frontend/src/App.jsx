import React , { useState } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Loginpage from "./assets/component/Login/Login"
import Signup from './assets/component/Registration/signup'
import Createcustomer from './assets/component/Customer/Createcustomer'
import Createnewitem from './assets/component/Item/CreatenewItem'
import Createsales from './assets/component/Salesitem/Createsales'
import Customerlist from './assets/component/Customer/Customerlist'
import Itemlist from './assets/component/Item/Itemlist'
import Saleslist from './assets/component/Salesitem/Saleslist'
import Sales from "./assets/component/Sales/Sales"
import Aggregatesale from './assets/component/Sales/Aggregatesale'
import Homepage from './assets/component/Homepage/Homepage'
import Forgetpassword from './assets/component/Login/Forgetpassword';
import "./index.css"


function App() {

  return (

    <div>
     
    
       <Router>
      <div>
        <Routes>
        <Route path="/" element={<Loginpage />} />
        <Route path="/home" element={<Homepage/>} />
        <Route path="/signup" element={<Signup />} />
        <Route  path='/createCustomer' element={<Createcustomer/>}/> 
        <Route path='/createItem' element={<Createnewitem/>}/>
        <Route path='/createSale' element={<Createsales/>}/>
        <Route path='/sales' element={<Sales/>}/>
        <Route path='/customerlist' element={<Customerlist/>}/>
        <Route path='/itemlist' element={<Itemlist/>}/>
        <Route path='/salesitem' element={<Saleslist/>}/>
        <Route path='/aggregatesale' element={<Aggregatesale/>} />
        <Route path='/forgetpassword' element={<Forgetpassword/>}/> 


        </Routes>
      </div>
     </Router>
     {/* <Createcustomer/>
     <Customerlist/> */}
    
     
      
   
 

     
    </div>
  )

}

export default App
