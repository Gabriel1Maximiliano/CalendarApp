const { default: calendarApi } = require("../../src/api/calendarApi")


describe('Tests on CalendarApi', () => { 
    test('It must have the default configuration', () => {
        // aca probamos que nuestra configuracion de axios corresponda con la que ponemos en la variable de entorno
       //console.log(calendarApi.defaults.baseURL) 
       //console.log(process.env.REACT_APP_VITE_API_URL)
       expect( calendarApi.defaults.baseURL ).toBe( process.env.REACT_APP_VITE_API_URL )
    })
 })