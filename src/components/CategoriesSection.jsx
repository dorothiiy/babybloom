import { Link } from 'react-router-dom'

const CategoriesSection = () => {
    const categories = [
        { name: 'Essentials', image: '👕', count: '120+ Styles', color: '#E0F2FE' },
        { name: 'Outerwear', image: '🧶', count: '45+ Styles', color: '#FEF3C7' },
        { name: 'Footwear', image: '🧦', count: '30+ Styles', color: '#F1F5F9' },
        { name: 'Accessories', image: '🧣', count: '50+ Styles', color: '#FEE2E2' },
    ]

    return (
        <section className="section" style={{ backgroundColor: 'var(--color-surface)' }}>
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Curated Collections</h2>
                    <p className="section-subtitle">Everything you need to stock your baby boutique, from day one.</p>
                </div>

                <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
                    {categories.map((cat, idx) => (
                        <Link key={idx} to="/products" className="card card-hover" style={{
                            textAlign: 'center',
                            padding: '3rem 1.5rem',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '1.5rem',
                            textDecoration: 'none'
                        }}>
                            <div style={{
                                width: '120px',
                                height: '120px',
                                borderRadius: '50%',
                                backgroundColor: cat.color,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '4rem',
                                marginBottom: '1rem',
                                transition: 'transform 0.3s ease'
                            }}>
                                {cat.image}
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--color-text-main)', marginBottom: '0.5rem' }}>{cat.name}</h3>
                                <p style={{ color: 'var(--color-text-muted)', fontWeight: '500' }}>{cat.count}</p>
                            </div>
                        </Link>
                    ))}
                </div>

                <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                    <Link to="/products" className="btn btn-outline" style={{ padding: '0.75rem 2rem' }}>View All Categories</Link>
                </div>
            </div>
        </section>
    )
}

export default CategoriesSection
