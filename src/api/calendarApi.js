
import axios from 'axios'
import { getEnvVariables } from '../helper/getEnvVariables'

const { VITE_API_URL  }= getEnvVariables();


const calendarApi = axios.create({
    BaseUrl:VITE_API_URL ,
})

//TODO  configure receivers

export default calendarApi;