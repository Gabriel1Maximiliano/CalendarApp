import getEncVariables from '../helpers/getEncVariables';


const { REACT_APP_VITE_API_URL } =  getEncVariables();

 const calendarApi = axios.create({
   
    baseURL:REACT_APP_VITE_API_URL
 })
  

//Todo config interceptors

export default  calendarApi