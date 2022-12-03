import { authSlice, onLogin } from "../../../src/store/auth/authSlice"
import { initialState } from "../../fixtures/authStates"
import { testUserCredentials } from "../../fixtures/testFixture"


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
      })
    })