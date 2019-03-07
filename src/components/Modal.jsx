import React from 'react';

const Modal = ({ func }) => (
  <div className="modal">
    <div className="modal-body">
      <div>Let op! Je wijziging kan niet ongedaan worden gemaakt.</div>
      <button type="button" className="btn btn-danger" onClick={() => func(1)}>
        Bevestigen
      </button>
      <button type="button" className="btn btn-light" onClick={() => func(0)}>
        Annuleren
      </button>
    </div>
  </div>
);


export default Modal;
