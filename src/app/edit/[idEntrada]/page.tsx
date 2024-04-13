'use client'
import {useEffect, useRef, useState } from "react"
import style from './edit.module.css'

import { useQuill } from "react-quilljs"
import 'quill/dist/quill.snow.css'
import toolbar from '../../../componentes/toolbar'
import './edit.css'

export default function PageSector2({params}) {

    const tituloRef = useRef(null)
    const [entrada, setEntrada] = useState({
        fecha: '',
        id:0 ,
        titulo:'',
        texto: '',
        textoplano: '' ,
        textoplanovisible: ''
    })

    const [colorTitulo, setColorTitulo] = useState('grey')
    const [marcadorEstado, setMarcadorEstado] = useState('invisible')

    const [acordeon, setAcordeon]= useState(0)

    const {quill, quillRef} = useQuill({
        modules: {
            toolbar: toolbar
        }
    })

    async function  pedirEntrada (id) { 
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL_ONRENDER}/entrada/${id}`)
      
        const entrada = await response.json()
        return entrada
    }

    async function  actualizarEntrada (id, entrada) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL_ONRENDER}/entrada/${id}`, 
            {   
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(entrada)
            }
        )
      
        const entradaActualizada = await response.json()
        return entradaActualizada
    }

    useEffect(() => { pedirEntrada(params.idEntrada).then(entrada2=> { setEntrada(entrada2)} )}, [])
    useEffect(() => { quill && entrada.texto ? quill.setContents(JSON.parse(entrada.texto)) : '' }, [quill? quill : '', entrada])

    return (
        <div className={style.editor}>
            <div className={style.alto}>

                <div className={style.tituloS}>
                    <div className={style.leyenda} style={{transition:' all 2s' ,color:colorTitulo}}>Título</div>
                    <input  
                        className={style.input} 
                        defaultValue={entrada.titulo} ref={tituloRef}  
                        type="text" name="title"
                        onFocus={()=> {setColorTitulo('blue'), setMarcadorEstado('visible')} }
                        onBlur={()=> {setColorTitulo('grey'), setMarcadorEstado('invisible')} }
                    />
                    <div className={/*`${style.marcador} ${*/marcadorEstado == 'visible' ? style.marcadorvisible : style.marcadorinvisible/* }`*/}></div>
                    <div className={style.subrayado}></div>
                </div>

                <div 
                    className={style.botonactualizar} 
                    onClick={() =>
                        {
                            actualizarEntrada(params.idEntrada,
                                {
                                    id: params.idEntrada,
                                    titulo: tituloRef.current.value,
                                    texto: JSON.stringify(quill.getContents()).replaceAll('\'', '\'\''),
                                    textoplano: ( ' ' + quill.getText().replaceAll('/', ' ').replaceAll('|', ' ').replaceAll('\n', ' ').replaceAll('\t', ' ').replaceAll('\\', ' ').replaceAll('\r', ' ').replaceAll('\v', '').replaceAll('\'', ' ').replaceAll('\"', ' ').replaceAll(",", " ").replaceAll(".", " ")  + ' ' ).toLowerCase(),
                                    textoplanovisible: quill.getText().replaceAll('\'', '\'\'')
                                }
                            ) 
                        } 
                    }
                >   
                    Actualizar
                </div>  
            </div>
            <div className={style.bajo}>
                <div className={style.nota}>
                    <div className={style.quillref} ref={quillRef}>
                       
                    </div>
                </div>

                <div className={style.configuraciones}>
                    <div className={style.acordeon}>
                        <p className={style.p}>Configuración de la entrada</p>
                        <div className={style.div} onClick={()=> {acordeon == 1? setAcordeon(0) : setAcordeon(1)} } >
                            <div className={style.divhijo}> 
                                <svg className={`${style.svg} ${acordeon == 1? style.girar : ''}`} focusable="false" viewBox="0 0 24 24">
                                    <path d=  "M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z">
                                    </path>
                                </svg>
                                <p>Etiquetas</p>
                            </div>
                            <div className={`${style.contenido} ${acordeon  == 1? style.abrir : '' }`}></div>
                        </div>
                        <div className={style.div} onClick={()=> {acordeon == 2? setAcordeon(0) : setAcordeon(2)} } >
                            <div className={style.divhijo}> 
                                <svg className={`${style.svg} ${acordeon == 2? style.girar : ''}`} focusable="false" viewBox="0 0 24 24">
                                    <path d=  "M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z">
                                    </path>
                                </svg>
                                <p>Fecha de publicacion</p>
                            </div>
                            <div className={`${style.contenido} ${acordeon  == 2? style.abrir : '' }`}></div>
                        </div>
                        <div className={style.div} onClick={()=> {acordeon == 3? setAcordeon(0) : setAcordeon(3)} } >
                            <div className={style.divhijo}> 
                                <svg className={`${style.svg} ${acordeon == 3? style.girar : ''}`} focusable="false" viewBox="0 0 24 24">
                                    <path d=  "M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z">
                                    </path>
                                </svg>
                                <p>Enlace permanente</p>
                            </div>
                            <div className={`${style.contenido} ${acordeon  == 3? style.abrir : '' }`}></div>
                        </div>
                        <div className={style.div} onClick={()=> {acordeon == 4? setAcordeon(0) : setAcordeon(4)} } >
                            <div className={style.divhijo}> 
                                <svg className={`${style.svg} ${acordeon == 4? style.girar : ''}`} focusable="false" viewBox="0 0 24 24">
                                    <path d=  "M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z">
                                    </path>
                                </svg>
                                <p>Ubicacion</p>
                            </div>
                            <div className={`${style.contenido} ${acordeon  == 4? style.abrir : '' }`}></div>
                        </div>
                        <div style={{border: 'none'}} className={style.div} onClick={()=> {acordeon == 5? setAcordeon(0) : setAcordeon(5)} } >
                            <div className={style.divhijo}> 
                                <svg className={`${style.svg} ${acordeon == 5? style.girar : ''}`} focusable="false" viewBox="0 0 24 24">
                                    <path d=  "M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z">
                                    </path>
                                </svg>
                                <p>Opciones</p>
                            </div>
                            <div className={`${style.contenido} ${acordeon  == 5? style.abrir : '' }`}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

