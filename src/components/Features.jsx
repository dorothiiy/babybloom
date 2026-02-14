const featuresData = [
    {
        title: 'Premium Quality',
        desc: 'Made from 100% Organic Cotton and certified safe dyes. Loved by parents and safe for babies.',
        icon: '🌿'
    },
    {
        title: 'Wholesale Pricing',
        desc: 'Competitive tiered pricing with automated bulk discounts. Margins designed for retailer success.',
        icon: '🏷️'
    },
    {
        title: 'Flexible MOQs',
        desc: 'Start small with low Minimum Order Quantities per style. Perfect for testing new collections.',
        icon: '✨'
    },
    {
        title: 'Fast Dispatch',
        desc: 'Orders ship within 24-48 hours from our central warehouse. Real-time inventory tracking.',
        icon: '🚀'
    }
]

const Features = () => {
    return (
        <section id="features" className="section" style={{ backgroundColor: 'var(--color-surface)' }}>
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Why Partner with BabyBloom?</h2>
                    <p className="section-subtitle">
                        We help boutique retailers stock the softest, most stylish baby clothing without the wholesale headache.
                    </p>
                </div>

                <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                    {featuresData.map((feature, idx) => (
                        <div key={idx} style={{
                            padding: '2rem',
                            backgroundColor: 'var(--color-surface-alt)',
                            borderRadius: 'var(--radius-lg)',
                            border: '1px solid var(--color-border)',
                            transition: 'all var(--transition-base)',
                            cursor: 'default',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            textAlign: 'left'
                        }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-5px)'
                                e.currentTarget.style.boxShadow = 'var(--shadow-lg)'
                                e.currentTarget.style.borderColor = 'var(--color-primary-dark)'
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)'
                                e.currentTarget.style.boxShadow = 'none'
                                e.currentTarget.style.borderColor = 'var(--color-border)'
                            }}
                        >
                            <div style={{
                                fontSize: '2rem',
                                marginBottom: '1.5rem',
                                display: 'inline-flex',
                                padding: '0.75rem',
                                backgroundColor: 'var(--color-primary-light)',
                                borderRadius: 'var(--radius-md)',
                                color: 'var(--color-primary)'
                            }}>
                                {feature.icon}
                            </div>
                            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.75rem', color: 'var(--color-text-main)' }}>
                                {feature.title}
                            </h3>
                            <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.6', fontSize: '0.95rem' }}>
                                {feature.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Features
