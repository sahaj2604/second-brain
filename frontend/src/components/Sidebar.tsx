import React from 'react'
import SidebarItem from './SidebarItem'
import Twitter from '../icons/Twitter'
import Youtube from '../icons/Youtube'
import { TextIcon } from '../icons/TextIcon'
import LinkIcon from '../icons/LinkIcon'
import HashIcon from '../icons/HashIcon'
import MainLogo from './MainLogo'

const Sidebar = () => {
  return (
    <div className='h-screen fixed border-2 top-0 w-64'>
        <MainLogo/>
        <div className='p-5 flex flex-col gap-7 my-5 font-semibold text-gray-800'>
            <SidebarItem text={"Twitter"} icon={<Twitter/>}/>
            <SidebarItem text={"Youtube"} icon={<Youtube/>}/>
            <SidebarItem text={"Documents"} icon={<TextIcon/>}/>
            <SidebarItem text={"Links"} icon={<LinkIcon/>}/>
            <SidebarItem text={"Tags"} icon={<HashIcon/>}/>
        </div>
    </div>
  )
}

export default Sidebar
