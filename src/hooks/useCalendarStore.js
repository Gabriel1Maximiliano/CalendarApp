import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent,onUpdateEvent } from "../store/calendar/calendarSlice";




export const useCalendarStore = () => {
 
 const dispatch = useDispatch();

  const { events,activeEvent } =useSelector( (state) => state.calendar);


  const setActiveEvent = ( calendarEvent ) => {

    dispatch( onSetActiveEvent( calendarEvent ) );
  }

 

    const startSavingEvent = async( calendarEvent ) => {
    // TODO get to the backend later

    // It´s good
    if( calendarEvent._id ){
      // update
  dispatch( onUpdateEvent( {...calendarEvent} ) )
    }else{
      // create
      dispatch( onAddNewEvent( {...calendarEvent,_id:new Date().getTime()}) );
    }
  }
  const startDeletingevent  = () => {
    dispatch( onDeleteEvent())
  }

  return{
    // properties
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,
    //methods
    setActiveEvent,
    startSavingEvent,
    startDeletingevent
  }
}
