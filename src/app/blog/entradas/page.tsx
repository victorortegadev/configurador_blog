'use client'
import {useEffect, useState } from 'react'
import styles from'./entradas.module.css'
import Tarjeta from '../../../componentes/tarjeta'

export default function Entradas() {

    const [entradas, setEntradas] = useState([])
    const [borrado, setBorrado] = useState(false)

    const [loader, setLoader] = useState(true)

    async function  pedirEntradas  () { 
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/entradas`)
      
        const entradas = await response.json()
       return entradas
    }

    useEffect(()=> {pedirEntradas().then(list=> { setEntradas(list); setLoader(false); setBorrado(false) }) }, [borrado]) 

    return (
        <>
            <div style={{display:entradas? 'block' : 'none'}} className={styles.entradas}>          
                { 
                    entradas.map( (entrada) => {return( 
                            <div key={entrada.id} style={{marginTop: entradas[0].id == entrada.id ? '' : '.5rem'}}> 
                                <Tarjeta borradoProp={[borrado, setBorrado]} {...entrada} /> 
                            </div>
                        )}
                    ) 
                }
                <div style={{display:entradas.length <= 0 && !loader? 'block' : 'none'}} className={styles.no_entradas}>
                    <p> No hay entradas</p><p>Las entradas que crees aparecerán aquí</p>
                </div>
            </div>
            <div className={styles.contenedor_loader} style={{display:loader? 'block' : 'none'}}>
                <div>
                    <div className={styles.rueda}></div>
                </div>
                <div className={styles.cargando}>Cargando...</div>
            </div>
        </>
    )
}


