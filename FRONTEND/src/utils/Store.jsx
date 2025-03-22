import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./AuthSlice";
import searchReducer from "./searchSlice";
import searchSlice from "./searchSlice";

const Store = configureStore({
    reducer:{
       AuthSlice:authReducer,
       searchSlice:searchReducer,
    }
})

export default Store;