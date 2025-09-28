import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  count: 0,
  cart: [],
  sidebarOpen: false,
  AdminSidebarOpen: false,
  OrderCart: [],
  obj: {
    price: { min: "", max: "" },
    categories: [],
    rating: ""
  },
  summary_cart : '',
  Cash_deliver : false,

}

const counterSlice = createSlice({
  name: 'count',
  initialState,
  reducers: {
    increment: (state, action) => {

      state.count += 1;
      let obj = {
        title: action.payload.title,
        id: action.payload.id,
        category: action.payload.category,
        image: action.payload.image,
        price: Math.round(action.payload.price),
        totalprice: Math.round(action.payload.price),
        qty: 0,
      }


      const matchObj = state.cart.find((v) => v.id === action.payload.id)

      if (matchObj) {
        matchObj.qty += 1
        matchObj.totalprice += Math.round(action.payload.price);

      }

      else {
        obj.qty += 1
        state.cart.push({ ...obj, obj })
      }


    },
    qtyincrement: (state, action) => {


      const matchObj = state.cart.find((v) => v.id === action.payload.id)

      if (matchObj) {
        state.count += 1
        matchObj.qty += 1
        matchObj.totalprice += Math.round(action.payload.price);
      }
    },

    qtydecrement: (state, action) => {


      const matchObj = state.cart.find((v) => v.id === action.payload.id)

      if (matchObj) {
        state.count -= 1
        matchObj.qty -= 1
        matchObj.totalprice -= Math.round(action.payload.price);
      }
    },
    remove: (state, action) => {

      state.cart = state.cart.filter((v) => v.id !== action.payload.id)
      state.count -= action.payload.qty;
    },
    clearCart: (state, action) => {
      state.cart.length = 0;
      state.count = 0;
    },

    openSidebar: (state) => {
      state.sidebarOpen = true;

    },
    closeSidebar: (state) => {
      state.sidebarOpen = false;
    },

    openAdminSidebar: (state) => {
      state.AdminSidebarOpen = true;

    },
    closeAdminSidebar: (state) => {
      state.AdminSidebarOpen = false;
    },

    item: (state, action) => {      
      state.OrderCart = action.payload
      console.log(state.OrderCart);
      

    },
    setCash: (state, action) => {
      state.Cash_deliver = action.payload;
    },
   

  summary : (state,action)=>{
    state.summary_cart = action.payload;
    state.summary_cart.qty = 1;
    state.summary_cart.totalprice = action.payload.price
  }


  }
})

export const { increment, qtydecrement, qtyincrement, remove, clearCart, openSidebar, closeSidebar, item, openAdminSidebar, closeAdminSidebar,setCash,summary } = counterSlice.actions;
export default counterSlice.reducer;