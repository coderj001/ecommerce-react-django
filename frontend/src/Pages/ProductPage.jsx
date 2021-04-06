import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import {
  Container,
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  Badge,
  Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import { listProductDetails } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

function ProductPage({ match, history }) {
  const productId = match.params.id;
  const [qtn, setQtn] = useState(1);

  const dispatch = useDispatch();

  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );

  useEffect(() => {
    dispatch(listProductDetails(productId));
  }, [dispatch, productId]);

  const addToCartHandler = () => {
    history.push(`/cart/${productId}?qtn=${qtn}`);
  };

  return (
    <Container>
      <LinkContainer to="/">
        <Button variant="outline-secondary">Go Back</Button>
      </LinkContainer>
      <br />
      <br />

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name}></Image>
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReview} reviews`}
                  color={`#f8e825`}
                />
              </ListGroup.Item>
              <ListGroup.Item>
                <span>Price: Rs. {product.price}</span>
              </ListGroup.Item>
              <ListGroup.Item>
                <span>Description: {product.description}</span>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price: </Col>
                    <Col>
                      <strong>Rs. {product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status: </Col>
                    <Col>
                      {product.countInStock > 0 ? (
                        <Badge variant="success">
                          {" "}
                          <b>Available</b>{" "}
                        </Badge>
                      ) : (
                        <Badge variant="danger">
                          {" "}
                          <b>Not Available</b>{" "}
                        </Badge>
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col xs="auto" className="my-1">
                        <Form.Control
                          as="select"
                          value={qtn}
                          onChange={(e) => setQtn(e.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option value={x + 1} key={x}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                <ListGroup.Item>
                  <Button
                    className="btn-block"
                    type="button"
                    disabled={product.countInStock === 0}
                    onClick={addToCartHandler}
                  >
                    Add To Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default ProductPage;
