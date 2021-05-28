import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Container, Table } from 'react-bootstrap'

const ProductList = () => {
  const productList = useSelector((state) => state.product.list)

  return (
    <Container>
      <h1>Product List</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Unit Cost</th>
            <th>Price Range</th>
            <th>Weight</th>
            <th>Quantity</th>
            <th>Image</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {productList.map((product) => {
            return (
              <tr key={product._id}>
                <td>{product.product_name}</td>
                <td>{product.unit_cost}</td>
                <td>{product.price_range}</td>
                <td>{product.weight}</td>
                <td>{product.availability}</td>
                <td>{product.url}</td>
                <td>
                  {product.isEditable && (
                    <Link to={`/edit-products/${product._id}`} className={'btn btn-primary'}>Edit</Link>
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </Container>
  )
}

export default ProductList
