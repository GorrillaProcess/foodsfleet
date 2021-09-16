import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../actions/userActions';


function Navbar() {
  const dispatch = useDispatch();
  const cartstate = useSelector(state => state.cartReducer);
  const userstate = useSelector(state => state.loginUserReducer);
  const { currentUser } = userstate
  const { cartItems } = cartstate
  return (

    <div>

      <nav className="navbar navbar-expand-lg shadow-lg p-3 mb-5 bg-white rounded">
        <div className="container-fluid">
          <a className="navbar-brand" href="/"> <img src="./foodfleet.png" style={{height:"80px",width:"80px"}} /> </a>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"><i style={{color:"black"}} className="fas fa-bars"></i></span>
          </button>
          <div className="collapse navbar-collapse " id="navbarNav" >
            <ul className="navbar-nav ms-auto">
              {currentUser ? (
              <div className="dropdown mt-1">
              <a className="dropdown-toggle" style={{color:"black"}} href="/orders" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                {currentUser.name}
              </a>
            
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <li><a className="dropdown-item" href="/orders">Orders</a></li>
                <li><a className="dropdown-item" href="/admin">Admin Panel</a></li>
                <li><li className="dropdown-item" onClick={()=>{dispatch(logoutUser())}}>Logout</li></li>
              </ul>
            </div>
        ) : (<li className="nav-item">
                <a className="nav-link" aria-current="page" href="/login">Login</a>
              </li>)}

              <li className="nav-cart">
                <a className="nav-link" href="/cart">
                  <i class="fas fa-shopping-cart"></i> {cartItems.length}</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
