import styles from './main.module.css'

export default function Main({children, onAction}) {

  const [animacion] = onAction
  
  return (
    <main 
      style={{width:animacion[1]}} 
      className={styles.main}
    >
      {children}
    </main>
  )
}