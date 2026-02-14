
const AuthLayout = ({ children, title, subtitle, illustration }) => {
    return (
        <div style={{ display: 'flex', minHeight: '100vh', width: '100%', backgroundColor: 'var(--color-surface)' }}>
            {/* Left/Top Content - Form Area */}
            <div style={{
                flex: '1',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '4rem 2rem',
                maxWidth: '600px',
                margin: '0 auto',
                width: '100%'
            }}>
                <div style={{ marginBottom: '3rem' }}>
                    <div className="flex items-center" style={{ gap: '1rem', marginBottom: '2rem' }}>
                        <div className="brand" style={{ fontSize: '1.5rem' }}>
                            Baby<span className="brand-accent">Bloom</span>.
                        </div>
                        <div style={{ padding: '0.25rem 0.75rem', backgroundColor: '#F0FDF4', color: '#15803d', borderRadius: '999px', fontSize: '0.75rem', fontWeight: '600', display: 'flex', items: 'center', gap: '0.25rem', border: '1px solid #DCFCE7' }}>
                            🔒 Secure Access
                        </div>
                    </div>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: '800', fontFamily: 'var(--font-display)', marginBottom: '1rem', color: 'var(--color-text-main)' }}>
                        {title}
                    </h1>
                    <p style={{ fontSize: '1.125rem', color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
                        {subtitle}
                    </p>
                </div>
                {children}

                <div style={{ marginTop: 'auto', paddingTop: '2rem', display: 'flex', gap: '1rem', opacity: 0.6, fontSize: '0.75rem' }}>
                    <span>© 2026 BabyBloom Inc.</span>
                    <span>Privacy</span>
                    <span>Terms</span>
                    <span>Secure Encryption</span>
                </div>
            </div>

            {/* Right/Bottom Visual - Illustration */}
            <div className="hidden-mobile" style={{
                flex: '1',
                backgroundColor: 'var(--color-surface-alt)',
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <div style={{
                    position: 'absolute',
                    top: '-20%',
                    right: '-20%',
                    width: '600px',
                    height: '600px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, var(--color-primary-light) 0%, rgba(255,255,255,0) 70%)',
                    opacity: 0.5
                }} />

                <div style={{
                    position: 'relative',
                    zIndex: 1,
                    textAlign: 'center',
                    padding: '3rem'
                }}>
                    <div style={{ fontSize: '6rem', marginBottom: '2rem' }}>
                        {illustration || '✨'}
                    </div>
                    <div style={{
                        background: 'rgba(255,255,255,0.8)',
                        backdropFilter: 'blur(10px)',
                        padding: '2rem',
                        borderRadius: 'var(--radius-lg)',
                        border: '1px solid var(--color-border)',
                        boxShadow: 'var(--shadow-lg)',
                        maxWidth: '400px'
                    }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem' }}>Trusted by 500+ Retailers</h3>
                        <p style={{ color: 'var(--color-text-muted)' }}>"BabyBloom simplifies our wholesale ordering process completely."</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthLayout
