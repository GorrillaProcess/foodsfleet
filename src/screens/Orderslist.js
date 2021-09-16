import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deliverOrder, getAllOrders } from '../actions/orderActions'
import Error from '../components/Error'
import Loading from '../components/Loading'
import Search from '../components/Search'

export default function Orderslist() {
    const dispatch = useDispatch();
    const getorderstate = useSelector(state=>state.getAllOrdersReducer)
    const {loading,error,orders} = getorderstate
    useEffect(()=>{
        dispatch(getAllOrders())
    },[])
    return (
        <div>
            {loading && (<Loading/>)}
            {error && (<Error error="Something went wrong!"/>)}
            <table className="table table-striped table-bordered table-responsive-sm">
                <thead className="table-dark">
                <tr>
                    <th>Order ID</th>
                    <th>Email</th>
                    <th>User ID</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                    {orders && (orders.map(order=>{
                        return <tr>
                            <td>{order._id}</td>
                            <td>{order.email}</td>
                            <td>{order.userid}</td>
                            <td>{order.orderAmount}</td>
                            <td>{order.createdAt.substring(0,10)}</td>
                            <td>
                                {order.isDelivered? (<h3>Delivered</h3>):(<button className="btn" onClick={()=>{dispatch(deliverOrder(order._id))}}>Deliver</button>)}
                            </td>
                        </tr>
                    }))}
                </tbody>
            </table>
        </div>
    )
}
