const TestimonialsSection = () => {
    const testimonials = [
        {
            text: "BabyBloom transformed how we stock our store. The quality is unmatched, and the wholesale portal is so easy to use.",
            author: "Sarah J.",
            role: "Owner, Tiny Toes Boutique",
            rating: 5
        },
        {
            text: "I love the low MOQs. It allows me to test new styles without committing to huge inventory. Shipping is super fast too!",
            author: "Michael R.",
            role: "Manager, Kidz Conner",
            rating: 5
        },
        {
            text: "Finally, a wholesale platform that understands boutique needs. The tiered pricing helped us increase our margins significantly.",
            author: "Emily W.",
            role: "Founder, Mom & Co",
            rating: 5
        }
    ]

    return (
        <section className="section">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Trusted by Retailers</h2>
                    <p className="section-subtitle">Join 500+ happy store owners growing their business with BabyBloom.</p>
                </div>

                <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    {testimonials.map((t, idx) => (
                        <div key={idx} className="card" style={{ padding: '2.5rem' }}>
                            <div style={{ color: '#F59E0B', fontSize: '1.25rem', marginBottom: '1.5rem' }}>
                                {'★'.repeat(t.rating)}
                            </div>
                            <p style={{ fontSize: '1.125rem', lineHeight: '1.6', fontStyle: 'italic', marginBottom: '2rem', flex: 1 }}>"{t.text}"</p>
                            <div className="flex items-center" style={{ gap: '1rem' }}>
                                <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'var(--color-primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'var(--color-primary)' }}>
                                    {t.author.charAt(0)}
                                </div>
                                <div>
                                    <div style={{ fontWeight: '700', color: 'var(--color-text-main)' }}>{t.author}</div>
                                    <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>{t.role}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default TestimonialsSection
