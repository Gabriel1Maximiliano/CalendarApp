import { configureStore } from "@reduxjs/toolkit";
import { renderHook } from "@testing-library/react";
import { Provider } from "react-redux";
import { useAuthStore } from "../../src/hooks/useAuthStore";
import { authSlice } from "../../src/store";
import { initialState } from "../fixtures/calendarStates";

const getMockStore = (initialState) => {
    return configureStore({
        reducer: {
            auth:authSlice.reducer,
        },
        preloadedState: {
            calendar: { ...initialState }
        }
    })
}
describe('Tests on useAuthStore', () => {
    test('should return default values', () => {
      
        const mockStore = getMockStore({...initialState}) // 'authenticated','not-authenticated'
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore} >{children}</Provider>
        })
       
         expect(result.current).toEqual({
        errorMessage: undefined,
        status: 'checking',
        user: {},
        checkAuthToken: expect.any(Function),
        startLogin:  expect.any(Function),
        startLogout:  expect.any(Function),
        startRegister: expect.any(Function),
      })
    });
});