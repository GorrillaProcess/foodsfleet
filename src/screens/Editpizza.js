import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPizzaById, updatePizza } from '../actions/pizzaActions'
import { addPizza } from '../actions/pizzaActions';
import Error from '../components/Error';
import Loading from '../components/Loading';
import Success from '../components/Success';


export default function Editpizza({ match }) {
    const [name, setName] = useState('');
    const [smallprice, setSmallPrice] = useState();
    const [mediumprice, setMediumPrice] = useState();
    const [largeprice, setLargePrice] = useState();
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const getpizzabyidstate = useSelector(state => state.getPizzaByIdReducer)
    const editstate = useSelector(state=>state.updatePizzasReducer)
    const { pizza, error, loading } = getpizzabyidstate
    const {editloading,editerror,editsuccess} = editstate


    function formHandler(e) {
        e.preventDefault();
        const editedpizza = {
            _id:match.params.pizzaid,
            name,
            image,
            description,
            category,
            prices: {
                small: smallprice,
                medium: mediumprice,
                large: largeprice
            }
        }
        dispatch(updatePizza(editedpizza))
    }
    const dispatch = useDispatch();

    useEffect(() => {
        if(pizza){
            if(pizza._id===match.params.pizzaid){
                setName(pizza.name)
                setDescription(pizza.description)
                setCategory(pizza.category)
                setSmallPrice(pizza.prices[0]['small'])
                setMediumPrice(pizza.prices[0]['medium'])
                setLargePrice(pizza.prices[0]['large'])
                setImage(pizza.image)
            }else{
                dispatch(getPizzaById(match.params.pizzaid));
            }
            
        }
        else{
        dispatch(getPizzaById(match.params.pizzaid));
    }
    }, [pizza,dispatch]);
    return (
        <div className="text-left shadow-lg p-3 mb-5 bg-body rounded">
            <h2>Edit Pizza</h2>
            {loading && (<Loading />)}
            {error && (<Error error="Something went wrong!" />)}
            {editsuccess && <Success success="Pizza details edited successfully!"/>}
            {editloading && (<Loading/>)}

            <form onSubmit={formHandler}>
                <input className="form-control" type="text" placeholder="Pizza" value={name} onChange={(e) => { setName(e.target.value) }} />
                <input className="form-control" type="text" placeholder="Small price" value={smallprice} onChange={(e) => { setSmallPrice(e.target.value) }} />
                <input className="form-control" type="text" placeholder="Medium price" value={mediumprice} onChange={(e) => { setMediumPrice(e.target.value) }} />
                <input className="form-control" type="text" placeholder="Large price" value={largeprice} onChange={(e) => { setLargePrice(e.target.value) }} />
                <input className="form-control" type="text" placeholder="Category" value={category} onChange={(e) => { setCategory(e.target.value) }} />
                <input className="form-control" type="text" placeholder="Description" value={description} onChange={(e) => { setDescription(e.target.value) }} />
                <input className="form-control" type="text" placeholder="Image URL" value={image} onChange={(e) => { setImage(e.target.value) }} />
                <button className="btn mt-3" type="submit">Edit Pizza</button>
            </form>
        </div>
    )
}
