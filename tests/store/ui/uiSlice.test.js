import { onCloseDateModal, onOpenDateModal, uiSlice } from "../../../src/store/ui/uiSlice";


describe('Tests on uiSlice', () => {
    test('It must return the state default', () => { 
        expect( uiSlice.getInitialState() ).toEqual({ isDateModalOpen: false })
     });
     test('should change the isDateModalOpen correctly', () => { 
        let state = uiSlice.getInitialState();
        state = uiSlice.reducer( state, onOpenDateModal() );
        expect( state.isDateModalOpen ).toBeTruthy();

        state = uiSlice.reducer( state, onCloseDateModal() );
        expect( state.isDateModalOpen ).toBeFalsy();
    })
});