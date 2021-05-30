import { configureStore } from '@reduxjs/toolkit'
import productReducer from '../components/product/productSlice'

export const store = configureStore({
  reducer: {
    product: productReducer,
  },
})
