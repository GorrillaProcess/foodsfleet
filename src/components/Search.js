import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { filterPizzas } from '../actions/pizzaActions';

export default function Search() {
    const dispatch = useDispatch();
    const [searchKey, setSearchKey] = useState('');
    const [category,setCategory] = useState("all");
    return (
        <div className="container">
            <div className="row justify-content-center shadow-lg p-3 mb-5 bg-white rounded">
                <div className="col-md-3"> 
                <input value={searchKey} onChange={(e)=>{setSearchKey(e.target.value)}} type="text" className="form-control" placeholder="Search..."/>
                </div>
                <div className="col-md-3"> 
                <select className="form-control mt-2" value={category} onChange={(e)=>{setCategory(e.target.value)}}>
                    <option value="all">All</option>
                    <option value="veg">Vegetarian</option>
                    <option value="nonveg">Non-vegetarian</option>
                </select>
                </div>
                <div className="col-md-3"> 
                <button className="btn mt-2" onClick={()=>{dispatch(filterPizzas(searchKey,category))}}>SEARCH</button>
                </div>

            </div>
        </div>
    )
}
