import React, {useState} from 'react'
import Login from './Login'
import Register from './Register'

export default function Auth() {
    const [action, setAction] = useState('register');

    if(action == 'login') {
        return <Login setAction={setAction} />
    }

    return <Register setAction={setAction} />
}