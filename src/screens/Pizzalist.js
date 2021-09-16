import React, { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { deletePizza, getAllPizzas } from '../actions/pizzaActions';
import Error from '../components/Error';
import Loading from '../components/Loading';
import Search from '../components/Search';
import {Link} from "react-router-dom";


export default function Pizzalist() {
    const dispatch = useDispatch()
    const pizzasstate = useSelector(state=>state.getAllPizzasReducer);
    const {pizzas , error, loading}=pizzasstate;
    useEffect(()=>{
        dispatch(getAllPizzas())
      },[])
    return (
        <div>
            <h2>Pizza List</h2>
            {loading && (<Loading/>)}
            {error && (<Error error="Something went wrong!"/>)}
            <table className="table table-bordered table-responsive-sm">
            <thead className="table-dark">
                <tr>
                    <th>Name</th>
                    <th>Prices</th>
                    <th>Category</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
            {pizzas && pizzas.map(pizza=>{
                return <tr>
                    <td>{pizza.name}</td>
                    <td>Small:{pizza.prices[0]['small']} <br/>
                    Medium:{pizza.prices[0]['medium']} <br/>
                    Large:{pizza.prices[0]['large']}
                    </td>
                    <td>{pizza.category}</td>
                    <td>
                        <i className="fa fa-trash m-1" onClick={()=>{dispatch(deletePizza(pizza._id))}}></i>
                        <Link to={`/admin/editpizza/${pizza._id}`}><i className="fa fa-edit m-1"></i></Link>
                    </td>
                </tr>
            })}
            </tbody>
            
            </table>
            
        </div>
    )
}
