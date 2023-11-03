import {useState,useCallback} from 'react'



export default ()=>{
    const [token,setToken] = useState('shopToken');
    const handleToken = useCallback((str:string)=>{
        setToken((s)=>s = str)
    },[])
    return {token,handleToken};
}