import React, { useState } from 'react'
const hocFunction = (Children)=>{
const Hoc = () => {
    const [count,setCount] = useState(0)
    const increase = ()=>{
        setCount(count+1);
    }

  return (
    <Children count={count}  increase={increase}/>
  )
}
return Hoc
}

export default hocFunction