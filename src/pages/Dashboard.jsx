import { useState } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import { useOrders } from '../context/OrdersContext'
import { useProducts } from '../context/ProductsContext'
import AdminAnalytics from '../components/AdminAnalytics'
import RetailerApprovals from '../components/RetailerApprovals'
import InventoryList from '../components/InventoryList'
import OrderCard from '../components/OrderCard'

const Dashboard = () => {
    const { orders } = useOrders()
    const { products } = useProducts()
    const [activeTab, setActiveTab] = useState('overview') // 'overview', 'orders', 'inventory', 'retailers'

    // Mock filtering for simplicity
    const pendingOrders = orders.filter(o => o.status === 'Pending')

    return (
        <DashboardLayout role="admin">
            <div className="flex justify-between items-center" style={{ marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', fontWeight: '800', fontFamily: 'var(--font-display)', color: 'var(--color-text-main)' }}>Operations Center</h1>
                    <p style={{ color: 'var(--color-text-muted)' }}>Manage wholesale logistics and approvals.</p>
                </div>
                <div className="flex" style={{ gap: '1rem' }}>
                    <button className="btn btn-outline" onClick={() => alert('Exporting report...')}>⬇ Export Report</button>
                    <button className="btn btn-primary" onClick={() => setActiveTab('inventory')}>+ Add Product</button>
                </div>
            </div>

            {/* Quick Tabs - Could be handled by router but using state for single-page dashboard feel within the layout */}
            <div style={{ borderBottom: '1px solid var(--color-border)', marginBottom: '2rem', display: 'flex', gap: '2rem' }}>
                {['overview', 'orders', 'inventory', 'retailers'].map(tab => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        style={{
                            padding: '1rem 0',
                            borderBottom: activeTab === tab ? '2px solid var(--color-primary)' : '2px solid transparent',
                            color: activeTab === tab ? 'var(--color-primary)' : 'var(--color-text-muted)',
                            fontWeight: activeTab === tab ? '600' : '500',
                            textTransform: 'capitalize',
                            background: 'none',
                            borderTop: 'none',
                            borderLeft: 'none',
                            borderRight: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {activeTab === 'overview' && (
                <div className="fade-in-up">
                    <AdminAnalytics orders={orders} inventory={products} />

                    <div className="grid" style={{ gridTemplateColumns: 'minmax(400px, 2fr) minmax(300px, 1fr)', gap: '2rem' }}>
                        <div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1rem' }}>Recent Orders</h3>
                            <div className="flex flex-col" style={{ gap: '1rem' }}>
                                {orders.slice(0, 5).map(order => (
                                    <OrderCard key={order.id} order={order} />
                                ))}
                            </div>
                        </div>
                        <div>
                            <RetailerApprovals />

                            <div style={{ marginTop: '2rem', backgroundColor: 'white', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
                                <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem' }}>System Health</h3>
                                <div className="flex justify-between items-center" style={{ marginBottom: '0.75rem', fontSize: '0.875rem' }}>
                                    <span>API Status</span>
                                    <span style={{ color: 'var(--color-success)' }}>● Operational</span>
                                </div>
                                <div className="flex justify-between items-center" style={{ marginBottom: '0.75rem', fontSize: '0.875rem' }}>
                                    <span>Database</span>
                                    <span style={{ color: 'var(--color-success)' }}>● Connected</span>
                                </div>
                                <div className="flex justify-between items-center" style={{ fontSize: '0.875rem' }}>
                                    <span>Last Backup</span>
                                    <span style={{ color: 'var(--color-text-muted)' }}>2 hours ago</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {activeTab === 'inventory' && (
                <InventoryList />
            )}

            {activeTab === 'orders' && (
                <div className="fade-in-up">
                    <h2 style={{ marginBottom: '1rem' }}>Fulfillment Queue</h2>
                    {/* Reusing OrderCard list for now as 'Queue' */}
                    <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
                        {orders.map(order => (
                            <OrderCard key={order.id} order={order} />
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'retailers' && (
                <RetailerApprovals />
                // In real app, full retailer list here
            )}

        </DashboardLayout>
    )
}

export default Dashboard
