import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  remove,
  decreaseCart,
  increaseCart,
  clearCartThunk,
  getTotals,
  removeItemThunk,
  getCartThunk,
} from "../redux/Reducer/cart";
import { ChevronDown, ChevronUp, Testing } from "../data/iconData";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cartItems);

  useEffect(() => {
    dispatch(getCartThunk());
  }, [dispatch]);

  return (
    <div className="cart-container">
      <h2>My Cart</h2>
      {cart.length === 0 ? (
        <div className="cart-empty">
          <p>Your Cart is empty</p>
          <div className="start-shopping">
            <Link to="/menu">
              <span>Start Shopping</span>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className="titles">
            <h3 className="product-title">Product</h3>
            <h3 className="price">Price</h3>
            <h3 className="quantity">Quantity</h3>
            <h3 className="total">Total</h3>
          </div>
          <div className="cart-items">
            {cart.map((product) => (
              <div key={product.id} className="cart-item">
                <div className="cart-product">
                <img
                  src={"http://localhost:8000/image/" + product.image}
                  alt={product.name}
                  srcset=""
                />
                <div className="cart-product">
                  <h3>{product.name}</h3>
                  <button
                    className="remove-btn"
                    onClick={() =>
                      dispatch(removeItemThunk(product.id, product.name))
                    }
                  >
                    Remove
                  </button>
                  </div>
                </div>
                <div className="cart-product-price">${product.price}</div>
                <div className="cart-product-quantity">
                  <button onClick={() => dispatch(decreaseCart(product))}>
                    -
                  </button>
                  <div className="count">{product.quantity}</div>
                  <button onClick={() => dispatch(increaseCart(product))}>
                    +
                  </button>
                </div>
                <div className="cart-product-total-price">
                  ${product.price * product.quantity}
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <button
              className="clear-btn"
              onClick={() => dispatch(clearCartThunk())}
            >
              Clear Cart
            </button>
            
            <div className="cart-check">
              <div className="subtotal">
                <span>Subtotal</span>
                <span className="amount">${cart.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)}</span>
              </div>
              <p>Taxes and Shipping Calculated at Checkout</p>
              <button>Checkout</button>
              <div className="continue-shopping">
                <Link to="/menu">
                  <span>Continue Shopping</span>
                </Link>
              </div>
            </div>
          </div>
         
        </div>
      )}
    </div>
  );
}
