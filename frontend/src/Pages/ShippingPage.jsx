import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import { saveShippingAddress } from "../actions/cartActions";

function ShippingPage({ history }) {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const dispatch = useDispatch();

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [pincode, setPincode] = useState(shippingAddress.pincode);
  const [country, setCountry] = useState(shippingAddress.country);
  function submitHandler(e) {
    e.preventDefault();
    console.log("submit");
    dispatch(
      saveShippingAddress({
        address,
        city,
        pincode,
        country,
      })
    );
    history.push("/payment");
  }
  return (
    <div>
      <FormContainer>
        <h1>Shipping</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="address">
            <Form.Label>Enter Address</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter Address"
              value={address ? address : ""}
              onChange={(e) => setAddress(e.target.value)}
            ></Form.Control>
          </Form.Group>{" "}
          <Form.Group controlId="city">
            <Form.Label>Enter City</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter City"
              value={city ? city : ""}
              onChange={(e) => setCity(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="pincode">
            <Form.Label>Enter Pincode</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter Pincode"
              value={pincode ? pincode : ""}
              onChange={(e) => setPincode(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId="country">
            <Form.Label>Enter Country</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter Country"
              value={country ? country : ""}
              onChange={(e) => setCountry(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type="submit" variant="primary">
            Continue
          </Button>
        </Form>
      </FormContainer>
    </div>
  );
}

export default ShippingPage;
