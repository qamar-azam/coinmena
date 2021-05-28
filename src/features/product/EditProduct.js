import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory, Link } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { useState } from 'react'
import { editProduct } from './productSlice'

const budgetOptions = [
  { label: '$1-10', value: '$1-10' },
  { label: '$11-20', value: '$11-20' },
  { label: '$20-50', value: '$20-50' },
]

const premierOptions = [
  { label: '$50-99', value: '$50-99' },
  { label: '$100-199', value: '$100-199' },
  { label: '$200+', value: '$200+' },
]

const EditProduct = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const history = useHistory()
  const product = useSelector((state) =>
    state.product.list.find((product) => product._id === Number(id))
  )
  const [enableSubmitButton, setEnableSubmitButton] = useState(true)
  const [formField, setFormField] = useState({
    _id: product._id,
    product_name: product.product_name,
    weight: product.weight,
    availability: product.availability,
    url: product.url,
    unit_cost: product.unit_cost,
    price_tier: product.price_tier,
    price_range: product.price_range,
    isEditable: product.isEditable,
  })

  const handleChange = (e) => {
    const id = e.target.id,
      value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setFormField({ ...formField, [id]: value })
    setEnableSubmitButton(value === '' && id !== 'availability' ? false : true)
  }
  const handleSubmit = () => {
    dispatch(editProduct(formField))
    history.push('/')
  }

  return (
    <Container>
      <h2>
        Edit Product{' '}
        <Link to={'/'} className={'btn btn-primary'} style={{ float: 'right' }}>
          Back
        </Link>
      </h2>

      <form className={'form'} onSubmit={handleSubmit}>
        <div className={'mb-3'}>
          <label htmlFor="product_name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id={'product_name'}
            value={formField.product_name}
            onChange={handleChange}
          />
        </div>

        <div className={'mb-3'}>
          <label htmlFor="weight" className="form-label">
            Weight
          </label>
          <input
            className="form-control"
            type="text"
            id={'weight'}
            value={formField.weight}
            onChange={handleChange}
          />
        </div>

        <div className={'mb-3'}>
          <label htmlFor="availability" className="form-label">
            Availability
          </label>
          <input
            className="form-control"
            type="number"
            id="availability"
            value={formField.availability}
            onChange={handleChange}
          />
        </div>

        <div className={'mb-3'}>
          <label htmlFor="url" className="form-label">
            Product Url
          </label>
          <input
            className="form-control"
            type="text"
            id="url"
            value={formField.url}
            onChange={handleChange}
          />
        </div>

        <div className={'mb-3'}>
          <label className="form-label">Product Tier</label>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="productTier"
              id="price_tier"
              value={'budget'}
              checked={formField.price_tier === 'budget'}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="price_tier">
              Budget
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="productTier"
              id="price_tier"
              value={'premium'}
              checked={formField.price_tier === 'premium'}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="price_tier">
              Premier
            </label>
          </div>
        </div>

        <div className={'mb-3'}>
          <label htmlFor="price_range" className="form-label">
            Price Range
          </label>
          <select
            className="form-control"
            id={'price_range'}
            onChange={handleChange}
            value={formField.price_range}
          >
            {formField.price_tier === 'budget'
              ? budgetOptions.map((option) => (
                  <option value={option.value}>{option.label}</option>
                ))
              : premierOptions.map((option) => (
                  <option value={option.value}>{option.label}</option>
                ))}
          </select>
        </div>

        <div className={'mb-3'}>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="isEditable"
              onChange={handleChange}
              checked={formField.isEditable}
            />
            <label htmlFor="isEditable" className="form-check-label">
              Is Editable
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={!enableSubmitButton}
        >
          Submit
        </button>
      </form>
    </Container>
  )
}

export default EditProduct
