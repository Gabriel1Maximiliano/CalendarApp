import { addHours } from 'date-fns';

import { registerLocale, setDefaultLocale } from  "react-datepicker";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import React, { useState } from 'react'
import Modal from 'react-modal';
import es from 'date-fns/locale/es';

registerLocale('es', es);


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};
Modal.setAppElement('#root');


export const CalendarModal = () => {

    const [isOpen, setisOpen] = useState(true);

    const [formValues, setformValues] = useState({
        title:'Lola',
        notes:'Monasterio',
        start: new Date(),
        end: addHours( new Date(), 2 ),
    });
     

    const onDateChaned = (event, changing) => {
        setformValues({
            ...formValues,
            [changing]:event,
        })
    }
   const onInputChange = ({target}) => {
    setformValues({
        ...formValues,
        [target.name]: target.value,
    })
   }


const onCloseModal = () => {
    console.log('cerrando modal')
    setisOpen( false );
}

    return (
        <Modal
        isOpen={isOpen}
        onRequestClose={onCloseModal}
        style={customStyles}
        className='modal'
        overlayClassName='modal-fondo'
        closeTimeoutMS={200}
        showTimeSelect
        
        >
           <h1> Nuevo evento </h1>
<hr />
<form className="container">

    <div className="form-group mb-2">
        <label>Fecha y hora inicio</label>
        < DatePicker
        selected={formValues.start}
        onChange={ (event) => onDateChaned(event, 'start')  }
        className='form-control'
        dateFormat='Pp'
        showTimeSelect
        locale='es'
        timeCaption='hora'
        />

    </div>

    <div className="form-group mb-2">
        <label>Fecha y hora fin</label>
        < DatePicker
        minDate={ formValues.start }
        selected={formValues.end}
        onChange={ (event) => onDateChaned(event, 'end')  }
        className='form-control'
        dateFormat='Pp'
        showTimeSelect
        locale='es'
        timeCaption='hora'
        
        />
    </div>

    <hr />
    <div className="form-group mb-2">
        <label>Titulo y notas</label>
        <input 
            type="text" 
            className="form-control"
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={formValues.title}
            onChange={onInputChange}
        />
        <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
    </div>

    <div className="form-group mb-2">
        <textarea 
            type="text" 
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={formValues.notes}
        onChange={onInputChange}
        ></textarea>
        <small id="emailHelp"
         className="form-text text-muted">Información adicional</small>
    </div>

    <button
        type="submit"
        className="btn btn-outline-primary btn-block"
    >
        <i className="far fa-save"></i>
        <span> Guardar</span>
    </button>

</form>
        </Modal>
    )
}
