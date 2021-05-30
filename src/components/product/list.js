import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Container, Table } from "react-bootstrap";

const Products = () => {
  const productList = useSelector((state) => state.product.list);

  return (
    <Container>
      <h3 className="mb-3">Products</h3>
      <p className="mb-4">
        You can browse the catalog below or hit <mark>Edit</mark> to change
        product info.
      </p>

      <Table hover>
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
                    <Link
                      to={`/edit-products/${product._id}`}
                      className={"btn btn-primary"}
                    >
                      Edit
                    </Link>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
};

export default Products;
