import { calendarSlice, onSetActiveEvent } from "../../../src/store/calendar/calendarSlice"
import { calendarWithEventsState, events, initialState } from "../../fixtures/calendarStates";

describe('test on calendarSlice', () => { 

    test('should returns the default state', () => { 

        const state = calendarSlice.getInitialState();

        expect( state ).toEqual( initialState );
       });
       test('OnSetActiveEvent debe activar el evento', () => { 
        const state = calendarSlice.reducer( calendarWithEventsState, onSetActiveEvent(events[0]) );

        expect( state.activeEvent ).toEqual( events[0] );
        });
     })