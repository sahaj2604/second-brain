import Input from './Input'
import { Button } from './Button'
import { CloseIcon } from '../icons/CloseIcon'
import { useRef, useState } from 'react'
import axios from 'axios'
import { BACKEND_URL } from '../config'

const ContentModal = ({open,onClose}:{open:boolean,onClose:()=>void}) => {
  enum contentType{
    youtube="youtube",
    twitter="twitter"
  }
  const titleRef=useRef<HTMLInputElement>()
  const linkRef=useRef<HTMLInputElement>()
  const [type, setType] = useState(contentType.youtube)
  async function addContent() {
    const title=titleRef.current?.value;
    const link=linkRef.current?.value;
    console.log({title,link})
    await axios.post(`${BACKEND_URL}/api/v1/content`,{title,link,type},{withCredentials:true})
    onClose()
  }
  return (
     open && <div className='w-screen h-screen fixed bg-black top-0 left-0 bg-opacity-40'>
      <div className='flex items-center justify-center h-screen'>
        <span className='bg-white px-10 py-4 flex flex-col gap-2 rounded-lg w-fit'>
            <div className='flex justify-end'>
                <span   onClick={onClose} className='cursor-pointer'><CloseIcon/></span>
            </div>
            <Input placeholder='Title' inputref={titleRef}/>
            <Input placeholder='Link' inputref={linkRef}/>
            <div className='flex gap-2 my-4 justify-around'>
              <Button text='Youtube' variant={type==contentType.youtube ? 'primary' : 'secondary'} size='md' onClick={()=>setType(contentType.youtube)}/>
              <Button text='Twitter' variant={type==contentType.twitter ? 'primary' : 'secondary'} size='md' onClick={()=>setType(contentType.twitter)}/>
            </div>
            <div className='flex justify-center'>
                <Button variant='primary' text='submit' size='md' onClick={addContent}/>
            </div>
        </span>
      </div>
    </div>
  )
}

export default ContentModal
