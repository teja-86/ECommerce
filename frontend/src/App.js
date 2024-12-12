import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import HomePage from './pages/HomePage';
import ProductDetails from './pages/ProductDetails';
import CartPage from './pages/CartPage';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Shop from './pages/Shop';
import { CartProvider } from './redux/CartContext';
import CheckoutPage from './pages/CheckoutPage';
import OrderCompletePage from './pages/OrderCompletePage';

function App() {
  // Manage auth token in state
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));

  useEffect(() => {
    if (authToken) {
      localStorage.setItem('authToken', authToken);
    } else {
      localStorage.removeItem('authToken');
    }
  }, [authToken]);

  return (
    <CartProvider>
    <Router>
      {authToken && <Navbar setAuthToken={setAuthToken}/>}
      <Routes>
        <Route path="/" element={
            <ProtectedRoute authToken={authToken}>
              <HomePage />
            </ProtectedRoute>
          } 
        />
        <Route path="/shop"
          element={
            <ProtectedRoute authToken={authToken}>
              <Shop />
            </ProtectedRoute>
          } 
        />
        <Route path="/product/:id"
        element={
          <ProtectedRoute authToken={authToken}>
            <ProductDetails />
          </ProtectedRoute>
        } 
        />
        <Route 
          path="/cart" 
          element={
            <ProtectedRoute authToken={authToken}>
              <CartPage />
            </ProtectedRoute>
          } 
        />
        <Route path="/ordercomplete" element={
            <ProtectedRoute authToken={authToken}>
              <OrderCompletePage />
            </ProtectedRoute>
          } 
        />
        <Route path='/checkout' 
          element={
            <ProtectedRoute authToken={authToken}>
              <CheckoutPage />
            </ProtectedRoute>
          } 
        />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/signin" element={<LoginForm setAuthToken={setAuthToken} />} />
      </Routes>
    </Router>
    </CartProvider>
  );
}

export default App;
