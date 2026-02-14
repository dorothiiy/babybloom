import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const Hero = () => {
    const [offset, setOffset] = useState(0)

    useEffect(() => {
        const handleScroll = () => setOffset(window.scrollY)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <section className="section" style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: '8rem',
            position: 'relative',
            overflow: 'hidden',
            marginTop: '-5rem' // Pull up behind navbar
        }}>
            {/* Dynamic Background */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(to bottom, var(--color-surface) 0%, #F1F5F9 100%)',
                zIndex: -2
            }} />

            {/* Animated Blobs */}
            <div style={{
                position: 'absolute',
                top: '-10%',
                right: '-5%',
                width: '800px',
                height: '800px',
                background: 'radial-gradient(circle, var(--color-primary-light) 0%, rgba(255,255,255,0) 70%)',
                borderRadius: '50%',
                zIndex: -1,
                opacity: 0.6,
                transform: `translateY(${offset * 0.2}px)`
            }} />
            <div style={{
                position: 'absolute',
                bottom: '10%',
                left: '-10%',
                width: '600px',
                height: '600px',
                background: 'radial-gradient(circle, #FEF3C7 0%, rgba(255,255,255,0) 70%)',
                borderRadius: '50%',
                zIndex: -1,
                opacity: 0.5,
                transform: `translateY(${offset * -0.1}px)`
            }} />

            <div className="container flex flex-col items-center" style={{ textAlign: 'center', maxWidth: '1000px', position: 'relative', zIndex: 1 }}>
                <div className="fade-in-up" style={{ animationDelay: '0.1s' }}>
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.5rem 1.25rem',
                        borderRadius: 'var(--radius-full)',
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        backdropFilter: 'blur(10px)',
                        color: 'var(--color-primary)',
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        marginBottom: '2rem',
                        border: '1px solid var(--color-primary-light)',
                        boxShadow: 'var(--shadow-sm)'
                    }}>
                        <span style={{ display: 'block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-primary)' }}></span>
                        The #1 Choice for Modern Retailers
                    </div>
                </div>

                <h1 className="fade-in-up" style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(3rem, 6vw, 5rem)',
                    fontWeight: '800',
                    lineHeight: '1.1',
                    marginBottom: '1.5rem',
                    letterSpacing: '-0.02em',
                    color: 'var(--color-text-main)',
                    animationDelay: '0.2s'
                }}>
                    Wholesale Baby Apparel, <br />
                    <span className="text-gradient">Made Simple for Retailers.</span>
                </h1>

                <p className="fade-in-up" style={{
                    fontSize: '1.25rem',
                    lineHeight: '1.6',
                    color: 'var(--color-text-muted)',
                    marginBottom: '3rem',
                    maxWidth: '700px',
                    animationDelay: '0.3s'
                }}>
                    Access premium, ethically sourced baby clothing at competitive wholesale rates.
                    Streamlined ordering, low MOQs, and reliable shipping designed to help your boutique grow.
                </p>

                <div className="flex fade-in-up" style={{ gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', animationDelay: '0.4s' }}>
                    <Link to="/register" className="btn btn-primary" style={{ fontSize: '1.125rem', padding: '1rem 2.5rem', boxShadow: 'var(--shadow-glow)' }}>
                        Apply for Wholesale
                    </Link>
                    <Link to="/login" className="btn btn-outline" style={{ fontSize: '1.125rem', padding: '1rem 2.5rem', backgroundColor: 'white' }}>
                        Login to Portal
                    </Link>
                </div>

                {/* Dashboard / Product Preview Mockup */}
                <div className="fade-in-up" style={{
                    marginTop: '5rem',
                    width: '100%',
                    maxWidth: '1100px',
                    aspectRatio: '16/9',
                    background: 'rgba(255, 255, 255, 0.6)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: 'var(--radius-xl)',
                    border: '1px solid rgba(255, 255, 255, 0.8)',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1)',
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    animationDelay: '0.6s',
                    transform: `perspective(1000px) rotateX(2deg) translateY(${offset * -0.05}px)`
                }}>
                    {/* Mock Browser Header */}
                    <div style={{ height: '40px', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0 1.5rem' }}>
                        <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#EF4444' }}></div>
                        <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#F59E0B' }}></div>
                        <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#10B981' }}></div>
                    </div>
                    {/* Mock Content */}
                    <div style={{ flex: 1, padding: '2rem', display: 'grid', gridTemplateColumns: '250px 1fr', gap: '2rem', backgroundColor: '#F8FAFC' }}>
                        {/* Sidebar Mock */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div style={{ height: '40px', width: '80%', background: 'var(--color-primary-light)', borderRadius: 'var(--radius-md)' }}></div>
                            <div style={{ height: '20px', width: '60%', background: 'var(--color-border)', borderRadius: 'var(--radius-sm)', marginTop: '2rem' }}></div>
                            <div style={{ height: '20px', width: '70%', background: 'var(--color-border)', borderRadius: 'var(--radius-sm)' }}></div>
                            <div style={{ height: '20px', width: '50%', background: 'var(--color-border)', borderRadius: 'var(--radius-sm)' }}></div>
                        </div>
                        {/* Grid Mock */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
                            {[...Array(6)].map((_, i) => (
                                <div key={i} style={{
                                    backgroundColor: 'white',
                                    borderRadius: 'var(--radius-lg)',
                                    height: '180px',
                                    boxShadow: 'var(--shadow-sm)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    padding: '1rem',
                                    gap: '0.5rem'
                                }}>
                                    <div style={{ flex: 1, backgroundColor: 'var(--color-surface-alt)', borderRadius: 'var(--radius-md)' }}></div>
                                    <div style={{ height: '12px', width: '70%', backgroundColor: 'var(--color-border)', borderRadius: 'var(--radius-sm)' }}></div>
                                    <div style={{ height: '12px', width: '40%', backgroundColor: 'var(--color-primary-light)', borderRadius: 'var(--radius-sm)' }}></div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Floating Badge */}
                    <div style={{
                        position: 'absolute',
                        bottom: '2rem',
                        right: '2rem',
                        backgroundColor: 'var(--color-primary)',
                        color: 'white',
                        padding: '1rem 2rem',
                        borderRadius: 'var(--radius-lg)',
                        fontWeight: '600',
                        boxShadow: 'var(--shadow-lg)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}>
                        <span>🚀</span> Live Inventory
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero
