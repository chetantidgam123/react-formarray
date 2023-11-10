import React, { useState } from 'react'
import hocFunction from './Hoc'
const init = {
    name:'',
    index:''
}
const A = (props) => {
    const {count,increase} = props
    const [arr,setArray]= useState([])

    const pushele = ()=>{
        let a = [...arr]
        a.push(init)
      setArray(a)
        
    }
  return (
    <>
    <button onClick={increase}> click button {count}</button>
    <button onClick={pushele}> push</button>
    {
        arr.map((ele,i)=>{
           return (
                <div key={i}>{i}</div>
            )
        })
    }
    </>
  )
}

export default hocFunction(A)