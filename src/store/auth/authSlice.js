import { createSlice } from '@reduxjs/toolkit';





export const authSlice = createSlice({
    name: 'auth',
    initialState: {
       status: 'checking',
       user:{}, // 'authenticated' 'not-authenticated',
    errorMessage:undefined,
    },
    reducers: {
     onChecking: ( state ) => {
        state.status = 'checking';
        state.user={};
        state.errorMessage= undefined
     },
     onLogin: ( state,action ) => {
        state.status = 'authenticated';
        state.user=action.payload;
        state.errorMessage= undefined;
     }
    }
});


// Action creators are generated for each case reducer function
export const { onLogin,onChecking } = authSlice.actions;