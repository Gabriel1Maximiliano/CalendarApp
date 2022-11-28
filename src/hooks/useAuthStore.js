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
       
       dispatch( onLogin({ name:data.name,uid:data.id }) ); 
     
      } catch (error) {
        
        dispatch( onLogout('Invalid credentials') );

        setTimeout(() => {
            dispatch( clearErrorMessage() );
        }, 10);
      }
   }
      const startRegisterUser = async({name,email,registerPassword1,registerPassword2}) => {
         console.log({name,email,registerPassword1,registerPassword2})
        try {
          const { data } = await calendarApi.post('/auth/register',{name,email,password:registerPassword1});
         localStorage.setItem('token', data.token);
         localStorage.setItem('token-init-date', new Date().getTime());
         console.log(data)
         dispatch( onLogin({ name:data.name,uid:data.id }) ); 
        } catch (error) {
          console.log(error)
          dispatch( onLogout(error.response.data.msg || '') );
  
          setTimeout(() => {
              dispatch( clearErrorMessage() );
          }, 10);
        }
      }

      const checkAuthToken = async()=>{
        const token = localStorage.getItem('token');
        if( !token ){
          return dispatch( onLogout() );
        }

        try {
          const { data } = await calendarApi.get('auth/renewToken');
          localStorage.setItem('token', data.token);
          localStorage.setItem('token-init-date', new Date().getTime());
          dispatch( onLogin({ name:data.name,uid:data.id }) );
        } catch (error) {
          localStorage.clear();
          dispatch( onLogout() );
        }
      }

      const startLogout = () => {
        localStorage.clear();
        dispatch( onLogout() );
      }
  return{
    //* Properties
    status,
    user,
    errorMessage,

    //*Methods
    startLogin,
    startRegisterUser,
    checkAuthToken,
    startLogout
  }
}
