import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function Navigaton() {
  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <Link to="/">
            <Navbar.Brand>ProShop</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#">
                <FontAwesomeIcon icon={faShoppingCart} />
                Cart
              </Nav.Link>
              <Nav.Link href="#">
                <FontAwesomeIcon icon={faSignInAlt} /> Login
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Navigaton;
