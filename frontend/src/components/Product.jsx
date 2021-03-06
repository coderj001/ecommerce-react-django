import React from "react";
import { Card } from "react-bootstrap";
import Rating from "./Rating";
import { Link } from "react-router-dom";

function Product({ product }) {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${product._id}`}>
        <Card.Img variant="top" src={product.image} />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        {/* <Card.Text>{product.description}</Card.Text> */}
        <Card.Text as="div">
          <div className="my-3">
            {product.rating} from {product.numReview} reviews
            <Rating
              value={product.rating}
              text={`${product.numReview} reviews`}
              color={`#f8e825`}
            />
          </div>
        </Card.Text>
        <Card.Text as="h3">Rs. {product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Product;
