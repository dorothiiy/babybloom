import { Link } from 'react-router-dom'

const getStatusColor = (status) => {
    switch (status) {
        case 'Delivered': return 'var(--color-success)';
        case 'In Transit': return 'var(--color-accent)';
        case 'Pending': return 'var(--color-warning)';
        case 'Cancelled': return 'var(--color-error)';
        default: return 'var(--color-text-muted)';
    }
}

const OrderCard = ({ order }) => {
    const statusColor = getStatusColor(order.status)

    return (
        <div className="card card-hover" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '1.5rem' }}>
            <div className="flex justify-between items-center">
                <span style={{ fontWeight: '700', color: 'var(--color-primary)' }}>#{order.id}</span>
                <span style={{
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    padding: '0.25rem 0.6rem',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: `${statusColor}20`,
                    color: statusColor,
                    border: `1px solid ${statusColor}`,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                }}>
                    {order.status}
                </span>
            </div>

            <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Customer</div>
                <div style={{ fontWeight: '600', color: 'var(--color-text-main)' }}>{order.customer}</div>
            </div>

            <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Destination</div>
                <div style={{ fontWeight: '500', color: 'var(--color-text-main)' }}>{order.destination}</div>
            </div>

            <div className="flex justify-between items-center" style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--color-border)' }}>
                <div style={{ fontWeight: '700', fontSize: '1.25rem' }}>
                    {typeof order.amount === 'number' ? `₹${order.amount.toLocaleString('en-IN')}` : order.amount}
                </div>
                <Link to={`/track/${order.id}`} className="btn btn-outline" style={{ fontSize: '0.75rem', padding: '0.5rem 1rem' }}>
                    Track Order
                </Link>
            </div>
        </div>
    )
}

export default OrderCard
