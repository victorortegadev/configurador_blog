'use client'
import { useEffect, useState } from 'react'
import styles from'./entradas.module.css'
import Tarjeta from '@/componentes/tarjeta'

export default function Entradas() {

    const [entradas, setEntradas] = useState([])
    const [borrado, setBorrado] = useState(false)

    async function  pedirEntradas  () { 
        const response = await fetch('http://localhost:3001/api/entradas')
      
        const entradas = await response.json()
       return entradas
    }

    useEffect(()=> {pedirEntradas().then(list=> { setEntradas(list); setBorrado(false) }) }, [borrado]) 

    return (
        <>
            <div className={styles.entradas}>          
                { 
                    entradas.map(
                        entrada => <div key={entrada.id} style={{marginTop: entradas[0].id == entrada.id ? '' : '.5rem'}}> <Tarjeta borradoProp={[borrado, setBorrado]} {...entrada} /> </div>
                    ) 
                }
            </div>
        </>
    )
}


