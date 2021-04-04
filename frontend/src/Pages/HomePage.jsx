import React from "react";
import { Row, Col } from "react-bootstrap";
import products from "../fakedata/products.json";
import Product from "../components/Product";

function HomePage() {
  return (
    <div>
      <h1>Latest Product</h1>
      <Row>
        {products.map((product) => (
          <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default HomePage;
