'use client'
import Header from "@/componentes/Header";
import Lateral from "@/componentes/Lateral";
import Main from "@/componentes/Main";
import styles from './marco.module.css'
import { useState } from "react";


export default function Sector1({ children }) {

  const [animacion, setAnimacion] = useState(['', '', 'abierto'])

  return (
    <>
      <Header  onAction = {[animacion, setAnimacion]}/>
      <div className={styles.marcobajo}>
        <Lateral 
          onAction = {[animacion, setAnimacion]}
        />
        <Main
          onAction = {[animacion, setAnimacion]} 
          children= {children}
        />
      </div>
    </>   
  )
}
