//const { default: calendarApi } = require("../../src/api/calendarApi")


import calendarApi from '../../src/api/calendarApi';

describe('Tests on CalendarApi', () => {

    test('It must have the default configuration', () => {
        // aca probamos que nuestra configuracion de axios corresponda con la que ponemos en la variable de entorno
        //console.log(calendarApi.defaults.baseURL) 
        //console.log(process.env.REACT_APP_VITE_API_URL)
        expect(calendarApi.defaults.baseURL).toBe(process.env.REACT_APP_VITE_API_URL);


    })
    test('Must have the x-token on all requests', async () => {

        // la idea de esta prueba es que en x-token exista un valor de token cualquiera sea
        localStorage.setItem('token', 'lola-monasterio');

        let res = {
            email: "test@google.com",
            password: "123456"
        }

           
        const resp = await calendarApi.post('/auth/login', res)
        expect(resp.config.headers['x-token']).toBe('lola-monasterio');
    });
}) 