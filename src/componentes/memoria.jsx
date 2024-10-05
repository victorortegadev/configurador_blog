'use client'
import {  createContext, useEffect, useState } from "react";
import style from './memoria.module.css'

export const Contexto = createContext(null)

function Memoria ({children}) {

    const [memoria, setMemoria] = useState(['',''])

    useEffect(()=> {
        if(memoria[0] == 'salir'){
            setTimeout(()=>{
                if(memoria[1] == 'listo fetch'){
                    setMemoria(['entrar', ''])
                }
            },300)
        }
    },[memoria])

    return(
        <Contexto.Provider value={[memoria, setMemoria]}>
            {children}
            <div className={`${style.nota} ${memoria[0] == 'salir'? style.aniuno : 
                memoria[0] == 'entrar'?   style.anidos : ''}
                `} 
            >
                {memoria[0] == 'entrar'? 'La entrada ha sido eliminada' : 'Eliminando entrada'}      
            </div>
        </Contexto.Provider>
    )
}
export default Memoria