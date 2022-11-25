import React from 'react'
import { useCalendarStore } from '../../hooks/useCalendarStore'

export const FabDelete = () => {
const { startDeletingevent,hasEventSelected } = useCalendarStore();
const handleDeleteEvent = () => {
    startDeletingevent();
}
  return (
    <div>
        <button className='btn btn-danger fab-danger' 
        onClick={ handleDeleteEvent }
        style={{
            display: hasEventSelected ? '' : 'none'
        }}><i className='fas fa-trash-alt' ></i></button>
    </div>
  )
}
