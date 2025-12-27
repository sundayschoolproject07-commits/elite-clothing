
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import About from './pages/About';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import OrderConfirmation from './pages/OrderConfirmation';
import Wishlist from './pages/Wishlist';
import { WishlistProvider } from './context/WishlistContext';

const App = () => {
  return (
    <WishlistProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<Policy type="privacy" />} />
            <Route path="/shipping-policy" element={<Policy type="shipping" />} />
            <Route path="/returns-policy" element={<Policy type="returns" />} />
            <Route path="/terms-conditions" element={<Policy type="terms" />} />
          </Routes>
        </Layout>
      </Router>
    </WishlistProvider>
  );
};

export default App;
