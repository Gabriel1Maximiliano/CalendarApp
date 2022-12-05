import { configureStore } from "@reduxjs/toolkit";
import { renderHook, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { Provider } from "react-redux";
import { calendarApi } from "../../src/api";
import { useAuthStore } from "../../src/hooks/useAuthStore";
import { authSlice } from "../../src/store";
import { notAuthenticatedState } from "../fixtures/authStates";
import { initialState } from "../fixtures/calendarStates";
import { testUserCredentials } from "../fixtures/testFixture";

const getMockStore = (initialState) => {
    return configureStore({
        reducer: {
            auth: authSlice.reducer,
        },
        preloadedState: {
            calendar: { ...initialState }
        }
    })
}
describe('Tests on useAuthStore', () => {

    beforeEach(() =>  localStorage.clear());

    test('should return default values', () => {

        const mockStore = getMockStore({ ...initialState }) // 'authenticated','not-authenticated'
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore} >{children}</Provider>
        })

        expect(result.current).toEqual({
            errorMessage: undefined,
            status: 'checking',
            user: {},
            checkAuthToken: expect.any(Function),
            startLogin: expect.any(Function),
            startLogout: expect.any(Function),
            startRegister: expect.any(Function),
        })
    });
    test('startLogin should log an user', async () => {
       
        const mockStore = getMockStore({ ...notAuthenticatedState });
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore} >{children}</Provider>
        });

        await act(async () => {
            await result.current.startLogin(testUserCredentials)
        });

        const { errorMessage, status, user } = result.current;
        expect({ errorMessage, status, user }).toEqual({ errorMessage: undefined, status: 'authenticated', user: { name: 'Test User', uid: undefined }, })
        expect(localStorage.getItem('token')).toEqual(expect.any(String));
        expect(localStorage.getItem('token-init-date')).toEqual(expect.any(String));
    });


    test('startLogin should not log an user', async () => {
      
        const mockStore = getMockStore({ ...notAuthenticatedState });
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore} >{children}</Provider>
        });

        

        await act(async () => {
            await result.current.startLogin({ email: 'fail@google.com', password: 'we234324' });
        })

        const { errorMessage, status, user } = result.current;

        expect({ errorMessage, status, user }).toEqual({
            errorMessage: 'Credenciales incorrectas',
            status: 'not-authenticated',
            user: {},
        });
        expect(localStorage.getItem('token')).toBe(null);
        await waitFor(
            () => expect(result.current.errorMessage).toBe(undefined)
        )
       
    });

    test('startLogin should create an user', async() => { 

        const newUser = { email:'some@googlecom',password:'any-password',name:'Lola test' };
        const mockStore = getMockStore({ ...notAuthenticatedState });
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore} >{children}</Provider>
        });
        const spy = jest.spyOn( calendarApi, 'post' ).mockReturnValue({
            data:{
                status: true, 
                msg: "User created successfully",
                id: "638ddd4f07e6c05fcf157638",
                name: "Lola test",
                token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MzhkZGQ0ZjA3ZTZjMDVmY2YxNTc2MzgiLCJuYW1lIjoiVGVzdCBVc2VyIiwiaWF0IjoxNjcwMjQxNjE2LCJleHAiOjE2NzAyNDg4MTZ9.ptZYBjy_ovYHpRwBJge3Nn9JAr7jJ6aN7uxufXN-WiI"
            }
        })

        await act(async () => {
            await result.current.startRegister(newUser);
        });
        const { errorMessage, status, user } = result.current;
        expect({ errorMessage, status, user } ).toEqual( {
            errorMessage: undefined,
            status: 'authenticated',
            user: { name: 'Lola test', uid: undefined }
          });
          spy.mockRestore()
     }); //
     test('startRegister should fails', async() => { 
        
        const mockStore = getMockStore({ ...notAuthenticatedState });
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore} >{children}</Provider>
        });
     

        await act(async () => {
            await result.current.startRegister(testUserCredentials);
        });
        const { errorMessage, status, user } = result.current;
        expect({ errorMessage, status, user } ).toEqual( {
            errorMessage: "User already exists ",
               status: "not-authenticated",
              user:{},
          });
          
      });
      test('checkAuthToken should logout if there is no token', async() => { 
        const mockStore = getMockStore({ ...initialState });
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore} >{children}</Provider>
        });
        
        await act(async () => {
            await result.current.checkAuthToken();
        });

        const { errorMessage, status, user } = result.current;

        expect({ errorMessage, status, user } ).toEqual( {
            errorMessage: undefined,
               status: "not-authenticated",
              user:{},
          });

       });
       test('checkAuthToken should authencate a user if there is token', async() => { 
        
        const { data } = await calendarApi.post('/auth/login',testUserCredentials);
        localStorage.setItem('token', data.token);
       
        const mockStore = getMockStore({ ...initialState });
        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore} >{children}</Provider>
        });
        
        await act(async () => {
            await result.current.checkAuthToken();
        });

        const { errorMessage, status, user } = result.current;

        expect({  errorMessage, status, user} ).toEqual(  {
            errorMessage: undefined,
            status: "authenticated",
            user: { name: 'Test User', uid: "638ddfca07e6c05fcf15763e" }
          });

        })
}); 