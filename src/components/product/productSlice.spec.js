import counterReducer from './productSlice'
import ProductData from '../../productData.json'

describe('counter reducer', () => {
  it('should handle initial state', () => {
    expect(counterReducer(undefined, { type: 'unknown' })).toEqual({
      list: ProductData,
    })
  })
})
