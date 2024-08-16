import {useState,useCallback} from 'react'


export default ()=>{
    const [counter,setCounter] = useState(1);
    const setNumber = useCallback(
        (num:number)=>setCounter(
            (c)=>c = num
        )
    ,[])
    return {counter,setNumber};
}