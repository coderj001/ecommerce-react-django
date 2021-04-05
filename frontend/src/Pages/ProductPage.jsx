import React from "react";
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
} from "react-bootstrap";
import products from "../fakedata/products.json";
import Rating from "../components/Rating";

function ProductPage(props) {
  const product = products.find((p) => p._id === props.match.params.id);

  return (
    <Container>
      <LinkContainer to="/">
        <Button variant="outline-secondary">Go Back</Button>
      </LinkContainer>
      <br />
      <br />

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
                text={`${product.numReviews} reviews`}
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
                    <strong>${product.price}</strong>
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
              <ListGroup.Item>
                <Button
                  className="btn-block"
                  type="button"
                  disabled={product.countInStock === 0}
                >
                  Add To Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductPage;
