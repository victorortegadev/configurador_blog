"use client"
import {signIn/*, useSession*/} from "next-auth/react"
/*import { useRouter } from "next/navigation"
import { useEffect } from "react"*/

export default function Page() {

    /*const {data: session} = useSession()
    const router = useRouter()
    useEffect(()=> {session? router.push('http://localhost:3000/blog/entradas') : ''}, [])*/

    return (
        <p onClick={()=> {signIn(undefined, {callbackUrl: `${process.env.NEXT_PUBLIC_URL}/blog/entradas`})}}>
            Iniciar sesión
        </p>
    )
}        
