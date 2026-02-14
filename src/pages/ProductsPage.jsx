import { useState, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useProducts } from '../context/ProductsContext'
import ProductFilters from '../components/ProductFilters'
import StickyCartSummary from '../components/StickyCartSummary'
// import { Link as RouterLink } from 'react-router-dom' // Duplicate removed

// Reusing ProductCard specifically for Grid View (inline adaptation or use existing)
// For simplicity in this advanced view, we'll inline the list/grid renderers to have tighter control over the "Quantity Stepper" logic
// which might be unique to this page compared to the generic ProductCard.

const ProductsPage = () => {
    const { products } = useProducts()
    const navigate = useNavigate()

    // State
    const [viewMode, setViewMode] = useState('grid') // 'grid' | 'table'
    const [filters, setFilters] = useState({
        category: 'All',
        priceRange: 'all',
        inStockOnly: false
    })

    // "Cart" state for the sticky summary - effectively a "Draft Order"
    // { productId: quantity }
    const [draftOrder, setDraftOrder] = useState({})

    const categories = ['All', 'Essentials', 'Outerwear', 'Footwear', 'Accessories', 'Dresses', 'Playwear', 'Bottoms']

    // Filtering Logic
    const filteredProducts = useMemo(() => {
        return products.filter(p => {
            if (filters.category !== 'All' && p.category !== filters.category) return false
            if (filters.inStockOnly && p.status !== 'In Stock') return false

            if (filters.priceRange !== 'all') {
                const price = p.price
                if (filters.priceRange === 'under-1000' && price >= 1000) return false
                if (filters.priceRange === '1000-2000' && (price < 1000 || price > 2000)) return false
                if (filters.priceRange === 'above-2000' && price <= 2000) return false
            }
            return true
        })
    }, [products, filters])

    // Cart Logic
    const handleQtyChange = (id, delta, moq) => {
        setDraftOrder(prev => {
            const currentQty = prev[id] || 0
            const newQty = Math.max(0, currentQty + delta)

            // If dropping below MOQ (and not 0), snap to 0 or warn? For now, allow 0 to remove.
            // If adding from 0, snap to MOQ.
            if (currentQty === 0 && delta > 0) return { ...prev, [id]: moq }
            if (newQty === 0) {
                const { [id]: _, ...rest } = prev
                return rest
            }
            return { ...prev, [id]: newQty }
        })
    }

    const cartItemsList = Object.entries(draftOrder).map(([id, qty]) => {
        const product = products.find(p => p.id === parseInt(id))
        return { ...product, qty }
    })

    const cartTotal = cartItemsList.reduce((sum, item) => sum + (item.price * item.qty), 0)

    const resetFilters = () => setFilters({ category: 'All', priceRange: 'all', inStockOnly: false })

    return (
        <div className="page-wrapper" style={{ backgroundColor: '#F8FAFC' }}>
            {/* Page Header */}
            <div style={{ backgroundColor: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)', padding: '2rem 0' }}>
                <div className="container">
                    <div className="flex flex-col md:flex-row justify-between items-end" style={{ gap: '1.5rem' }}>
                        <div>
                            <div style={{ display: 'inline-block', padding: '0.25rem 0.75rem', backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary-dark)', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                                B2B Portal
                            </div>
                            <h1 style={{ fontSize: '2rem', fontWeight: '800', fontFamily: 'var(--font-display)', color: 'var(--color-text-main)' }}>
                                Wholesale Catalog
                            </h1>
                            <p style={{ color: 'var(--color-text-muted)' }}>Browse 500+ premium styles with tiered pricing.</p>
                        </div>

                        {/* View Toggles & Actions */}
                        <div className="flex items-center" style={{ gap: '1rem' }}>
                            <div style={{ display: 'flex', backgroundColor: 'var(--color-surface-alt)', padding: '0.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)' }}>
                                <button
                                    onClick={() => setViewMode('grid')}
                                    style={{
                                        padding: '0.5rem',
                                        borderRadius: 'var(--radius-sm)',
                                        backgroundColor: viewMode === 'grid' ? 'white' : 'transparent',
                                        boxShadow: viewMode === 'grid' ? 'var(--shadow-sm)' : 'none',
                                        color: viewMode === 'grid' ? 'var(--color-primary)' : 'var(--color-text-muted)',
                                        border: 'none',
                                        cursor: 'pointer'
                                    }}
                                    title="Grid View"
                                >
                                    🛑 Grid
                                </button>
                                <button
                                    onClick={() => setViewMode('table')}
                                    style={{
                                        padding: '0.5rem',
                                        borderRadius: 'var(--radius-sm)',
                                        backgroundColor: viewMode === 'table' ? 'white' : 'transparent',
                                        boxShadow: viewMode === 'table' ? 'var(--shadow-sm)' : 'none',
                                        color: viewMode === 'table' ? 'var(--color-primary)' : 'var(--color-text-muted)',
                                        border: 'none',
                                        cursor: 'pointer'
                                    }}
                                    title="List View"
                                >
                                    ☰ List
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container section" style={{ display: 'grid', gridTemplateColumns: 'minmax(250px, 1fr) 4fr', gap: '2rem', alignItems: 'start' }}>

                {/* Sidebar: Filters & Sticky Cart */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <ProductFilters
                        filters={filters}
                        setFilters={setFilters}
                        categories={categories}
                        onReset={resetFilters}
                    />
                    <StickyCartSummary cartItems={cartItemsList} total={cartTotal} />
                </div>

                {/* Main Content */}
                <div style={{ position: 'relative' }}>
                    {filteredProducts.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '4rem', backgroundColor: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)' }}>
                            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
                            <h3>No products match your filters.</h3>
                            <button onClick={resetFilters} className="btn btn-outline" style={{ marginTop: '1rem' }}>Clear Filters</button>
                        </div>
                    ) : (
                        <>
                            {viewMode === 'grid' ? (
                                <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                                    {filteredProducts.map(product => {
                                        const qty = draftOrder[product.id] || 0
                                        return (
                                            <div key={product.id} className="card" style={{ display: 'flex', flexDirection: 'column', padding: '0', overflow: 'hidden' }}>
                                                {/* Image Area */}
                                                <div style={{ height: '200px', backgroundColor: 'var(--color-surface-alt)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4rem', position: 'relative' }}>
                                                    {product.image}
                                                    {product.status !== 'In Stock' && (
                                                        <span style={{ position: 'absolute', top: '1rem', right: '1rem', backgroundColor: 'rgba(0,0,0,0.7)', color: 'white', fontSize: '0.75rem', padding: '0.25rem 0.5rem', borderRadius: 'var(--radius-sm)' }}>
                                                            {product.status}
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Content */}
                                                <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '0.25rem' }}>SKU: {product.sku}</div>
                                                    <Link to={`/product/${product.id}`} style={{ fontWeight: '700', fontSize: '1.125rem', marginBottom: '0.5rem', color: 'var(--color-text-main)', textDecoration: 'none' }}>
                                                        {product.name}
                                                    </Link>
                                                    <div className="flex justify-between items-center" style={{ marginBottom: '1rem' }}>
                                                        <span style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--color-primary)' }}>₹{product.price.toLocaleString('en-IN')}</span>
                                                        <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', textDecoration: 'line-through' }}>₹{product.retailPrice} RRP</span>
                                                    </div>

                                                    {/* Meta */}
                                                    <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                                        <span style={{ padding: '0.1rem 0.4rem', backgroundColor: 'var(--color-surface-alt)', borderRadius: '4px' }}>MOQ: {product.moq}</span>
                                                        <span style={{ padding: '0.1rem 0.4rem', backgroundColor: 'var(--color-surface-alt)', borderRadius: '4px' }}>{product.packSize}</span>
                                                    </div>

                                                    {/* Actions */}
                                                    <div style={{ marginTop: 'auto' }}>
                                                        {product.status === 'Out of Stock' ? (
                                                            <button disabled className="btn btn-secondary" style={{ width: '100%', opacity: 0.6 }}>Out of Stock</button>
                                                        ) : (
                                                            qty === 0 ? (
                                                                <button onClick={() => handleQtyChange(product.id, product.moq, product.moq)} className="btn btn-outline" style={{ width: '100%' }}>
                                                                    + Add to Order
                                                                </button>
                                                            ) : (
                                                                <div className="flex items-center justify-between" style={{ backgroundColor: 'var(--color-surface-alt)', borderRadius: 'var(--radius-md)', padding: '0.25rem' }}>
                                                                    <button
                                                                        onClick={() => handleQtyChange(product.id, -1, product.moq)}
                                                                        style={{ width: '32px', height: '32px', border: 'none', background: 'white', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                                                                    >-</button>
                                                                    <span style={{ fontWeight: '600' }}>{qty}</span>
                                                                    <button
                                                                        onClick={() => handleQtyChange(product.id, 1, product.moq)}
                                                                        style={{ width: '32px', height: '32px', border: 'none', background: 'var(--color-primary)', color: 'white', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                                                                    >+</button>
                                                                </div>
                                                            )
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            ) : (
                                // Table View
                                <div style={{ backgroundColor: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', overflow: 'hidden' }}>
                                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                        <thead style={{ backgroundColor: 'var(--color-surface-alt)', borderBottom: '1px solid var(--color-border)' }}>
                                            <tr style={{ textAlign: 'left' }}>
                                                <th style={{ padding: '1rem', color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Product</th>
                                                <th style={{ padding: '1rem', color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>SKU</th>
                                                <th style={{ padding: '1rem', color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Price</th>
                                                <th style={{ padding: '1rem', color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>MOQ</th>
                                                <th style={{ padding: '1rem', color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Stock</th>
                                                <th style={{ padding: '1rem', color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>Order Qty</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredProducts.map(product => {
                                                const qty = draftOrder[product.id] || 0
                                                return (
                                                    <tr key={product.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                                                        <td style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                            <div style={{ fontSize: '1.5rem' }}>{product.image}</div>
                                                            <div>
                                                                <Link to={`/product/${product.id}`} style={{ fontWeight: '600', color: 'var(--color-text-main)', textDecoration: 'none', display: 'block' }}>{product.name}</Link>
                                                                <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{product.packSize}</span>
                                                            </div>
                                                        </td>
                                                        <td style={{ padding: '1rem', fontSize: '0.875rem' }}>{product.sku}</td>
                                                        <td style={{ padding: '1rem', fontWeight: '600' }}>₹{product.price}</td>
                                                        <td style={{ padding: '1rem', fontSize: '0.875rem' }}>{product.moq}</td>
                                                        <td style={{ padding: '1rem' }}>
                                                            <span style={{
                                                                fontSize: '0.75rem',
                                                                padding: '0.2rem 0.5rem',
                                                                borderRadius: '4px',
                                                                backgroundColor: product.status === 'In Stock' ? '#DEF7EC' : '#FDE8E8',
                                                                color: product.status === 'In Stock' ? '#03543F' : '#9B1C1C'
                                                            }}>
                                                                {product.status}
                                                            </span>
                                                        </td>
                                                        <td style={{ padding: '1rem' }}>
                                                            {product.status === 'Out of Stock' ? (
                                                                <span style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>-</span>
                                                            ) : (
                                                                <div className="flex items-center" style={{ gap: '0.5rem' }}>
                                                                    <button
                                                                        onClick={() => handleQtyChange(product.id, -1, product.moq)}
                                                                        disabled={qty === 0}
                                                                        style={{ padding: '0.25rem 0.5rem', border: '1px solid var(--color-border)', borderRadius: '4px', cursor: 'pointer' }}
                                                                    >-</button>
                                                                    <input
                                                                        style={{ width: '50px', padding: '0.25rem', textAlign: 'center' }}
                                                                        value={qty}
                                                                        readOnly
                                                                    />
                                                                    <button
                                                                        onClick={() => handleQtyChange(product.id, 1, product.moq)}
                                                                        style={{ padding: '0.25rem 0.5rem', border: '1px solid var(--color-border)', borderRadius: '4px', backgroundColor: 'var(--color-primary)', color: 'white', cursor: 'pointer' }}
                                                                    >+</button>
                                                                </div>
                                                            )}
                                                        </td>
                                                    </tr>
                                                )
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ProductsPage
