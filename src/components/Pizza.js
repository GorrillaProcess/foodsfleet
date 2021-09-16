import React, { useState } from 'react';
import bootstrap from '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Modal } from 'react-bootstrap';
import AOS from 'aos'
import 'aos/dist/aos.css';
import ModalHeader from 'react-bootstrap/ModalHeader';
import {useDispatch,useSelector} from 'react-redux';
import {addToCart} from '../actions/cartActions';

export default function Pizza({ pizza }) {
    AOS.init({duration:1500})
    const [quantity, setQuantity] = useState(1);
    const [varient, setVarient] = useState("small");

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const dispatch = useDispatch()
    function addtocart(){
      dispatch(addToCart(pizza,quantity,varient));
    }
    return (
        <div data-aos='fade-up' className="shadow p-3 mb-5 bg-white rounded" key={pizza._id}>
            <div onClick={handleShow}>
                <h1>{pizza.name}</h1>
                <img src={pizza.image} className="img-fluid" style={{ height: "200px", width: "200px" }} />
            </div>

            <div className="flex-container">
                <div className="w-100 m-1">
                    <p>Variants</p>
                    <select className="form-control" value={varient} onChange={(e) => { setVarient(e.target.value) }}> 
                    {pizza.varients.map(varient => {
                        return <option value={varient}>{varient}</option>
                    })}
                    </select>

                </div>
                <div className="w-100 m-1">
                    <p>Quantity</p>
                    <select className="form-control" value={quantity} onChange={(e) => { setQuantity(e.target.value) }}>
                        {[...Array(10).keys()].map((x, i) => {
                            return <option value={i + 1}>{i + 1}</option>
                        })}
                    </select>
                </div>
            </div>

            <div className="flex-container">
                <div className="m-1 w-100">
                    <h1 className="mt-1">Price:{pizza.prices[0][varient] * quantity} BGN</h1>
                </div>
                <div className="m-1 w-100">
                    <button className="btn" onClick={addtocart}>Add to cart</button>
                </div>
            </div>
            <Modal show={show}>
                <Modal.Header>
                <Modal.Title>{pizza.name}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                <img src={pizza.image} style={{height:"200px", width:"200px"}} className="img-fluid"/>
                <p>{pizza.description}</p>
                </Modal.Body>

                <Modal.Footer>
                    <button className="btn" onClick={handleClose}>CLOSE</button>
                </Modal.Footer>
            </Modal>

        </div>
    )
}
