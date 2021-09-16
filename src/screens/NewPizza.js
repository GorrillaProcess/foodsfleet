import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addPizza } from '../actions/pizzaActions';
import Error from '../components/Error';
import Loading from '../components/Loading';
import Success from '../components/Success';


export default function NewPizza() {
    const [name,setName] = useState('');
    const [smallprice,setSmallPrice] = useState();
    const [mediumprice,setMediumPrice] = useState();
    const [largeprice,setLargePrice] = useState();
    const [image,setImage]=useState('');
    const [description , setDescription] = useState('');
    const [category,setCategory] = useState('');
    const dispatch = useDispatch()

    const addpizzastate=useSelector(state=>state.addPizzasReducer)
    const {success,loading,error} = addpizzastate

    function formHandler(e){
        e.preventDefault();
        const pizza = {
            name,
            image,
            description,
            category,
            prices:{
                small:smallprice,
                medium:mediumprice,
                large:largeprice
            }
        }
        console.log(pizza);
        dispatch(addPizza(pizza));
    }
    return (
        <div className="text-left shadow-lg p-3 mb-5 bg-body rounded">
            <h2>Add new pizza</h2>
            {loading && (<Loading/>)}
            {error && (<Error error="Something went wrong!"/>)}
            {success && (<Success success="New pizza added successfully"/>)}

            <form onSubmit={formHandler}>
                <input className="form-control" type="text" placeholder="Pizza" value={name} onChange={(e)=>{setName(e.target.value)}}/>
                <input className="form-control" type="text" placeholder="Small price" value={smallprice} onChange={(e)=>{setSmallPrice(e.target.value)}}/>
                <input className="form-control" type="text" placeholder="Medium price" value={mediumprice} onChange={(e)=>{setMediumPrice(e.target.value)}}/>
                <input className="form-control" type="text" placeholder="Large price" value={largeprice} onChange={(e)=>{setLargePrice(e.target.value)}}/>
                <input className="form-control" type="text" placeholder="Category" value={category} onChange={(e)=>{setCategory(e.target.value)}}/>
                <input className="form-control" type="text" placeholder="Description" value={description} onChange={(e)=>{setDescription(e.target.value)}}/>
                <input className="form-control" type="text" placeholder="Image URL" value={image} onChange={(e)=>{setImage(e.target.value)}}/>
                <button className="btn mt-3" type="submit">Add Pizza</button>
            </form>
        </div>
    )
}
