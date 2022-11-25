import { createSlice } from '@reduxjs/toolkit'



export const uiSlice = createSlice({
  name: 'ui',
  initialState:{
    isDateModalOpen: false,
  },
  reducers: {
  
    isDateModalOpen: (state) => {
        state.isDateModalOpen=true;
    },
    isDateModalOpen: (state) => {
      
        state.isDateModalOpen= false;
    }
   
  },
})

// Action creators are generated for each case reducer function
    
    export const {   isDateModalOpen,oncloseDateModal } = uiSlice.actions

export default uiSlice