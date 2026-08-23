import {
  createSlice,
  configureStore,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { defaultSerializeQueryArgs } from "@reduxjs/toolkit/query";
import { current } from "@reduxjs/toolkit";
import toast, { Toaster } from "react-hot-toast";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));

      const productsList = [];
      querySnapshot.forEach((doc) => {
        productsList.push({ id: doc.id, ...doc.data() });
      });
      return productsList;
    } catch (error) {
      throw error;
    }
  },
);
export const sendData = createAsyncThunk("products/send", async () => {
  fetch();
});
export const fetchCats = createAsyncThunk("categories/fetchCats", async () => {
  const querySnapshot = await getDocs(collection(db, "categories"));
  const categoriesList = [];
  querySnapshot.forEach((cat) =>
    categoriesList.push({ id: cat.id, ...cat.data() }),
  );
  return categoriesList;
});
const productsSlice = createSlice({
  name: "products",
  initialState: { categories: [], items: [], loading: false },
  reducers: {
    toggleAddedState(state, action) {
      state.items.map((item) => {
        if (item.id === action.payload) {
          item.isAdded = !item.isAdded;
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCats.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      });
  },
});
export const productsActions = productsSlice.actions;
export const updateCart = createAsyncThunk("cart/updateCart", () => {
  const cartItems = productsSlice.reducer.items.filter((item) => item.isAdded);
  return cartItems;
});

const cart = createSlice({
  name: "cart",
  initialState: { items: [], totalItemsCount: 0 },
  reducers: {
    addToCart(state, action) {
      const targetItem = action.payload;
      const existingItem = state.items.find((item) => item.id == targetItem.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
        state.totalItemsCount += 1;
      }
    },
    removeFromCart(state, action) {
      const targetItem = action.payload;
      const existingItem = state.items.find(
        (item) => item.id === targetItem.id,
      );
      state.items = state.items.filter((item) => item.id !== existingItem.id);
      state.totalItemsCount -= 1;
    },

    handleQuantity(state, action) {
      const { id, value } = action.payload;
      const existingItem = state.items.find((item) => item.id == id);
      if (existingItem) {
        existingItem.quantity = Math.max(1, value || 1);
      }
    },
  },
});
export const cartActions = cart.actions;
const store = configureStore({
  reducer: { products: productsSlice.reducer, cart: cart.reducer },
});
export default store;
