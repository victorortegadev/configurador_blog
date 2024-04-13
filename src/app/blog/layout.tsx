'use client'
//import Header from "@/componentes/Header";
import Header from '../../componentes/Header';
//import Lateral from "@/componentes/Lateral";
import Lateral from '../../componentes/Lateral';
//import Main from "@/componentes/Main";
import Main from '../../componentes/Main'
import styles from './sector1.module.css'
import {useState } from "react";

export default function Sector1({ children }) {

  const [animacion, setAnimacion] = useState(['', '', 'abierto'])
  const [displayLista, setDisplayLista] = useState(false)
  const [blogIndice, setBlogIndice] = useState(0)

  return (
    <div id="marco_mayor" className={styles.marco_mayor} onClick={() => { if(displayLista){setDisplayLista(!displayLista); setBlogIndice(0)} }}>
      <Header  onAction = {[animacion, setAnimacion]}/>
        <div className={styles.marcobajo}>
          <Lateral 
            onAction = {[animacion, setAnimacion]}
            displayListaProp = {[displayLista, setDisplayLista]}
            blogIndiceProp={[blogIndice, setBlogIndice]}
          />
          <Main
            onAction = {[animacion, setAnimacion]} 
            childrenProp= {children}
          />
        </div>
    </div>   
  )
}