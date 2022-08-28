import React from 'react';
import CartItem from './CartItem';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../redux/Reducer/cart';
import Home from './Home';
import 'react-toastify/dist/ReactToastify.css';


export default function CartContainer() {
    
    const {cartItem, total, amount} = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    if (amount < 1) {
        return (
            <section className='cart'>
                <header>
                    <h2>Your Cart</h2>
                    <h4 className='empty-cart'> is currently empty</h4>
                </header>
            </section>
        )
    }
  return (
    <section className='cart'>
    <header>
        {/* cart header */}
        <h2>Your Cart</h2>
    </header>    
    {/* cart items */}
        {/* <div>
            {cartItem.map((item, index) => {
                // CartItem of the initialstate
               return <Home 
               key={item.id} 
               index={index}
               title={item.title}
               img={item.img}
               price={item.price}
               amount={item.amount}
               />
            })}
        </div> */}
        {/* cart footer
        <div>
            <hr/>
            <div className='cart-total'>
                <h4>
                    total <span>${total}</span>
                </h4>
                <button className='clear-btn' onClick={() => dispatch(clearCart())}>clear cart</button>

            </div>
        </div> */}

</section>
  )
}
