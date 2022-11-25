import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onSetActiveEvent } from "../store/calendar/calendarSlice";




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

    }else{
      // create
      dispatch( onAddNewEvent( {...calendarEvent,_id:new Date().getTime()}) );
    }
  }

  return{
    // properties
    events,
    activeEvent,
    //methods
    setActiveEvent,
    startSavingEvent
  }
}
