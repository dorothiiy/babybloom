const LogisticsSection = () => {
    return (
        <section className="section" style={{ backgroundColor: 'var(--color-primary)', color: 'white' }}>
            <div className="container">
                <div className="flex flex-col md:flex-row items-center justify-between" style={{ gap: '4rem' }}>
                    <div style={{ flex: 1 }}>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: '800', fontFamily: 'var(--font-display)', marginBottom: '1.5rem', color: 'white' }}>Global Logistics & Shipping</h2>
                        <p style={{ fontSize: '1.125rem', opacity: 0.9, lineHeight: '1.7', marginBottom: '2rem' }}>
                            We handle the complexities of supply chain so you can focus on your customers.
                            Partnering with top-tier carriers, we ensure your stock arrives on time, every time.
                        </p>

                        <div className="grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
                            <div style={{ padding: '1.5rem', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 'var(--radius-lg)' }}>
                                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🌍</div>
                                <h4 style={{ fontWeight: '700', marginBottom: '0.5rem', color: 'white' }}>International Shipping</h4>
                                <p style={{ fontSize: '0.875rem', opacity: 0.8 }}>Serving retailers in 25+ countries with handled customs.</p>
                            </div>
                            <div style={{ padding: '1.5rem', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 'var(--radius-lg)' }}>
                                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📦</div>
                                <h4 style={{ fontWeight: '700', marginBottom: '0.5rem', color: 'white' }}>Automated Tracking</h4>
                                <p style={{ fontSize: '0.875rem', opacity: 0.8 }}>Real-time updates from warehouse to your doorstep.</p>
                            </div>
                        </div>
                    </div>

                    <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                        {/* Abstract Globe/Map Graphic */}
                        <div style={{
                            width: '100%',
                            maxWidth: '500px',
                            aspectRatio: '1',
                            background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)',
                            borderRadius: '50%',
                            position: 'relative',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '1px solid rgba(255,255,255,0.1)'
                        }}>
                            <div style={{ fontSize: '10rem' }}>🚚</div>

                            {/* Orbiting dots */}
                            <div style={{ position: 'absolute', width: '100%', height: '100%', animation: 'spin 20s linear infinite' }}>
                                <div style={{ position: 'absolute', top: '0', left: '50%', width: '12px', height: '12px', background: 'white', borderRadius: '50%', boxShadow: '0 0 20px white' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default LogisticsSection
