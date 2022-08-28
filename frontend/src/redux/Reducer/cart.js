import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";

const token = localStorage.getItem("TOKEN");

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
  },
  reducers: {
    add: (state, action) => {
      state.cartItems = action.payload;
    },

    decreaseCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (state.cartItems[itemIndex].quantity > 1) {
        state.cartItems[itemIndex].quantity -= 1;
      } else if (state.cartItems[itemIndex].quantity === 1) {
        const nextCartItems = state.cartItems.filter(
          (item) => item.id !== action.payload.id
        ); // item represents the state object, state.filter returns object.id that is not the same with the product.id, in order words will exclude the objects that have the same id, so that we can remove or filter that product.id from the state array
        state.cartItems = nextCartItems;
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },
    increaseCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (state.cartItems[itemIndex].quantity >= 1) {
        state.cartItems[itemIndex].quantity += 1;
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
    getTotals: (state, action) => {
     
   
    
   
    },
  },
});

// console.log(cartSlice);
export const { add, remove, decreaseCart, increaseCart, clearCart, getTotals } =
  cartSlice.actions;

export default cartSlice.reducer;

export const getCartThunk = () => async (dispatch) => {
  const response = await axios(`${process.env.REACT_APP_BACKEND}/cart`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  dispatch(add(response.data));
};

export const addCartThunk = (id, name) => async (dispatch) => {
  let cartResponse = await axios.post(
    `${process.env.REACT_APP_BACKEND}/cart`,
    {
      id,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  if (cartResponse.data === "increment") {
    toast.info(`increased ${name} quantity`, {
      position: "bottom-left",
      icon: "🦊",
    });
  } else if (cartResponse.data === "insert") {
    toast.success(`${name} added to cart`, {
      position: "bottom-left",
      icon: "🦁",
    });
  }
  const response = await axios(`${process.env.REACT_APP_BACKEND}/cart`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  dispatch(add(response.data));
};

export const removeItemThunk = (id, name) => async (dispatch) => {
  await axios.delete(`${process.env.REACT_APP_BACKEND}/cart/` + id, {
    headers: { Authorization: `Bearer ${token}` },
  });
  toast.error(`${name} removed from cart`, {
    position: "bottom-left",
    icon: "🚀",
  });
  const response = await axios(`${process.env.REACT_APP_BACKEND}/cart`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  dispatch(add(response.data));
};

export const clearCartThunk = () => async (dispatch) => {
  await axios.delete(`${process.env.REACT_APP_BACKEND}/cart`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  toast.error(`Cart cleared`, {
    position: "bottom-left",
    icon: "🚀",
  });
  dispatch(clearCart());
};

// export const getCartTotalThunk = ({cartItems}) => {
//   return cartItems.reduce((acc,val) =>{
//     acc += val.count;
//     return acc;
//   }
// )};
