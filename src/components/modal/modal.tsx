import { useEffect, useCallback, ReactNode } from 'react'
import { createPortal } from 'react-dom'
import styles from './modal.module.css'
import { ModalOverlay } from './modal-overlay/modal-overlay'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useHistory } from 'react-router-dom'

type TProp = {
    onClose?: () => void
    children: ReactNode
    title?: string
}

export const Modal = ({ onClose, children, title }: TProp) => {
    const history = useHistory()
    const modalRoot = document.getElementById('modal')

    const onCloseHandler = useCallback(() => {
        onClose ? onClose() : history.goBack()
    }, [onClose, history])

    useEffect(() => {
        const handleEscapeClose = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onCloseHandler()
            }
        }
        document.addEventListener('keydown', handleEscapeClose)
        return () => {
            document.removeEventListener('keydown', handleEscapeClose)
        }
    }, [onCloseHandler])

    return createPortal((
        <>
            <div className={styles.Modal} >
                {title && (
                    <h2 className={`text text_type_main-large mt-10 ml-10 ${styles.Title}`}>
                        {title}
                    </h2>
                )}
                <div className={styles.Close}>
                    <CloseIcon type='primary' onClick={onCloseHandler} />
                </div>
                {children}
            </div>
            <ModalOverlay onClick={onCloseHandler} />
        </>
    ), modalRoot as Element)
}