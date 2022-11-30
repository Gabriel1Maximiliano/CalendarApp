import { useDispatch, useSelector } from 'react-redux';
import calendarApi from '../api/calendarApi';
import { convertsEventToDateEvents } from '../helpers/convertsEventToDateEvents';
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from '../store';


export const useCalendarStore = () => {
    const { user } = useSelector( ( state ) => state.auth );
    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector( state => state.calendar );

    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent( calendarEvent ) )
    }

    const startSavingEvent = async( calendarEvent ) => {
        // TODO: llegar al backend

        // Todo bien
        if( calendarEvent._id ) {
            // Actualizando
            dispatch( onUpdateEvent({ ...calendarEvent }) );
        } else {
            // Creando

            const { data }  =await calendarApi.post('/events/post',calendarEvent);
            dispatch( onAddNewEvent({ ...calendarEvent, id: data.event.id,user }) );
        }
    }

    const startDeletingEvent = () => {
        // Todo: Llegar al backend


        dispatch( onDeleteEvent() );
    };

    const startLoadingEvents = async () => {
      try {
        const { data }= await calendarApi.get('/events/get');
 
        const events = convertsEventToDateEvents( data.event );
        dispatch( onLoadEvents(events) );
        console.log(events)

      } catch (error) {
        console.log(
            error
        )
      }  
    }


    return {
        //* Propiedades
        activeEvent,
        events,
        hasEventSelected: !!activeEvent,

        //* Métodos
        startDeletingEvent,
        setActiveEvent,
        startSavingEvent,
        startLoadingEvents,
    }
}
