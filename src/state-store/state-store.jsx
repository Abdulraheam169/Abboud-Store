import {
  createSlice,
  configureStore,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { defaultSerializeQueryArgs } from "@reduxjs/toolkit/query";
import { current } from "@reduxjs/toolkit";

// export const fetchProducts = createAsyncThunk(
//   "products/fetchProducts",
//   async () => {
//     const querySnapshot = await getDocs(collection(db, "products"));
//     console.log(querySnapshot.size);
//     const productsList = [];
//     querySnapshot.forEach((doc) => {
//       productsList.push({ id: doc.id, ...doc.data() });
//     });
//     return productsList;
//   },
// );
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    try {
      console.log("جاري الاتصال بقاعدة البيانات...", db); // إذا طبع undefined فالمشكلة في ملف الكونفيغ

      const querySnapshot = await getDocs(collection(db, "products"));
      console.log("تم الاتصال! عدد المنتجات:", querySnapshot.size);

      const productsList = [];
      querySnapshot.forEach((doc) => {
        productsList.push({ id: doc.id, ...doc.data() });
      });
      return productsList;
    } catch (error) {
      console.error("خطأ كارثي من فايربيز:", error);
      throw error; // لرمي الخطأ للـ extraReducers
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
        console.log(action.error.message);
        state.loading = false;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
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

      if (existingItem.quantity >= 2) {
        existingItem.quantity -= 1;
      } else {
        state.items = state.items.filter((item) => item.id !== existingItem.id);
        state.totalItemsCount -= 1;
      }
    },
    handleQuantity(state, action) {
      const existingItem = state.items.find(
        (item) => item.id == action.payload.id,
      );
      existingItem.quantity = action.payload.value;
      state.items.map((item) => {
        if (item.id == action.payload.id) {
          item = existingItem;
        }
      });
      console.log(action.payload.value);
      console.log(action.payload.id);
      console.log(existingItem);
    },
  },
});
export const cartActions = cart.actions;
const store = configureStore({
  reducer: { products: productsSlice.reducer, cart: cart.reducer },
});
export default store;
