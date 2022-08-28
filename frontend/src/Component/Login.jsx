import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loginThunk } from '../redux/Reducer/auth';
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [credential, setCredential] = useState({
        email: "",
        password: "",
    });

    const auth = useSelector((state) => state.authStore.isAuthenticated);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if(auth){
            navigate("/secret")
        }

    }, [auth, navigate]);

    const handleChange = (event) => {
        const {name,value} = event.target
        setCredential((prevValue) => ({
            ...prevValue,
            [name]: value,
        }));
    }

  return (
    <div>
        <h1>Login</h1>
        
            <input type="text" name='email' placeholder='email' onChange={handleChange}/>
            <input type="text" name='password' placeholder='password' onChange={handleChange}/>
            <button type='submit' onClick={() => dispatch(loginThunk(credential))}>Login</button>
        
    </div>
  )
}
