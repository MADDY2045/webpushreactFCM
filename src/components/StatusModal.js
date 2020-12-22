import React from 'react'
import { Button,Modal } from 'react-bootstrap';

 const StatusModal=(props)=>{
    return (
        <div >
             <Modal
        show={props.show}
        onHide={props.handleClose}
        backdrop="static"
        keyboard={false}
      >
    <Modal.Body>
         { props.notification }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
        </div>
    )
}

export default StatusModal;