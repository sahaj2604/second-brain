import axios from 'axios';
import { useEffect, useState } from 'react'
import { BACKEND_URL } from '../config';

export const useContent = () => {
  const [content, setContent] = useState([]);
  useEffect(()=>{
    const interval=setInterval(() => {
        axios.get(`${BACKEND_URL}/api/v1/content`,{withCredentials:true})
        .then((response)=>{
            setContent(response.data.contents);
        })

        return () => {
            clearInterval(interval)
          }
    }, 2000);
    
  },[])
  return content;
}
