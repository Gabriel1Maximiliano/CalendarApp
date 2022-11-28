import { useDispatch, useSelector } from "react-redux"
import calendarApi from "../api/calendarApi";
import { clearErrorMessage, onChecking, onLogin, onLogout } from "../store/auth/authSlice";


export const useAuthStore = () => {

   const dispatch = useDispatch();

   const { status,user,errorMessage } = useSelector( (state) =>state.auth  );
  
   const startLogin = async( { email,password } ) => {
      
dispatch(onChecking());
      try {
        const { data } = await calendarApi.post('/auth/login',{ email,password });
       localStorage.setItem('token', data.token);
       localStorage.setItem('token-init-date', new Date().getTime());
       console.log(data)
       dispatch( onLogin({ name:data.name,uid:data.id }) ); 
      } catch (error) {
        
        dispatch( onLogout('Invalid credentials') );

        setTimeout(() => {
            dispatch( clearErrorMessage() );
        }, 10);
      }
   }

  return{
    //* Properties
    status,
    user,
    errorMessage,

    //*Methods
    startLogin
  }
}