import React, { useState } from 'react'
import Modal from 'react-modal';

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
        >
            <h1>Hola mundo</h1>
            <hr></hr>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem ipsa amet ipsam temporibus suscipit. Ratione hic, quo a nam aut error aliquam beatae tenetur! Sunt ex nisi incidunt nemo voluptatum.</p>
        </Modal>
    )
}
