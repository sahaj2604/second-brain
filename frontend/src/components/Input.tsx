import React from 'react'

const Input = ({placeholder,inputref}:{placeholder:string,inputref?:any}) => {
  return (
    <input type="text" className='py-2 px-5 rounded-lg border border-gray-600' placeholder={placeholder} ref={inputref}/>
  )
}

export default Input
