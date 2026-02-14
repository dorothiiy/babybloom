import { Link } from 'react-router-dom'
import DashboardLayout from '../components/DashboardLayout'
import { useOrders } from '../context/OrdersContext'
import OrderCard from '../components/OrderCard'

const StatWidget = ({ label, value, trend, icon }) => (
    <div className="card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <div style={{
            width: '60px', height: '60px', borderRadius: '50%',
            backgroundColor: 'var(--color-surface-alt)', display: 'flex',
            alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem'
        }}>
            {icon}
        </div>
        <div>
            <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>{label}</div>
            <div style={{ fontSize: '1.5rem', fontWeight: '800', fontFamily: 'var(--font-display)', lineHeight: 1 }}>{value}</div>
            {trend && <div style={{ fontSize: '0.75rem', color: trend.includes('+') ? 'var(--color-success)' : 'var(--color-text-muted)', marginTop: '0.25rem' }}>{trend}</div>}
        </div>
    </div>
)

const InvoiceRow = ({ id, date, amount, status }) => (
    <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '1rem', borderBottom: '1px solid var(--color-border)', fontSize: '0.9rem'
    }}>
        <div className="flex items-center" style={{ gap: '1rem' }}>
            <div style={{ backgroundColor: '#EDF2F7', padding: '0.5rem', borderRadius: '4px' }}>📄</div>
            <div>
                <div style={{ fontWeight: '600' }}>{id}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{date}</div>
            </div>
        </div>
        <div style={{ textAlign: 'right' }}>
            <div style={{ fontWeight: '600' }}>₹{amount}</div>
            <div style={{ fontSize: '0.75rem', color: status === 'Paid' ? 'var(--color-success)' : 'orange' }}>{status}</div>
        </div>
        <button className="btn btn-ghost" style={{ padding: '0.25rem' }}>⬇</button>
    </div>
)

const RetailerDashboard = () => {
    const { orders } = useOrders()
    const activeOrders = orders.filter(o => ['Pending', 'In Transit'].includes(o.status))
    const recentOrders = orders.slice(0, 3)

    return (
        <DashboardLayout role="retailer">
            <div style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: '800', fontFamily: 'var(--font-display)', marginBottom: '0.5rem' }}>Dashboard</h1>
                <p style={{ color: 'var(--color-text-muted)' }}>Welcome back, Kids Corner.</p>
            </div>

            {/* Quick Stats */}
            <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
                <StatWidget label="Open Orders" value={activeOrders.length} icon="📦" trend="2 Arriving Soon" />
                <StatWidget label="Pending Spend" value="₹45,200" icon="💳" trend="Due in 15 days" />
                <StatWidget label="Credits Available" value="₹10,000" icon="💰" />
            </div>

            <div className="grid" style={{ gridTemplateColumns: 'minmax(300px, 2fr) minmax(300px, 1fr)', gap: '2rem' }}>

                {/* Main Column */}
                <div className="flex flex-col" style={{ gap: '2rem' }}>

                    {/* Active Shipments / Open Orders */}
                    <section>
                        <div className="flex justify-between items-center" style={{ marginBottom: '1rem' }}>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: '700' }}>Active Orders</h2>
                            <Link to="/my-orders" style={{ fontSize: '0.875rem', color: 'var(--color-primary)', fontWeight: '600' }}>View All →</Link>
                        </div>
                        {activeOrders.length > 0 ? (
                            <div className="flex flex-col" style={{ gap: '1rem' }}>
                                {activeOrders.map(order => (
                                    <OrderCard key={order.id} order={order} />
                                ))}
                            </div>
                        ) : (
                            <div className="card" style={{ padding: '3rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                                <p>No active orders.</p>
                                <Link to="/products" className="btn btn-primary" style={{ marginTop: '1rem' }}>Browse Catalog</Link>
                            </div>
                        )}
                    </section>
                </div>

                {/* Sidebar Column */}
                <div className="flex flex-col" style={{ gap: '2rem' }}>

                    {/* Reorder Suggestions */}
                    <div className="card" style={{ padding: '1.5rem' }}>
                        <h3 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '1rem' }}>Quick Reorder</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div className="flex items-center" style={{ gap: '1rem' }}>
                                <div style={{ fontSize: '1.5rem' }}>👕</div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: '0.9rem', fontWeight: '600' }}>Cotton Onesies</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Ordered 2 weeks ago</div>
                                </div>
                                <button className="btn btn-outline" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}>Add</button>
                            </div>
                            <div className="flex items-center" style={{ gap: '1rem' }}>
                                <div style={{ fontSize: '1.5rem' }}>🧶</div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: '0.9rem', fontWeight: '600' }}>Knitted Romper</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Low Stock Alert</div>
                                </div>
                                <button className="btn btn-outline" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}>Add</button>
                            </div>
                        </div>
                    </div>

                    {/* Recent Invoices */}
                    <div className="card" style={{ padding: '0' }}>
                        <div style={{ padding: '1.25rem', borderBottom: '1px solid var(--color-border)' }}>
                            <h3 style={{ fontSize: '1rem', fontWeight: '700' }}>Recent Invoices</h3>
                        </div>
                        <div>
                            <InvoiceRow id="INV-2025-001" date="Oct 24" amount="12,400" status="Paid" />
                            <InvoiceRow id="INV-2025-002" date="Nov 02" amount="8,500" status="Paid" />
                            <InvoiceRow id="INV-2025-003" date="Nov 15" amount="24,300" status="Due" />
                        </div>
                        <div style={{ padding: '1rem', textAlign: 'center' }}>
                            <button className="btn btn-ghost" style={{ fontSize: '0.875rem' }}>View All Invoices</button>
                        </div>
                    </div>

                </div>
            </div>
        </DashboardLayout>
    )
}

export default RetailerDashboard
