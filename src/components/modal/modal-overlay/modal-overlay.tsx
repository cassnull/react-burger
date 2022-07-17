import { createPortal } from 'react-dom'
import styles from './modal-overlay.module.css'

type TProp = {
    onClick: () => void;
}

export const ModalOverlay = ({ onClick }: TProp) => {
    const modalRoot = document.getElementById("modal");

    return createPortal((
        <div className={styles.ModalOverlay} onClick={onClick}></div>
    ), modalRoot as HTMLElement)
}