import React, { ReactElement } from 'react'

const SidebarItem = ({icon,text}:{icon:ReactElement,text:string}) => {
  return (
    <div className=''>
        <span className='flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded-lg transition-all duration-200'>{icon} {text}</span>
      
    </div>
  )
}

export default SidebarItem
