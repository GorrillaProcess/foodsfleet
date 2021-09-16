import React , {useEffect}from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { getUserOrders } from '../actions/orderActions'
import Error from '../components/Error'
import Loading from '../components/Loading'
import Success from '../components/Success'
import AOS from 'aos'
import 'aos/dist/aos.css';



export default function Orders() {
    AOS.init()
    const dispatch = useDispatch()
    const orderstate=useSelector(state => state.getUserOrdersReducer)
    const {orders,error,loading} = orderstate
    useEffect(()=>{
        dispatch(getUserOrders())
    },[])
    return (
        <div className="row justify-content-center" style={{display:"flex"}}>
            <h2 style={{fontSize:"35px"}}>My Orders</h2>
            <hr/>
            {loading && <Loading/>}
            {error && <Error error="Something went wrong!"/>}
            {orders && orders.map(order=>{
                return <div className="col-md-8 m-2 p-1" data-aos="fade-down" style={{backgroundColor:"red",color:"white"}}>
                    <div className="flex-container" style={{display:"flex"}}>
                    <div className="text-start w-100 m-1">
                        <h2 style={{fontSize:"25px"}}>Items</h2>
                        <hr/>
                    {order.orderItems.map(item=>{
                        return <div>
                            <p>{item.name} [{item.varient}]  </p>
                            </div>
                    })} </div>
                    <div className="text-start w-100 m-1">
                        <h2 style={{fontSize:"25px"}}>Address</h2>
                        <hr/>
                        <p>Street: {order.shippingAddress.street}</p>
                        <p>City: {order.shippingAddress.city}</p>
                        <p>Country: {order.shippingAddress.country}</p>
                        <p>Postal Code: {order.shippingAddress.pincode}</p>
                     </div>
                     <div className="text-start w-100 m-1"> 
                    <h2 style={{fontSize:"25px"}}>Order Info</h2>
                    <hr/>
                    <p>Order Amount: {order.orderAmount} BGN</p>
                    <p>Date: {order.createdAt.substring(0,10)}</p>
                    <p>Transaction #: {order.transactionId}</p>
                    <p>Order #: {order._id}</p>
                    </div>
                    </div>

                </div>
            })}
        </div>
    )
}
