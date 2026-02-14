import { Link } from 'react-router-dom'
import { useOrders } from '../context/OrdersContext'
import OrderCard from '../components/OrderCard'

const RetailerOrdersPage = () => {
    const { orders } = useOrders()
    // In a real app, we would filter by the logged-in user's ID
    // For now, let's just show all "Pending" and "In Transit" as if they are my active orders, 
    // or just show all orders for demo purposes since we are 'simulating' the retailer view usually.
    // Let's filter by a specific mock customer name to be slightly more realistic, or just show all.
    const myOrders = orders // .filter(o => o.customer === 'Retailer (You)') 

    return (
        <div className="page-wrapper">
            <div className="container section">
                <div className="flex justify-between items-center" style={{ marginBottom: '2rem' }}>
                    <div>
                        <h1 style={{ fontSize: '2rem', fontWeight: '800', fontFamily: 'var(--font-display)', color: 'var(--color-text-main)' }}>My Orders</h1>
                        <p style={{ color: 'var(--color-text-muted)' }}>Track past and current wholesale orders.</p>
                    </div>
                    <Link to="/products" className="btn btn-primary">
                        + New Wholesale Order
                    </Link>
                </div>

                {myOrders.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '4rem', backgroundColor: 'var(--color-surface)', borderRadius: 'var(--radius-lg)' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📦</div>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>No orders found</h3>
                        <p style={{ color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>You haven't placed any wholesale orders yet.</p>
                        <Link to="/products" className="btn btn-outline">Start Shopping</Link>
                    </div>
                ) : (
                    <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
                        {myOrders.map(order => (
                            <OrderCard key={order.id} order={order} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default RetailerOrdersPage
