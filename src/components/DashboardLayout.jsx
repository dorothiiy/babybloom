import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useState } from 'react'

const DashboardLayout = ({ children, role = 'retailer' }) => {
    const location = useLocation()
    const navigate = useNavigate()
    const { logout } = useAuth()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const retailerLinks = [
        { path: '/dashboard', label: 'Overview', icon: '📊' },
        { path: '/my-orders', label: 'Orders & Tracking', icon: '📦' },
        { path: '/products', label: 'Catalog', icon: '🛍️' },
        { path: '/invoices', label: 'Invoices', icon: '📄' },
        { path: '/settings', label: 'Settings', icon: '⚙️' },
    ]

    const adminLinks = [
        { path: '/admin/dashboard', label: 'Overview', icon: '📈' },
        { path: '/admin/orders', label: 'Orders', icon: '📦' },
        { path: '/admin/inventory', label: 'Inventory', icon: '📋' },
        { path: '/admin/customers', label: 'Retailers', icon: '👥' },
    ]

    const links = role === 'admin' ? adminLinks : retailerLinks

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F8FAFC' }}>

            {/* Sidebar */}
            <aside style={{
                width: '260px',
                backgroundColor: 'white',
                borderRight: '1px solid var(--color-border)',
                display: 'flex',
                flexDirection: 'column',
                position: 'fixed',
                height: '100vh',
                zIndex: 100,
                // Simple responsive hidden/shown logic handled via class hidden-mobile in global.css usually, 
                // but for dashboard sidebars we often want specific mobile logic. 
                // For this MVP step, we'll keep it statically separate.
            }}
                className="hidden-mobile"
            >
                <div style={{ padding: '2rem', borderBottom: '1px solid var(--color-border)' }}>
                    <div className="brand" style={{ fontSize: '1.5rem' }}>
                        Baby<span className="brand-accent">Bloom</span>.
                    </div>
                </div>

                <nav style={{ flex: 1, padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {links.map(link => {
                        const isActive = location.pathname === link.path
                        return (
                            <Link
                                key={link.path}
                                to={link.path}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    padding: '0.75rem 1rem',
                                    textDecoration: 'none',
                                    color: isActive ? 'var(--color-primary)' : 'var(--color-text-muted)',
                                    backgroundColor: isActive ? 'var(--color-primary-light)' : 'transparent',
                                    borderRadius: 'var(--radius-md)',
                                    fontWeight: isActive ? 600 : 500,
                                    fontSize: '0.95rem',
                                    transition: 'all 0.2s',
                                }}
                            >
                                <span>{link.icon}</span>
                                {link.label}
                            </Link>
                        )
                    })}
                </nav>

                <div style={{ padding: '1.5rem', borderTop: '1px solid var(--color-border)' }}>
                    <button
                        onClick={() => { logout(); navigate('/'); }}
                        className="btn btn-ghost"
                        style={{ width: '100%', justifyContent: 'flex-start', color: '#E53E3E' }}
                    >
                        🚪 Logout
                    </button>
                </div>
            </aside>

            {/* Mobile Header (Only visible on mobile) */}
            <div className="md:hidden" style={{
                display: 'none', // Add media query in global usually, but creating structure here
                // We'll rely on global.css utilities for real app.
                position: 'fixed', top: 0, left: 0, right: 0, height: '60px', background: 'white', borderBottom: '1px solid var(--color-border)', alignItems: 'center', padding: '0 1rem', justifyContent: 'space-between', zIndex: 90
            }}>
                <span className="brand">BabyBloom</span>
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>☰</button>
            </div>

            {/* Main Content Area */}
            <main style={{ flex: 1, marginLeft: '260px', padding: '2rem', width: '100%' }} className="dashboard-main">
                {children}
            </main>
        </div>
    )
}

export default DashboardLayout
