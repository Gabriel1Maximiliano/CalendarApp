import React from 'react'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';


import { NavBar } from '../components/NavBar';
import { addHours } from 'date-fns/esm';
import { localizer ,getMessagesES} from '../../helper';
import { CalendarEvent } from '../components/CalendarEvent';



  const events = [{
    title:'Cumple de Lola',
    notes:'Le gusta la torta de crema y frutilla',
    start: new Date(),
    end: addHours( new Date(),2 ),
    bgColor:'#ccc',
    user:{
        _id:'123',
        name:'Lola'
    }
  }]
export const CalendarPage = () => {

    const eventStyleGetter = (event,start,end,isSelected) => {
    

        const style = {
            backgroundColor:'#347CF7',
            borderRadius:'0px',
            opacity:0.8,
            color:'white'
        }
    }

  return (
    <div>
        <NavBar />
        <Calendar
        culture='es'
      localizer={ localizer }
      events={ events }
      startAccessor="start"
      endAccessor="end"
      style={{ height: 500 }}
      messages={ getMessagesES() }
      eventPropGetter={ eventStyleGetter }
      components={{
        event:CalendarEvent
      }}
    />
    </div>
  )
}
