const ProcessSection = () => {
    const steps = [
        {
            num: '01',
            title: 'Create Account',
            desc: 'Apply for a retailer account with your business details. Approval within 4 hours.'
        },
        {
            num: '02',
            title: 'Browse Catalog',
            desc: 'View wholesale prices, tiered discounts, and live inventory for over 500+ styles.'
        },
        {
            num: '03',
            title: 'Build Order',
            desc: 'Add packs to your cart. flexible MOQs allow you to test new styles with low risk.'
        },
        {
            num: '04',
            title: 'Fast Dispatch',
            desc: 'We process orders same-day. Receive your shipment at your store within 2-4 business days.'
        }
    ]

    return (
        <section className="section">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Wholesale Made Simple</h2>
                    <p className="section-subtitle">A streamlined process designed for busy boutique owners.</p>
                </div>

                <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                    {steps.map((step, idx) => (
                        <div key={idx} style={{ position: 'relative' }}>
                            <div style={{
                                fontSize: '4rem',
                                fontWeight: '800',
                                color: 'var(--color-surface-alt)',
                                lineHeight: '1',
                                marginBottom: '-1.5rem',
                                position: 'relative',
                                zIndex: 0
                            }}>
                                {step.num}
                            </div>
                            <div className="card" style={{ position: 'relative', zIndex: 1, borderTop: '4px solid var(--color-primary)' }}>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1rem' }}>{step.title}</h3>
                                <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.6' }}>{step.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default ProcessSection
