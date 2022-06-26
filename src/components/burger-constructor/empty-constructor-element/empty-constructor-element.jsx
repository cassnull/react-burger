import styles from './empty-constructor-element.module.css'
import PropTypes from 'prop-types'

export const EmptyConstructorElement = ({ text }) => {
  return (
    <div className={`ml-8 ${styles.Empty}`}>
      <span className={styles.EmptyText}>{text}</span>
    </div>
  );
}

EmptyConstructorElement.propTypes = {
  text: PropTypes.string.isRequired,
}
