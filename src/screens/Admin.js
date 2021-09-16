import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {Link, Route,Switch} from 'react-router-dom';
import Editpizza from './Editpizza';
import NewPizza from './NewPizza';
import Orderslist from './Orderslist';
import Pizzalist from './Pizzalist';
import Userlist from './Userlist';

export default function Admin() {
    const userstate = useSelector(state => state.loginUserReducer);
    const { currentUser } = userstate
    const dispatch = useDispatch();
    useEffect(()=>{
        if(!currentUser.isAdmin){
            window.location.href="/"
        }
    },[])
    return (
        <div>
            <div className="row justify-content-center p-3">
            <div className="col-md-10">
            <h2 style={{fontSize:"35px"}}>Admin Panel</h2>
            <ul className="adminfunctions">
                <li><Link to={'/admin/userslist'}>Users List </Link></li>
                <li><Link to={'/admin/pizzalist'}>Pizza List</Link></li>
                <li><Link to={'/admin/addpizza'}>Add new pizza</Link></li>
                <li><Link to={'/admin/orderslist'}>Orders List</Link></li>
            </ul>

            <Switch>
                <Route path={"/admin/userslist"} component={Userlist} exact/>
                <Route path={"/admin/orderslist"} component={Orderslist} exact/>
                <Route path={"/admin/pizzalist"} component={Pizzalist} exact/>
                <Route path={"/admin/addpizza"} component={NewPizza} exact/>
                <Route path={"/admin/editpizza/:pizzaid"} component={Editpizza} exact/>
            </Switch>
            </div>
            </div>
            
        </div>
    )
}
