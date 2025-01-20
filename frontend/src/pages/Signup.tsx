import Input from '../components/Input'
import { Button } from '../components/Button'
import { useRef } from 'react'
import axios from 'axios';
import { BACKEND_URL } from '../config';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate=useNavigate();
    const usernameRef=useRef<HTMLInputElement>();
    const passwordRef=useRef<HTMLInputElement>();
    async function signup() {
        const username=usernameRef?.current?.value;
        const password=passwordRef?.current?.value;
        const response=await axios.post(`${BACKEND_URL}/api/v1/signup`,{username,password});
        if(response.data.success){
            alert('Signed Up')
            navigate("/signin")
        }
    }
  return (
    <div className='h-screen flex items-center justify-center bg-gray-800'>
        <div className='bg-white gap-5 flex flex-col p-7 px-8 rounded-lg'>
            <Input placeholder='username' inputref={usernameRef}/>
            <Input placeholder='password'inputref={passwordRef}/>
            <div className='text-center'>
                <Button onClick={signup} variant='primary' text='Signup' size='md' fullwidth={true} loading={false}/>
            </div>
        </div>
    </div>
  )
}

export default Signup
