

export const events =[
    {

    id: '1',
    start: new Date('2022-10-21 13:00:00'),
    end: new Date('2022-10-21 15:00:00'),
    title: 'Cumpleaños de Lola',
    notes: 'Hay que comprar el pastel',
},
{

   id: '2',
   start: new Date('2022-11-21 13:00:00'),
   end: new Date('2022-11-21 15:00:00'),
   title: 'Cumpleaños de Martina',
   notes: 'Hay que comprar remera de Henry'
}] 

export const initialState = {
    isLoadingEvents: true,
    events: [
        // tempEvent
    ],
    activeEvent: null
}
export const calendarWithEventsState = {
    isLoadingEvents: false,
    events: [
       ...events
    ],
    activeEvent: null
}
export const calendarWithActiveEventsState = {
    isLoadingEvents: false,
    events: [
       ...events
    ],
    activeEvent: {...events[0]}
}