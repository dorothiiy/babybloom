import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ProductsProvider } from './context/ProductsContext'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard' // Admin Dashboard
import RetailerDashboard from './pages/RetailerDashboard'
import TrackingPage from './pages/TrackingPage'
import ProductsPage from './pages/ProductsPage'
import ProductDetailPage from './pages/ProductDetailPage'
import CartPage from './pages/CartPage'
import RetailerOrdersPage from './pages/RetailerOrdersPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

import { OrdersProvider } from './context/OrdersContext'

function App() {
    return (
        <ProductsProvider>
            <AuthProvider>
                <OrdersProvider>
                    <Router>
                        <div className="app-container">
                            <Navbar />
                            <main className="page-wrapper">
                                <Routes>
                                    <Route path="/" element={<LandingPage />} />
                                    <Route path="/login" element={<LoginPage />} />
                                    <Route path="/register" element={<RegisterPage />} />

                                    {/* Retailer Routes */}
                                    <Route path="/dashboard" element={<RetailerDashboard />} />
                                    <Route path="/products" element={<ProductsPage />} />
                                    <Route path="/product/:id" element={<ProductDetailPage />} />
                                    <Route path="/cart" element={<CartPage />} />
                                    <Route path="/my-orders" element={<RetailerOrdersPage />} />
                                    <Route path="/track/:id" element={<TrackingPage />} />

                                    {/* Admin Routes */}
                                    <Route path="/admin" element={<Dashboard />} />
                                </Routes>
                            </main>
                            <Footer />
                        </div>
                    </Router>
                </OrdersProvider>
            </AuthProvider>
        </ProductsProvider >
    )
}

export default App
