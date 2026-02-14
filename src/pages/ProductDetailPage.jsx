import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useProducts } from '../context/ProductsContext'

const ProductDetailPage = () => {
    const { id } = useParams()
    const { products } = useProducts()
    const navigate = useNavigate()
    const product = products.find(p => p.id === parseInt(id))

    const [quantity, setQuantity] = useState(1)

    if (!product) return <div className="container section">Product not found</div>

    const handleAddToCart = () => {
        alert(`Added ${quantity} packs (${quantity * product.moq} units) to order!`)
    }

    return (
        <div className="page-wrapper">
            <div className="container section">
                <button onClick={() => navigate('/products')} className="btn btn-ghost" style={{ marginBottom: '1rem' }}>
                    ← Back to Catalog
                </button>

                <div className="card" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', padding: '3rem' }}>
                    {/* Image Side */}
                    <div style={{
                        backgroundColor: 'var(--color-primary-light)',
                        borderRadius: 'var(--radius-xl)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '400px',
                        fontSize: '8rem',
                        position: 'relative'
                    }}>
                        {product.image || '📦'}
                        <div style={{
                            position: 'absolute',
                            top: '2rem',
                            left: '2rem',
                            backgroundColor: 'white',
                            padding: '0.5rem 1rem',
                            borderRadius: 'var(--radius-lg)',
                            fontWeight: '600',
                            color: 'var(--color-primary)',
                            boxShadow: 'var(--shadow-md)'
                        }}>
                            {product.category}
                        </div>
                    </div>

                    {/* Details Side */}
                    <div className="flex flex-col">
                        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', fontFamily: 'var(--font-display)', marginBottom: '0.5rem', lineHeight: 1.1 }}>
                            {product.name}
                        </h1>
                        <p style={{ fontSize: '1.25rem', color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
                            {product.description}
                        </p>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
                            <div style={{ padding: '1.5rem', backgroundColor: 'var(--color-surface-alt)', borderRadius: 'var(--radius-lg)' }}>
                                <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>Wholesale Price</div>
                                <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--color-primary)' }}>
                                    ₹{product.price.toLocaleString('en-IN')}
                                    <span style={{ fontSize: '1rem', fontWeight: '500', color: 'var(--color-text-muted)' }}> /unit</span>
                                </div>
                            </div>
                            <div style={{ padding: '1.5rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)' }}>
                                <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>Recommended Retail</div>
                                <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--color-text-main)' }}>
                                    ₹{product.retailPrice ? product.retailPrice.toLocaleString('en-IN') : (product.price * 2).toLocaleString('en-IN')}
                                    <span style={{ fontSize: '1rem', fontWeight: '500', color: 'var(--color-text-muted)' }}> /unit</span>
                                </div>
                            </div>
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <h3 style={{ fontSize: '1.125rem', fontWeight: '700', marginBottom: '1rem' }}>Pack Breakdown</h3>
                            <div className="flex" style={{ gap: '1rem' }}>
                                <div style={{ padding: '1rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', flex: 1, textAlign: 'center' }}>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Pack Size</div>
                                    <div style={{ fontWeight: '700' }}>{product.packSize}</div>
                                </div>
                                <div style={{ padding: '1rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', flex: 1, textAlign: 'center' }}>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>MOQ</div>
                                    <div style={{ fontWeight: '700' }}>{product.moq} Packs</div>
                                </div>
                                <div style={{ padding: '1rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', flex: 1, textAlign: 'center' }}>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>Total Units</div>
                                    <div style={{ fontWeight: '700' }}>{product.moq * (product.packSize === 'Pack of 3' ? 3 : product.packSize === 'Pack of 2' ? 2 : 1)} Units</div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-end" style={{ gap: '1rem', marginTop: 'auto' }}>
                            <div className="input-group" style={{ width: '100px' }}>
                                <label className="input-label">Quantity</label>
                                <input
                                    type="number"
                                    className="input"
                                    value={quantity}
                                    min="1"
                                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                                />
                            </div>
                            <button className="btn btn-primary" style={{ flex: 1, padding: '1rem', fontSize: '1.125rem' }} onClick={handleAddToCart}>
                                Add {quantity} Packs to Order
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetailPage
