import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Popup = ({ title, message, openPopup }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    useEffect(() => { setShow(openPopup) }, [openPopup])
    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {message}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary">Proceed</Button>
                </Modal.Footer>
            </Modal>
        </>
    );

}

export default Popup