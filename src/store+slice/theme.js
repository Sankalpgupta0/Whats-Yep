import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isDarktheme: true,
    
}

const ThemeSlice = createSlice({
    name: "ThemeReducer",
    initialState,
    reducers: {
        toggleTheme : (state) => {
            state.isDarktheme = !state.isDarktheme 
            console.log(state.isDarktheme);
        }
    }

})

export const { toggleTheme } = ThemeSlice.actions;

export default ThemeSlice.reducer;