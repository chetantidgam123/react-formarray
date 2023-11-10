import React, { useState } from 'react'
import hocFunction from './Hoc'

const B = (props) => {
    const {count,increase} = props
  return (
    <button onMouseOver={increase}>mouseOver Button {count}</button>
  )
}

export default hocFunction(B)