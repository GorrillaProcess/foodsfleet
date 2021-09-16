import React from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { addToCart } from '../actions/cartActions';
import { deleteFromCart } from '../actions/cartActions';
import Checkout from '../components/Checkout';
import AOS from 'aos'
import 'aos/dist/aos.css';



export default function Cart(){
  AOS.init({
    duration:1000
  })
  const cartstate = useSelector(state=>state.cartReducer);
  const {cartItems} = cartstate;
  let subtotal = cartItems.reduce((x,item)=>x+item.price,0)
  const dispatch = useDispatch() 
  return (
    <div>
    <div className="row justify-content-sm-center p-2" data-aos="fade-down"> 
    <div className="col-md-6">
      <h2 style={{fontSize:'40px'}}>My Cart</h2>
      {cartItems.map(item=>{
          return <div className="flex-container" >
        <div className="text-start m-1" style={{display:"flex"}}>
          <div style={{display:"inline"}} className="text-start">
        <h5>{item.name} [{item.varient}]</h5>
        <h5>Price: {item.price} BGN</h5>
        <h5 style={{display:"inline"}}>Quantity: </h5>
        <i className="fa fa-plus" onClick={()=>{dispatch(addToCart(item,item.quantity+1,item.varient))}} aria-hidden="true"></i>
        <b>{item.quantity}</b>
        <i className="fa fa-minus" onClick={()=>{dispatch(addToCart(item,item.quantity-1,item.varient))}} aria-hidden="true"></i>
      </div>
      <div className="text-end m-120">
        <div className="m-1 w-100">
        <img src={item.image} style={{height:"80px"}}/>
        </div>
        <div className="m-1 w-100">
        <i className="fa fa-trash mt-5" onClick={()=>{dispatch(deleteFromCart(item))}} aria-hidden="true"></i>
        </div>
      </div>
      </div>
      
        <hr/>
        </div>    
    })}
    </div>
    <div className="col-md-4 text-end">
      <h2 style={{fontSize:"30px"}}>Total: {subtotal} BGN</h2>
      <Checkout subtotal={subtotal}/>
    </div>
    </div>
    </div>
  )
}
