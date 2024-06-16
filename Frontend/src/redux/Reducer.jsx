import { createSlice } from "@reduxjs/toolkit";


const CustomerSlice = createSlice({
    name:"customers",
    initialState:{
        customers:[]

    },
    reducers:{
        getCustomer : (state,action ) =>{
            state.customers=action.payload

        },
        addCustomers:(state,action)=>{
            state.customers.push(action.payload)
        }

    }

})
export const {getCustomer,addCustomers} = CustomerSlice.actions;
export default CustomerSlice.reducer;