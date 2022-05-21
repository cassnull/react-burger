import { createPortal } from 'react-dom'
import styles from './modal-overlay.module.css'
import PropTypes from 'prop-types'

export const ModalOverlay = ({ onClick }) => {
    const modalRoot = document.getElementById("modal");

    return createPortal((
        <div className={styles.ModalOverlay} onClick={onClick}></div>
    ), modalRoot);
}

ModalOverlay.propTypes = {
    onClick: PropTypes.func.isRequired,
}