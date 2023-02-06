import { configureStore } from "@reduxjs/toolkit";
import notesSlice from "./notesSlice";

const store = configureStore({
    reducer:{
        notesSlice
    }
})

export default store