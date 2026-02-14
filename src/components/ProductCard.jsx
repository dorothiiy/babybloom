import { useNavigate } from 'react-router-dom'

const ProductCard = ({ product, onAddToCart }) => {
    const navigate = useNavigate()

    const handleNavigate = () => {
        navigate(`/product/${product.id}`)
    }

    return (
        <div className="card card-hover" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%' }}>

            {/* Image Area */}
            <div
                onClick={handleNavigate}
                style={{
                    height: '220px',
                    backgroundColor: 'var(--color-primary-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '4rem',
                    position: 'relative',
                    cursor: 'pointer'
                }}>
                {product.image || '📦'}
                <div style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    backgroundColor: 'var(--color-surface)',
                    padding: '0.25rem 0.75rem',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    color: 'var(--color-text-muted)',
                    boxShadow: 'var(--shadow-sm)'
                }}>
                    MOQ: {product.moq}
                </div>
            </div>

            <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div className="flex justify-between items-start" style={{ marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-primary)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        {product.category}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                        {product.packSize}
                    </span>
                </div>

                <h3
                    onClick={handleNavigate}
                    style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem', fontFamily: 'var(--font-display)', lineHeight: '1.3', cursor: 'pointer' }}>
                    {product.name}
                </h3>

                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem', flex: 1, lineHeight: '1.5' }}>
                    {product.description}
                </p>

                <div style={{ marginTop: 'auto' }}>
                    <div className="flex justify-between items-end" style={{ marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--color-border)' }}>
                        <div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>Wholesale Price</div>
                            <div style={{ fontWeight: '700', fontSize: '1.5rem', color: 'var(--color-text-main)' }}>
                                ₹{product.price.toLocaleString('en-IN')}
                            </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>RRP</div>
                            <div style={{ fontSize: '1rem', color: 'var(--color-text-muted)', textDecoration: 'line-through' }}>
                                ₹{product.retailPrice ? product.retailPrice.toLocaleString('en-IN') : (product.price * 2).toLocaleString('en-IN')}
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={(e) => {
                            e.stopPropagation()
                            onAddToCart(product)
                        }}
                        className="btn btn-primary"
                        style={{ width: '100%' }}
                    >
                        Add Pack to Order
                    </button>
                    {product.stock < 50 && (
                        <div style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--color-warning)', marginTop: '0.5rem', fontWeight: '500' }}>
                            Low Stock: Only {product.stock} left
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ProductCard
