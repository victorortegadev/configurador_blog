import styles from './main.module.css'

export default function Main({childrenProp, onAction}) {

  const [animacion] = onAction
  
  return (
    <main 
      style={{width:animacion[1]}} 
      className={styles.main}
    >
      {childrenProp}
    </main>
  )
}