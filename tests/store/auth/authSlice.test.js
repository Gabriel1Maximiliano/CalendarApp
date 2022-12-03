import { authSlice, clearErrorMessage, onLogin, onLogout } from "../../../src/store/auth/authSlice";
import { authenticatedState, initialState } from "../../fixtures/authStates";
import { testUserCredentials } from "../../fixtures/testFixture";


describe('Tests on authSlice', () => { 
    test('should returns initial state', () => { 
        expect( authSlice.getInitialState() ).toEqual( initialState )
     }) 
     test('should login a user', () => { 
        const state = authSlice.reducer(initialState, onLogin( testUserCredentials ));

        expect( state ).toEqual({
            status:'authenticated',
            user:testUserCredentials,
            errorMessage:undefined
        })
      });
      test('should logout a user', () => { 
        const state = authSlice.reducer(initialState, onLogout());

        expect( state ).toEqual({
            status:'not-authenticated',
            user:{},
            errorMessage:undefined
        })
       });
       test('testing error message', () => { 

        const errorMessage = 'Invalid credentials'
        const state = authSlice.reducer(initialState, onLogout( errorMessage ));

        expect( state ).toEqual({
            status:'not-authenticated',
            user:{},
            errorMessage:errorMessage
        })
       });
       test('should clean the error message', () => { 
        const errorMessage = 'Invalid credentials'
        const state = authSlice.reducer( authenticatedState,onLogout( errorMessage )  );
        const newState = authSlice.reducer(authenticatedState, clearErrorMessage() );
        expect( newState.errorMessage ).toBe( undefined );
        })
    })