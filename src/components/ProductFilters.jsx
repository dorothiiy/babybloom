const ProductFilters = ({ filters, setFilters, categories, onReset }) => {
    return (
        <div style={{
            backgroundColor: 'var(--color-surface)',
            padding: '1.5rem',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-border)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem'
        }}>
            <div className="flex justify-between items-center">
                <h3 style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--color-text-main)' }}>Filters</h3>
                <button onClick={onReset} className="btn btn-ghost" style={{ fontSize: '0.875rem', padding: '0.25rem 0.5rem' }}>
                    Reset
                </button>
            </div>

            {/* Category Filter */}
            <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text-muted)' }}>Category</label>
                <div className="flex flex-col" style={{ gap: '0.5rem' }}>
                    {categories.map(cat => (
                        <label key={cat} className="flex items-center" style={{ gap: '0.75rem', fontSize: '0.95rem', cursor: 'pointer' }}>
                            <input
                                type="radio"
                                name="category"
                                checked={filters.category === cat}
                                onChange={() => setFilters(prev => ({ ...prev, category: cat }))}
                                style={{ width: '16px', height: '16px' }}
                            />
                            {cat}
                        </label>
                    ))}
                </div>
            </div>

            {/* Price Range */}
            <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text-muted)' }}>Price Range</label>
                <select
                    className="input"
                    style={{ width: '100%' }}
                    value={filters.priceRange}
                    onChange={(e) => setFilters(prev => ({ ...prev, priceRange: e.target.value }))}
                >
                    <option value="all">All Prices</option>
                    <option value="under-1000">Under ₹1,000</option>
                    <option value="1000-2000">₹1,000 - ₹2,000</option>
                    <option value="above-2000">Above ₹2,000</option>
                </select>
            </div>

            {/* Stock Status */}
            <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text-muted)' }}>Availability</label>
                <label className="flex items-center" style={{ gap: '0.75rem', fontSize: '0.95rem', cursor: 'pointer' }}>
                    <input
                        type="checkbox"
                        checked={filters.inStockOnly}
                        onChange={(e) => setFilters(prev => ({ ...prev, inStockOnly: e.target.checked }))}
                        style={{ width: '16px', height: '16px' }}
                    />
                    In Stock Only
                </label>
            </div>
        </div>
    )
}

export default ProductFilters
