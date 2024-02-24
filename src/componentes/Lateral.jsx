import styles from './lateral.module.css'
import { useRouter } from 'next/navigation'

export default function Lateral({onAction}) {

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
  const [animacion] = onAction
  
  return (
    <nav style={{transform:animacion[0]}} className={styles.lateral}>

      <div className={styles.selectblog} >
        <select name="select" className={styles.select}>
          <option value="value1" /*selected*/>Mi primer blog</option>
          <option value="value2">Nuevo blog...</option>
        </select>
      </div>
      <button 
        name="boton-blog"
        className={styles.crearentrada}
        onClick={() => {
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
        <li onClick={() => {router.push('/blog/entradas')}}>
          <a>Entradas</a>
        </li>
        <li onClick={() => {router.push('/blog/estadisticas')}}>
          <a> Estadisticas</a>
        </li>
        <li onClick={() => {router.push('/blog/comentarios')}} >
          <a>Comentarios</a>
        </li>
        <li onClick={() => {router.push('/blog/diseno')}}>
          <a>Diseño</a>
        </li>
        <li onClick={() => {router.push('/blog/tema')}}>
          <a>Tema</a>
        </li>
        <li onClick={() => {router.push('/blog/configuracion')}}>
          <a>Configuracion</a>
        </li>
        <li onClick={() => {router.push('/blog/lectura')}}>
          <a>Lista de lectura</a>
        </li>
      </ul>

      <div className={styles.linea}/>

      <p className={styles.verblog}><a onClick={() => {router.push('/')}} >Ver blog</a></p>
    </nav>
  )
}