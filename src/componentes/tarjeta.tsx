'use client'
import { useRouter } from 'next/navigation'
import styles from './tarjeta.module.css'
import Link from 'next/link'

export default function Tarjeta({titulo ,id, borradoProp, fecha}) {

    const router = useRouter()

    const [borrado, setBorrado] = borradoProp

    async function  borrarEntrada (id) { 
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL_ONRENDER}/entrada/${id}`,
            {method:'DELETE'}
        )
        const respuesta = await response.json()
        console.log(respuesta.respuesta)
    }

    return (
        <>       
                <div className={styles.tarjeta}>
                    <Link href={`/edit/${id}`}  className={styles.datos}>
                        <div className={styles.inicial}>{ titulo? titulo.charAt(0).toUpperCase() : 'S'}</div>
                        <div className={styles.info}>
                            <p>{titulo? titulo : '(sin titulo)'}</p>
                            <p>{!fecha ? 'no fecha' : fecha}</p>
                        </div>
                    </Link>
                    <div className={styles.borrar} onClick={()=> { borrarEntrada(id); setBorrado(true) } }>
                        borrar entrada
                    </div>
                </div>
        </>
    )
}