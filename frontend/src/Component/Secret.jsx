import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutThunk } from '../redux/Reducer/auth';


export default function Secret() {
    const dispatch = useDispatch();


  return (
    <div className="not-found">
        <h2>Welcome Back</h2>
        <p>You've logged in successfully</p>
        <button onClick={() => dispatch(logoutThunk())}>Logout</button>

    </div>
  )
}
