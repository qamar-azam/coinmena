import { createSlice } from '@reduxjs/toolkit'
import ProductData from '../../productData.json'

const initialState = {
  list: ProductData,
}

export const productSlice = createSlice({
  name: 'product',
  initialState,

  reducers: {
    editProduct: (state, action) => {
      let productList = state.list.map((product) =>
        product._id === action.payload._id ? action.payload : product
      )
      state.list = productList
    },
  },
})

export const { editProduct } = productSlice.actions
export default productSlice.reducer
