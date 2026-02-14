import { useNavigate } from 'react-router-dom'

const StickyCartSummary = ({ cartItems, total }) => {
    const navigate = useNavigate()
    const itemCount = cartItems.length

    if (itemCount === 0) return null

    return (
        <div style={{
            position: 'sticky',
            top: '2rem',
            backgroundColor: 'var(--color-surface)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-lg)',
            overflow: 'hidden',
            animation: 'fadeInUp 0.3s ease-out'
        }}>
            <div style={{ padding: '1.25rem', borderBottom: '1px solid var(--color-border)', backgroundColor: 'var(--color-primary)', color: 'white' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: '700' }}>Order Summary</h3>
                <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>{itemCount} items selected</div>
            </div>

            <div style={{ padding: '1.25rem' }}>
                <div className="flex justify-between items-center" style={{ marginBottom: '1rem', fontWeight: '600' }}>
                    <span>Total (Est.)</span>
                    <span>₹{total.toLocaleString('en-IN')}</span>
                </div>

                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem', lineHeight: '1.4' }}>
                    Shipping & taxes calculated at checkout.
                </p>

                <button
                    onClick={() => navigate('/cart')}
                    className="btn btn-primary"
                    style={{ width: '100%', justifyContent: 'center' }}
                >
                    Review & Checkout →
                </button>
            </div>

            {/* Mini List of recently added (optional, keeping simple for now) */}
            <div style={{ maxHeight: '200px', overflowY: 'auto', borderTop: '1px solid var(--color-border)' }}>
                {cartItems.map((item, idx) => (
                    <div key={idx} style={{ padding: '0.75rem 1.25rem', borderBottom: '1px solid var(--color-border)', fontSize: '0.875rem', display: 'flex', justifyContent: 'between' }}>
                        <span style={{ flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginRight: '0.5rem' }}>{item.name}</span>
                        <span style={{ fontWeight: '600' }}>x{item.qty}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default StickyCartSummary
