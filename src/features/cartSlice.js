import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cartItems: [],
  numItemsInCart: 0,
  cartTotal: 0,
  shipping: 500,
  tax: 0,
  orderTotal: 0,
  formResults: null,
  localOrder: [],
  mode: false,
  qty: 0,
  user: null,
};

export const getCartFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("cart")) || initialState;
};

const cartSlice = createSlice({
  name: "cart",
  initialState: getCartFromLocalStorage(),
  reducers: {
    deleteProduct: (state, { payload }) => {
      state.localOrder = state.localOrder.filter((i) => {
        return i.id !== payload;
      });
      console.log(state.localOrder);
      localStorage.setItem("cart", JSON.stringify(state));
      toast.error("product removed");
    },
    quantityCounter: (state) => {
      let qty = 0;
      state.localOrder.map((i) => {
        qty += i.amount;
      });
      state.qty = qty;
    },
    search: (state, { payload }) => {
      state.formResults = [payload];
    },
    modeChanger: (state, { payload }) => {
      // state.mode.pop();
      state.mode = payload;
    },
    editProduct: (state, { payload }) => {
      const { id, amount } = payload;
      const item = state.localOrder.find((i) => i.id === id);
      item.amount = amount;
      localStorage.setItem("cart", JSON.stringify(state));
      toast.info("quantity of product updated");
    },
    editItem: (state, { payload }) => {
      const { cartId, amount } = payload;
      const item = state.cartItems.find((i) => i.cartId === cartId);
      state.numItemsInCart += amount - item.amount;
      state.cartTotal += item.price * (amount - item.amount);
      item.amount = amount;
      cartSlice.caseReducers.calculateTotals(state);
      toast.success("Cart have updated");
    },
    login: (state, { payload }) => {
      state.user = payload;
      localStorage.setItem("user", JSON.stringify(state));
    },
    logout: (state) => {
      state.user = null;
      localStorage.setItem("user", JSON.stringify(initialState));
    },
    addProduct: (state, { payload }) => {
      const data = payload;
      console.log(data);
      const item = state.localOrder.find((i) => i.id === data.id);
      if (item) {
        item.amount += data.amount;
        toast.info("Amount of the product was changed");
      } else {
        state.localOrder.push(data);
        toast.success("The product added to your cart");
      }
      localStorage.setItem("cart", JSON.stringify(state));
    },
    addItem: (state, { payload }) => {
      //   console.log(payload);
      const { product } = payload;
      const item = state.cartItems.find((i) => i.cartId === product.cartId);
      if (item) {
        item.amount += product.amount;
      } else {
        state.cartItems.push(product);
      }

      state.numItemsInCart += product.amount;
      state.cartTotal += product.price * product.amount;
      cartSlice.caseReducers.calculateTotals(state);
      toast.success("Item have added to cart");
    },
    clearCart: (state) => {
      localStorage.setItem("cart", JSON.stringify(initialState));
      return initialState;
    },

    removeItem: (state, { payload }) => {
      const { cartId } = payload;
      const product = state.cartItems.find((i) => i.cartId === cartId);
      state.cartItems = state.cartItems.filter((i) => i.cartId !== cartId);
      state.numItemsInCart -= product.amount;
      state.cartTotal -= product.price * product.amount;
      cartSlice.caseReducers.calculateTotals(state);
      toast.error("Item have removed from cart");
    },
    calculateTotals: (state) => {
      state.cartTotal = 0;
      state.localOrder.map((i) => {
        state.cartTotal += i.price * i.amount;
      });
      state.tax = 0.1 * state.cartTotal;
      state.orderTotal = state.cartTotal + state.shipping + state.tax;
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const {
  deleteProduct,
  clearCart,
  removeItem,
  editProduct,
  search,
  addProduct,
  modeChanger,
  quantityCounter,
  calculateTotals,
  login,
  logout,
} = cartSlice.actions;

export default cartSlice.reducer;
