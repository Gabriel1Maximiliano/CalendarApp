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
  
    onSetActiveEvent: (state,{ payload }) => {
        state.activeEvent= payload;
    },
    onAddNewEvent: (state,{ payload }) => {
      state.events.push( payload );
      state.activeEvent = null;
    },
    onUpdateEvent: (state,{ payload }) => {
      state.events = state.events.map(event => {
        if(event._id === payload._id){
          return payload;
        }
        return event;
      })
    },
    onDeleteEvent: (state) => {
      if(state.activeEvent){

        state.events = state.events.filter(e => e._id !== state.activeEvent._id)
        state.activeEvent= null;
      }
    }
   
  },
})

// Action creators are generated for each case reducer function
    
    export const { onDeleteEvent,onSetActiveEvent,onAddNewEvent,onUpdateEvent } = calendarSlice.actions

