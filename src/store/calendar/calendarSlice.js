import { createSlice } from '@reduxjs/toolkit'
import { addHours } from 'date-fns/esm';

const tempEvent = {
    _id: new Date().getTime(),
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
  
    onSetActiveEvent: (state,{payload}) => {
        state.activeEvent= payload;
    }
   
  },
})

// Action creators are generated for each case reducer function
    
    export const { onSetActiveEvent } = calendarSlice.actions

