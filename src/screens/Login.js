import React, { useState, useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { loginUser } from '../actions/userActions';
import Error from '../components/Error';
import Loading from '../components/Loading';



export default function Login() {
    const [password, setPassword] = useState('');
    const [email, setMail] = useState('');
    const loginstate = useSelector(state=>state.loginUserReducer)
    const {error,loading} = loginstate
    const dispatch=useDispatch();
    useEffect(()=>{
        if(localStorage.getItem('currentUser')){
            window.location.href='/'
        }
    },[])
    function login(){
        const user={email,password}
        dispatch(loginUser(user))
    }

    return (
        <div>
            <div className="row justify-content-center mt-5">

                <div className="col-md-5 mt-5 text-start shadow-lg p-3 mb-5 bg-body rounded">
                    <h2 className="m-2 text-center" style={{ fontSize: "35px" }}>Login</h2>
                    {loading && (<Loading/>)}
                    {error && (<Error error="Invalid Username or Password"/>)}
                    <div>
                        <input required type="text" placeholder="Email" className="form-control" value={email} onChange={(e)=>{setMail(e.target.value)}}/>
                        <input type="password" placeholder="Password" className="form-control" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                        
                        <button onClick={login} className="btn mt-3">LOGIN</button>
                        
                    </div>
                    <a href="/register" style={{color:"black"}} className="m-1">Don't have an account?</a>
                    </div>
</div>
                </div>
    )
}
