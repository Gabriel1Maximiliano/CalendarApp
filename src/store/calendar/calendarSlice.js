import { createSlice } from '@reduxjs/toolkit'
import { addHours } from 'date-fns/esm';

const tempEvent = {
    title:'Cumple de Lola',
    notes:'Le gusta la torta de crema y frutilla',
    start: new Date(),
    end: addHours( new Date(),2 ),
    bgColor:'#ccc',
    user:{
        _id:'123',
        name:'Lola'
    }
  }
export const calendarSlice = createSlice({
  name: 'calendar',
  initialState:{
   events: [tempEvent],
   activeEvent:null,
  },
  reducers: {
  
    onOpenDateModal: (state) => {
        state.isDateModalOpen=true;
    },
    onCloseDateModal: (state) => {
      
        state.isDateModalOpen= false;
    }
   
  },
})

// Action creators are generated for each case reducer function
    
    export const {   onOpenDateModal,onCloseDateModal } = calendarSlice.actions

