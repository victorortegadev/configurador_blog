"use client"
import {signIn, useSession} from "next-auth/react"

export default function Page() {

   //const {data: session} = useSession()

   
    return (
        
        <p onClick={()=> {signIn()}}>
            Sing In
        </p>
    )
}        
