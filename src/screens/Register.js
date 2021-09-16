import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../actions/userActions';
import Error from '../components/Error';
import Loading from '../components/Loading';
import Success from '../components/Success';



export default function Register() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setMail] = useState('');
    const [confirm, setConfirm] = useState('');
    const registerstate = useSelector(state=>state.registerUserReducer)
    const {error,loading,success}= registerstate

    const dispatch = useDispatch();
    function register() {
        if (password != confirm) {
            alert("Passwords not matched")
        } else {
            const user = {
                name: name,
                email: email,
                password: password
            }
            console.log(user);
            dispatch(registerUser(user))
            window.location.href='/login'
        }
    }
    return (
        <div>
            <div className="row justify-content-center mt-5">

                <div className="col-md-5 mt-5 text-start shadow-lg p-3 mb-5 bg-body rounded">
                    <h2 className="m-2 text-center" style={{ fontSize: "35px" }}>Register</h2>
                    {loading && (<Loading/>)}
                    {success && (<Success success="User Registered Successfully!"/>)}
                    {error && (<Error error="Email already exist"/>)}
                    <div>

                                <input required type="text" placeholder="Name" className="form-control" value={name} onChange={(e) => { setName(e.target.value) }} />
                                <input required type="text" placeholder="Email" className="form-control" value={email} onChange={(e) => { setMail(e.target.value) }} />
                                <input type="password" placeholder="Password" className="form-control" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                                <input type="password" placeholder="Confirm Password" className="form-control" value={confirm} onChange={(e) => { setConfirm(e.target.value) }} />
                                <button onClick={register} className="btn mt-3">REGISTER</button>
                            </div>
                            <a href='/login' style={{color:"black"}} className="m-1">Click Here to Login</a>
                </div>
            </div>
        </div>
    )
}
