import "./bootstrap.min.css";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import ProductPage from "./Pages/ProductPage";
import LoginPage from "./Pages/LoginPage";
import CartPage from "./Pages/CartPage";
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Switch>
            <Route path="/" component={HomePage} exact />
            <Route path="/product/:id" component={ProductPage} />
            <Route path="/cart/:id?" component={CartPage} />
            <Route path="/login" component={LoginPage} />
          </Switch>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
