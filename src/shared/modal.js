import React from 'react';
import PropTypes from 'prop-types';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const InfoModal =  (props) => {
    return (
        <Modal show={props.show} onHide={props.onClose}>
            <Modal.Header>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div className="text-center">{props.children}</div>
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={props.onClose} variant="danger">{props.buttonText}</Button>
            </Modal.Footer>
        </Modal>
    );
}

InfoModal.propTypes = {
    onClose: PropTypes.func,
    children: PropTypes.string,
    title: PropTypes.string,
    buttonText: PropTypes.string,
    show: PropTypes.bool
}


export default InfoModal;
