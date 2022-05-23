import { useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import styles from './modal.module.css'
import { ModalOverlay } from './modal-overlay/modal-overlay'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types'

export const Modal = ({ onClose, children, title }) => {
    const modalRoot = document.getElementById("modal");

    const handleEscapeKey = useCallback(
        (e) => {
            if (e.key === 'Escape') onClose()
        },
        [onClose]
    )

    useEffect(() => {
        document.addEventListener('keydown', handleEscapeKey)
        return () => {
            document.removeEventListener('keydown', handleEscapeKey)
        }
    }, [handleEscapeKey])

    return createPortal((
        <>
            <div className={styles.Modal} >
                {title && (
                    <h2 className={`text text_type_main-large mt-10 ml-10 ${styles.Title}`}>
                        {title}
                    </h2>
                )}
                <div className={styles.Close}>
                    <CloseIcon type="primary" onClick={onClose} />
                </div>
                {children}
            </div>
            <ModalOverlay onClick={onClose} />
        </>
    ), modalRoot);
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    title: PropTypes.string,
}