import { configureStore } from "@reduxjs/toolkit";
import { renderHook } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { Provider } from "react-redux";
import { useUiStore } from "../../src/hooks";
import { uiSlice } from "../../src/store";

const getMockStore = (initialState) => {
    return configureStore({
        reducer: {
            ui: uiSlice.reducer
        },
        preloadedState: {
            ui: { ...initialState }
        }
    })
}
describe('Tests on useUiStore', () => {
    test('should return default values', () => {
        const mockStore = getMockStore({ isDateModalOpen: false })
        const { result } = renderHook(() => useUiStore(), {
            wrapper: ({ children }) => <Provider store={mockStore} >{children}</Provider>
        })
        expect(result.current).toEqual({
            isDateModalOpen: false,
            closeDateModal: expect.any(Function),
            openDateModal: expect.any(Function),
            toggleDateModal: expect.any(Function),
        })
    });

    test(' openDateModal should set to true in the isDateModalOpen', () => { 
        const mockStore = getMockStore({ isDateModalOpen: false })
        const { result } = renderHook(() => useUiStore(), {
            wrapper: ({ children }) => <Provider store={mockStore} >{children}</Provider>
        });
        const { openDateModal } =result.current;

        act( () => {
            openDateModal()
        } );

        expect( result.current.isDateModalOpen ).toBeTruthy();
     })
});