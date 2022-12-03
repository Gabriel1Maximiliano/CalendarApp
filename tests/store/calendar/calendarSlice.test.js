import { calendarSlice, onAddNewEvent, onSetActiveEvent, onUpdateEvent } from "../../../src/store/calendar/calendarSlice"
import { calendarWithEventsState, events, initialState } from "../../fixtures/calendarStates";

describe('test on calendarSlice', () => { 

    test('should returns the default state', () => { 

        const state = calendarSlice.getInitialState();

        expect( state ).toEqual( initialState );
       });
       test('OnSetActiveEvent should trigger the event', () => { 
        const state = calendarSlice.reducer( calendarWithEventsState, onSetActiveEvent(events[0]) );

        expect( state.activeEvent ).toEqual( events[0] );
        });
        test('"onAddNewEvent" should add a new event', () => { 
            const newEvent = {

                id: '3',
                start: new Date('2022-10-21 13:00:00'),
                end: new Date('2022-10-21 15:00:00'),
                title: 'onAddNewEvent',
                notes: 'I am a new event',
            }
            const state = calendarSlice.reducer( calendarWithEventsState, onAddNewEvent( newEvent ) );
            expect( state.events ).toEqual([...events, newEvent]);
         });
         test('"onUpdateEvent" should update an event ', () => { 
            const updateEvent = {
                id: '1',
                start: new Date('2022-10-21 13:00:00'),
                end: new Date('2022-10-21 15:00:00'),
                title: 'Cumpleaños de Lola Monsterio (she/her)',
                notes: 'Hay que comprar el torta y sandwitchs de miga',
            }
            const state = calendarSlice.reducer( calendarWithEventsState, onUpdateEvent( updateEvent ) );
            expect( state.events[0].title ).toEqual('Cumpleaños de Lola Monsterio (she/her)');
            expect( state.events ).toContain(updateEvent);
          });
     })