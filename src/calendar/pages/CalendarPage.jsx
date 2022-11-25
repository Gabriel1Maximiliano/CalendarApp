import React, { useState } from 'react'
import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';


import { NavBar } from '../components/NavBar';

import { localizer, getMessagesES } from '../../helper';
import { CalendarEvent } from '../components/CalendarEvent';
import { CalendarModal } from '../components/CalendarModal';
import { useUiStore } from '../../hooks';
import { useCalendarStore } from '../../hooks/useCalendarStore';
import { FabAddNew } from '../components/FabAddNew';




export const CalendarPage = () => {

  const { events, setActiveEvent } = useCalendarStore();

  const { openDateModal } = useUiStore();

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'week')

  const eventStyleGetter = (event, start, end, isSelected) => {


    const style = {
      backgroundColor: '#347CF7',
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white'
    }
  }

  const onDoubleClick = (event) => {
    // console.log({dobleClick: event})
    openDateModal();
  }

  const onSelect = (event) => {
    setActiveEvent( event );
    //console.log({ click: event });
  }
  const onViewChanged = (event) => {
    localStorage.setItem('lastView', event);
  }

  return (
    <div>
      <NavBar />
      <Calendar
        culture='es'
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        messages={getMessagesES()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />
      <CalendarModal />
      <FabAddNew />
    </div>
  )
}
