import { configureStore } from "@reduxjs/toolkit";
import customerReducer from "./Reducer"


const store =configureStore({
    reducer:{
        customers:customerReducer

    }
})

export default store;