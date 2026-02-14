import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false)
    const { user, logout } = useAuth()
    const location = useLocation()
    const isDashboard = location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/admin')
    const isAuthPage = ['/login', '/register'].includes(location.pathname)
    const isLoginPage = location.pathname === '/' || location.pathname === '/login'

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    if (isAuthPage) return null

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="container flex justify-between items-center">
                <Link to="/" className="brand">
                    Baby<span className="brand-accent">Bloom</span>.
                </Link>

                {isDashboard ? ( // Admin View
                    <div className="flex items-center">
                        <span style={{ marginRight: '1rem', color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Administrator</span>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'var(--color-primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.875rem', fontWeight: 'bold' }}>A</div>
                    </div>
                ) : ( // Public/Retailer View
                    <div className="flex items-center" style={{ gap: '2rem' }}>
                        {!isLoginPage && (
                            <>
                                <Link to="/home" className={`nav-link ${location.pathname === '/home' ? 'active' : ''}`}>Home</Link>
                                <Link to="/products" className={`nav-link ${location.pathname === '/products' || location.pathname.startsWith('/product/') ? 'active' : ''}`}>Shop Wholesale</Link>

                                {user ? (
                                    <>
                                        <Link to="/orders" className={`nav-link ${location.pathname === '/orders' ? 'active' : ''}`}>My Orders</Link>
                                        <button onClick={logout} className="btn btn-outline" style={{ padding: '0.4rem 1rem', fontSize: '0.875rem' }}>
                                            Logout
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <a href="#features" className="nav-link">Features</a>
                                        <Link to="/" className="btn btn-primary">
                                            Login Portal
                                        </Link>
                                    </>
                                )}
                            </>
                        )}
                        {isLoginPage && (
                            <span style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Secure Access</span>
                        )}
                    </div>
                )}
            </div>
        </nav>
    )
}

export default Navbar
