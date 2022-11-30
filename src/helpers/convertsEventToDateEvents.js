import { parseISO } from "date-fns"


export const convertsEventToDateEvents = (event = []) => {
console.log(event) 
    return event.map( e=>{
    event.start = parseISO( e.start );
    event.end = parseISO( e.end );
    return event;
 } );

}
