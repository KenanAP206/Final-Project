import { useEffect, useState } from "react";
import { createContext } from "react";
export const showContext = createContext({});
import axios from "axios"
function ShowProvider({children}){
    let [shows,setShows]=useState([])
    let [loading,setLoading]=useState(true)
    useEffect(()=>{
        axios.get("http://localhost:3000/shows")
        .then(res=>{
            setShows(res.data)
            setLoading(false)
        })
    },[])

    let value={
        shows,
        loading,
        setLoading,
        setShows

    }

    return <showContext.Provider value={value}>{children}</showContext.Provider>
}


export default ShowProvider