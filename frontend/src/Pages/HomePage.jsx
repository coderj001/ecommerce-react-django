import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { listProducts } from "../actions/productActions";

function HomePage() {
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector(
    (state) => state.productList
  );
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);
  return (
    <div>
      <h1>Latest Product</h1>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <Row>
          {products.map((product) => (
            <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default HomePage;
