import { configureStore } from "@reduxjs/toolkit";
import { renderHook, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { Provider } from "react-redux";
import { useAuthStore } from "../../src/hooks/useAuthStore";
import { authSlice } from "../../src/store";
import { notAuthenticatedState } from "../fixtures/authStates";
import { initialState } from "../fixtures/calendarStates";
import { testUserCredentials } from "../fixtures/testFixture";

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
    test('startLogin should log an user',async() => {
        localStorage.clear();
        const mockStore = getMockStore({ ...notAuthenticatedState });
        const { result } = renderHook( () => useAuthStore(),{
            wrapper: ({children}) => <Provider store={ mockStore } >{ children }</Provider>
        } );

        await act(async() => {
            await result.current.startLogin( testUserCredentials )
        });
      
  const  {errorMessage,status,user} = result.current;
  expect({errorMessage,status,user}).toEqual({errorMessage: undefined,status: 'authenticated',user: { name: 'Test User', uid: undefined },})
  expect( localStorage.getItem('token') ).toEqual( expect.any(String) );
  expect( localStorage.getItem('token-init-date') ).toEqual( expect.any(String) );
    });


    test('startLogin should not log an user', async() => { 
        localStorage.clear();
        const mockStore = getMockStore({ ...notAuthenticatedState });
    const { result } = renderHook( () => useAuthStore(),{
        wrapper: ({children}) => <Provider store={ mockStore } >{ children }</Provider>
    } );

    await act(async() => {
        await result.current.startLogin( { email:'fail@google.com', password:'we234324' } ); })

        const  {errorMessage,status,user} = result.current;

        expect({errorMessage,status,user}).toEqual({errorMessage: 'Credenciales incorrectas',
        status: 'not-authenticated',
        user: {},});
        expect( localStorage.getItem('token') ).toBe( null );
       await waitFor(
            () => expect( result.current.errorMessage ).toBe(undefined)
        )
    });
}); 