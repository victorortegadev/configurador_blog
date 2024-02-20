'use client'
import { useRouter } from 'next/navigation'
import styles from './tarjeta.module.css'

export default function Tarjeta({titulo ,id, borradoProp, fecha}) {

    const router = useRouter()

    const [borrado, setBorrado] = borradoProp

    async function  borrarEntrada (id) {
        const response = await fetch(
            `http://localhost:3001/api/entrada/${id}`,
            {method:'DELETE'}
        )
        const respuesta = await response.json()
        console.log(respuesta.respuesta)
    }

    return (
        <>       
                <div className={styles.tarjeta}>
                    <div onClick={()=> {router.push(`/edit/${id}`)} }  className={styles.datos}>
                        <div className={styles.inicial}>{ titulo? titulo.charAt(0).toUpperCase() : 'S'}</div>
                        <div className={styles.info}>
                            <p>{titulo? titulo : '(sin titulo)'}</p>
                            <p>{!fecha ? 'no fecha' : fecha}</p>
                        </div>
                    </div>
                    <div className={styles.borrar} onClick={()=> { borrarEntrada(id); setBorrado(true) } }>
                        borrar entrada
                    </div>
                </div>
        </>
    )
}