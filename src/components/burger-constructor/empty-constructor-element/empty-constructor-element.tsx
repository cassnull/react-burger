import styles from './empty-constructor-element.module.css'

type TProp = {
  text: string
}

export const EmptyConstructorElement = ({ text }: TProp) => {
  return (
    <div className={`ml-8 ${styles.Empty}`}>
      <span className={styles.EmptyText}>{text}</span>
    </div>
  );
}
