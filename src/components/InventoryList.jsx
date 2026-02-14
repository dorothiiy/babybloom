import { useState } from 'react'
import { useProducts } from '../context/ProductsContext'

const InventoryList = () => {
    const { products, addProduct, updateProduct, deleteProduct } = useProducts()
    const [isAdding, setIsAdding] = useState(false)
    const [newProduct, setNewProduct] = useState({ name: '', category: '', price: '', image: '📦' })
    const [editingId, setEditingId] = useState(null)
    const [editPrice, setEditPrice] = useState('')

    const startEditing = (product) => {
        setEditingId(product.id)
        setEditPrice(product.price)
    }

    const saveEdit = (id) => {
        updateProduct(id, { price: Number(editPrice) })
        setEditingId(null)
        setEditPrice('')
    }

    const handleAdd = (e) => {
        e.preventDefault()
        addProduct({ ...newProduct, price: Number(newProduct.price) })
        setIsAdding(false)
        setNewProduct({ name: '', category: '', price: '', image: '📦' })
    }

    return (
        <div style={{
            backgroundColor: 'var(--color-surface)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--color-border)',
            padding: '2rem',
            marginTop: '3rem'
        }}>
            <div className="flex justify-between items-center" style={{ marginBottom: '1.5rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--color-primary)' }}>Inventory Management</h2>
                <button
                    className="btn btn-primary"
                    onClick={() => setIsAdding(!isAdding)}
                >
                    {isAdding ? 'Cancel' : 'Add New Item +'}
                </button>
            </div>

            {isAdding && (
                <form onSubmit={handleAdd} style={{ marginBottom: '2rem', padding: '1.5rem', backgroundColor: 'var(--color-surface-alt)', borderRadius: 'var(--radius-lg)' }}>
                    <div className="grid" style={{ gridTemplateColumns: '1fr 1fr 1fr 1fr auto', gap: '1rem', alignItems: 'end' }}>
                        <div>
                            <label className="block text-sm font-medium mb-1">Name</label>
                            <input
                                className="input"
                                required
                                value={newProduct.name}
                                onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
                                placeholder="e.g. Cotton Pyjamas"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Category</label>
                            <input
                                className="input"
                                required
                                value={newProduct.category}
                                onChange={e => setNewProduct({ ...newProduct, category: e.target.value })}
                                placeholder="e.g. Sleepwear"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Price (₹)</label>
                            <input
                                className="input"
                                type="number"
                                required
                                value={newProduct.price}
                                onChange={e => setNewProduct({ ...newProduct, price: e.target.value })}
                                placeholder="1200"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Emoji Icon</label>
                            <input
                                className="input"
                                value={newProduct.image}
                                onChange={e => setNewProduct({ ...newProduct, image: e.target.value })}
                                placeholder="👕"
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Save</button>
                    </div>
                </form>
            )}

            <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ textAlign: 'left', borderBottom: '2px solid var(--color-border)' }}>
                            <th style={{ padding: '1rem 0', color: 'var(--color-text-muted)' }}>Item</th>
                            <th style={{ padding: '1rem 0', color: 'var(--color-text-muted)' }}>Category</th>
                            <th style={{ padding: '1rem 0', color: 'var(--color-text-muted)' }}>Price</th>
                            <th style={{ padding: '1rem 0', color: 'var(--color-text-muted)', textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                                <td style={{ padding: '1rem 0' }}>
                                    <span style={{ fontSize: '1.5rem', marginRight: '0.5rem' }}>{product.image}</span>
                                    <span style={{ fontWeight: '600' }}>{product.name}</span>
                                </td>
                                <td style={{ padding: '1rem 0' }}>{product.category}</td>
                                <td style={{ padding: '1rem 0' }}>
                                    {editingId === product.id ? (
                                        <input
                                            type="number"
                                            value={editPrice}
                                            onChange={(e) => setEditPrice(e.target.value)}
                                            style={{ padding: '0.25rem', width: '80px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}
                                            autoFocus
                                        />
                                    ) : (
                                        `₹${product.price.toLocaleString('en-IN')}`
                                    )}
                                </td>
                                <td style={{ padding: '1rem 0', textAlign: 'right', gap: '0.5rem', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                                    {editingId === product.id ? (
                                        <>
                                            <button
                                                className="btn btn-primary"
                                                style={{ padding: '0.25rem 0.75rem', fontSize: '0.875rem' }}
                                                onClick={() => saveEdit(product.id)}
                                            >
                                                Save
                                            </button>
                                            <button
                                                className="btn btn-outline"
                                                style={{ padding: '0.25rem 0.75rem', fontSize: '0.875rem' }}
                                                onClick={() => setEditingId(null)}
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button
                                                className="btn btn-outline"
                                                style={{ marginRight: '0.5rem', padding: '0.25rem 0.75rem', fontSize: '0.875rem' }}
                                                onClick={() => startEditing(product)}
                                            >
                                                Edit Price
                                            </button>
                                            <button
                                                className="btn btn-outline"
                                                style={{ borderColor: 'var(--color-error)', color: 'var(--color-error)', padding: '0.25rem 0.75rem', fontSize: '0.875rem' }}
                                                onClick={() => {
                                                    if (confirm('Are you sure you want to remove this item?')) {
                                                        deleteProduct(product.id)
                                                    }
                                                }}
                                            >
                                                Remove
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default InventoryList
