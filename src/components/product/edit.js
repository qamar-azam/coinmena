import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory, Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useState } from "react";
import { editProduct } from "./productSlice";

const budgetOptions = [
  { label: "$1-10", value: "$1-10" },
  { label: "$11-20", value: "$11-20" },
  { label: "$20-50", value: "$20-50" },
];

const premierOptions = [
  { label: "$50-99", value: "$50-99" },
  { label: "$100-199", value: "$100-199" },
  { label: "$200+", value: "$200+" },
];

function Label({ htmlFor, children }) {
  return (
    <label htmlFor={htmlFor} className="col-form-label col-sm-2">
      {children}
    </label>
  );
}

function Input({ type, id, value, onChange }) {
  return (
    <input
      id={id}
      type={type || "text"}
      value={value}
      onChange={onChange}
      className="form-control"
    />
  );
}

function Select({ id, value, onChange, list }) {
  return (
    <select id={id} value={value} onChange={onChange} className="form-control">
      {list.map((option) => (
        <option key={`pro-${option.value}`} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

function Radios({ id, name, value, list, onChange }) {
  return list.map((i) => (
    <div className="form-check pt-2" key={`opt-${id}-${i.value}`}>
      <input
        id={id}
        type="radio"
        name={name}
        value={i.value}
        checked={i.value === value}
        onChange={onChange}
        className="form-check-input"
      />
      <label className="form-check-label" htmlFor="price_tier">
        {i.label}
      </label>
    </div>
  ));
}

function Checkbox({ checked, onChange }) {
  return (
    <div className="form-check">
      <input
        id="isEditable"
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="form-check-input"
      />
      <label htmlFor="isEditable" className="form-check-label">
        Can Edit
      </label>
    </div>
  );
}

function Button({ type, disabled, children }) {
  return (
    <button
      type={type || "submit"}
      className="btn btn-primary"
      disabled={disabled}
    >
      {children}
    </button>
  );
}

function FormRow({ className, children }) {
  return <div className={className || "row mb-4"}>{children}</div>;
}

function isFormValid(fields) {
  return Object.values(fields).every((v) => v !== "");
}

function getValue(e) {
  const id = e.target.id;
  const value =
    e.target.type === "checkbox" ? e.target.checked : e.target.value;
  return [id, value];
}

function EditProduct() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const product = useSelector((state) =>
    state.product.list.find((product) => product._id === Number(id))
  );
  const [enableSave, setEnableSave] = useState(true);
  const [fields, setFieldValue] = useState({
    _id: product._id,
    product_name: product.product_name,
    weight: product.weight,
    availability: product.availability,
    url: product.url,
    unit_cost: product.unit_cost,
    price_tier: product.price_tier,
    price_range: product.price_range,
    isEditable: product.isEditable,
  });

  function onChange(e) {
    const [id, value] = getValue(e);
    let fieldValues = { ...fields, [id]: value };
    setEnableSave(isFormValid(fieldValues));
    setFieldValue(fieldValues);
  }

  function onSubmit() {
    dispatch(editProduct(fields));
    history.push("/");
  }

  const productTiers = [
    {
      label: "Budget",
      value: "budget",
    },
    {
      label: "Premier",
      value: "premier",
    },
  ];
  const priceRangeOptions =
    fields.price_tier === "budget" ? budgetOptions : premierOptions;

  return (
    <Container>
      <h3 className="mb-5">
        Edit Product
        <Link to="/" className="btn btn-primary float-right">
          ← products
        </Link>
      </h3>

      <form onSubmit={onSubmit}>
        <FormRow>
          <Label htmlFor="product_name">Name</Label>
          <div className="col-sm-10">
            <Input
              id="product_name"
              value={fields.product_name}
              onChange={onChange}
            />
          </div>
        </FormRow>

        <FormRow>
          <Label htmlFor="url">Link</Label>
          <div className="col-sm-10">
            <Input id="url" value={fields.url} onChange={onChange} />
          </div>
        </FormRow>

        <FormRow>
          <Label htmlFor="weight">Weight</Label>
          <div className="col-sm-2">
            <Input id="weight" value={fields.weight} onChange={onChange} />
          </div>
        </FormRow>

        <FormRow>
          <Label htmlFor="availability">Available</Label>
          <div className="col-sm-2">
            <Input
              type="number"
              id="availability"
              value={fields.availability}
              onChange={onChange}
            />
          </div>
        </FormRow>

        <FormRow>
          <Label>Product Tier</Label>
          <div className="col-sm-10">
            <Radios
              id="price_tier"
              name="productTier"
              value={fields.price_tier}
              list={productTiers}
              onChange={onChange}
            />
          </div>
        </FormRow>

        <FormRow>
          <Label htmlFor="price_range">Price Range</Label>
          <div className="col-sm-2">
            <Select
              id="price_range"
              value={fields.price_range}
              onChange={onChange}
              list={priceRangeOptions}
            />
          </div>
        </FormRow>

        <FormRow>
          <div className="col-sm-10 offset-sm-2">
            <Checkbox checked={fields.isEditable} onChange={onChange} />
          </div>
        </FormRow>

        <FormRow className="row">
          <div className="col-sm-10 offset-sm-2">
            <Button disabled={!enableSave}>Save Product</Button>
          </div>
        </FormRow>
      </form>
    </Container>
  );
}

export default EditProduct;
