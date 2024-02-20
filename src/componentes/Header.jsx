'use client'
import { useRouter } from 'next/navigation'
import styles from './header.module.css'

export default function Header({onAction}) {

  const router = useRouter()

  const [animacion, setAnimacion] = onAction ? onAction : ''
  return (
    <header className={styles.header} >

      <p className={styles.barra} onClick={() => { onAction ?
          animacion[2] == 'abierto' ? 
          setAnimacion( ['translateX(-300px)', '100%', 'cerrado'] ) : 
          setAnimacion( ['', '', 'abierto'] )  
          : router.push('/blog/entradas')
        }} 
      >
        <svg className={styles.tres} focusable="false" viewBox="0 0 24 24">
          <path d= {onAction ? "M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" : "M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"}>
          </path>
        </svg>
      </p>

      <div className={styles.logo}><img src="https://www.blogger.com/img/logo_blogger_40px.png" /*srcset="https://www.blogger.com/img/logo_blogger_40px.png 1x, https://www.blogger.com/img/logo_blogger_40px_2x.png 2x " aria-hidden="true" role="presentation" data-iml="6126" data-atf="true"*/></img></div>
    </header>
  )
}