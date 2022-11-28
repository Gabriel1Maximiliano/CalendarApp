import axios from 'axios';
import { getEncVariables } from '../helpers/getEncVariables';


const { REACT_APP_VITE_API_URL } =  getEncVariables();

 const calendarApi = axios.create({
   
    baseURL:REACT_APP_VITE_API_URL
 })
  

//Todo config interceptors

calendarApi.interceptors.request.use(config=>{
config.headers={
   ...config.headers,
   'x-token':localStorage.getItem('token')
}

   return config;
})

export default  calendarApi