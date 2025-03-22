import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name:"searchSlice",
    initialState:{
        searchItem:null,
        searchedCards:[]
    },
    reducers:{
        updatesearchItem:(state,action)=>{
            state.searchItem = action.payload
        },
        searchedCards:(state,action) =>{
            state.searchedCards = action.payload
        }
    }
})

export const{updatesearchItem,searchedCards} = searchSlice.actions;
export default searchSlice.reducer;