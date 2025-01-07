import ReactDOM from 'react-dom';
import { createPortal } from 'react-dom';


const Modal = ({children, handleCloseModal}) => {
    return ReactDOM.createPortal(
        <div className="modal-container">
            <button onClick={handleCloseModal} className="modal-underlay" />
            <div className="modal-content">
                {children}
            </div>
        </div>,
        document.getElementById("portal")
    )
};

export default Modal;