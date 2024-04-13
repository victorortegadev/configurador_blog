"use client"
import {useState } from 'react'
import styles from './lateral.module.css'
//import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useRouter } from 'next-nprogress-bar';

export default function Lateral({onAction, displayListaProp, blogIndiceProp}) {

  async function  crearEntrada (entrada) {
    const response = await fetch( `${process.env.NEXT_PUBLIC_BACKEND_URL_ONRENDER}/entrada`,
        {   
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(entrada)
        }
    )
  
    const entradaCreada = await response.json()
    return entradaCreada
  }

  const obtenerFecha = ()=> {

    const date = new Date()

    const [month, day, year] = [
        new Intl.DateTimeFormat('es-ES', { month: 'long'}).format(new Date()),
        new Date().getDate(),
        new Date().getFullYear(),
    ];
    const [hour, minutes] = [
        new Date().getHours(),
        new Date().getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes(),
    ];

    return(`${day} de ${month} de ${year}, ${hour}:${minutes}`)
}

  const router = useRouter()
  const pathname = usePathname()

  const [animacion] = onAction
  
  const [displayLista, setDisplayLista] = displayListaProp
  const [blogIndice, setBlogIndice]= blogIndiceProp

  const [animacionGradiente, setAnimacionGradiente] = useState(false)
  const [porcentajeGradiente, setPorcentajeGradiente] = useState(0)

  const listaBlogs = ['Mi primer blog','Mi segundo blog', 'Mi tercer blog']

  function porcentajeClick (e) {
    let porcentaje = ((e.clientX - e.target.getBoundingClientRect().x) * 100) / (e.target.getBoundingClientRect().width - 1)

    return porcentaje
  }
  
  return (
    <nav style={{transform:animacion[0]}} className={styles.lateral}>

      <div  
        onPointerOut={()=> {setAnimacionGradiente(false)}} 
        onPointerDown={(e)=> {setPorcentajeGradiente(porcentajeClick(e)), setAnimacionGradiente(true)}} 
        onClick={(e) => {  setDisplayLista(!displayLista)  }} 
        className={`${styles.seleccionador_blog} ${!animacionGradiente?'': styles.animacionGradiente}`} 
        style={{backgroundPosition: `${porcentajeGradiente}% 50% `, '--variable-gradiente-foco': porcentajeGradiente <= 50 ? 'right' : 'left' }}
      >
        <p>Mi primer blog</p>
      </div>

      <div style={{display:displayLista? 'block' :'none'}} className={styles.seleccionador_blog_lista}>
        <div className={`${styles.lista_inicio}`} >
            <p>Tus blogs</p>
        </div>
        {listaBlogs.map((nombreBlog, indice)=>{
              return(
                <div onMouseEnter={()=> {setBlogIndice(indice)}} key={indice} className={`${styles.seleccionador_blog} ${blogIndice == indice? styles.seleccionado : ''}`} >
                  <p>{nombreBlog}</p>
                </div>
              )      
            })
        }
        <div className={styles.linea}/>
        <div onMouseEnter={()=> {setBlogIndice('nuevoBlog')}} className={`${styles.seleccionador_blog} ${blogIndice == 'nuevoBlog'? styles.seleccionado : ''}`} >
            <p>Nuevo blog...</p>
        </div>
      </div>

      <button 
        name="boton-blog"
        className={styles.crearentrada}
        onPointerDown={(e)=> {/*console.log(e.target)*/e.target.style.backgroundColor= 'rgba(255, 87, 34, .25)'}} 
        onPointerOut={(e)=> {e.target.style.backgroundColor='transparent'}}
        onClick={(e) => {
          e.target.style.backgroundColor= 'transparent'
          crearEntrada(
            {
              titulo: "",
              texto: "",
              fecha: obtenerFecha()
            }
          ).then(entrada => {  router.push(`/edit/${entrada.id}`) })
        }}
      > 
        + NUEVA ENTRADA
      </button>    

      <div className={styles.linea}/>  

      <ul className={styles.listaul}>
        <li>
          <Link href='/blog/entradas' style={{ color: pathname == "/blog/entradas"?  '#f57c00' : ''}}>
            Entradas
          </Link>
        </li>
        <li>
          <Link href='/blog/estadisticas' style={{ color: pathname == "/blog/estadisticas"?  '#f57c00' : ''}}> Estadisticas</Link>
        </li>
        <li>
          <Link href='/blog/comentarios' style={{ color: pathname == "/blog/comentarios"?  '#f57c00' : ''}}>Comentarios</Link>
        </li>
        <li>
          <Link href='/blog/diseno' style={{ color: pathname == "/blog/diseno"?  '#f57c00' : ''}}>Diseño</Link>
        </li>
        <li>
          <Link href='/blog/tema' style={{ color: pathname == "/blog/tema"?  '#f57c00' : ''}}>Tema</Link>
        </li>
        <li>
          <Link href='/blog/configuracion' style={{ color: pathname == "/blog/configuracion"?  '#f57c00' : ''}}>Configuracion</Link>
        </li>
        <li>
          <Link  href='/blog/lectura' style={{ color: pathname == "/blog/lectura"?  '#f57c00' : ''}}>Lista de lectura</Link>
        </li>
      </ul>
      <div className={styles.linea}/> 

      <div className={styles.verblog}><a href={process.env.NEXT_PUBLIC_URL_BLOG} target="_blank">Ver blog</a></div>
    </nav>
  )
}