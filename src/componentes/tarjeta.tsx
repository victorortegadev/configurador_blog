'use client'
import styles from './tarjeta.module.css'
import Link from 'next/link'
import { useContext } from 'react'
import {Contexto} from './memoria'

export default function Tarjeta({titulo ,id, borradoProp, fecha}) {

    const [borrado, setBorrado] = borradoProp

    const [memoria, setMemoria] = useContext(Contexto)

    async function  borrarEntrada (id) { 
        await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/entrada/${id}`,
            {method:'DELETE'}
        )

        setMemoria(['salir', 'listo fetch'])

        setBorrado(true)
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
                <div className={styles.borrar} onClick={()=> {
                    setMemoria(['salir', ''])

                    borrarEntrada(id) 
                } 
                }>
                    Eliminar entrada
                </div>
            </div>
        </>
    )
}