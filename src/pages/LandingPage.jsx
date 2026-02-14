import Hero from '../components/Hero'
import Features from '../components/Features'
import ProcessSection from '../components/ProcessSection'
import CategoriesSection from '../components/CategoriesSection'
import TestimonialsSection from '../components/TestimonialsSection'
import LogisticsSection from '../components/LogisticsSection'
import NewsletterSection from '../components/NewsletterSection'
import { Link } from 'react-router-dom'

const LandingPage = () => {
    return (
        <div className="landing-page">
            <Hero />
            <Features />
            <CategoriesSection />
            <ProcessSection />
            <TestimonialsSection />
            <LogisticsSection />

            {/* Final CTA */}
            <section className="section" style={{ textAlign: 'center', padding: '6rem 1.5rem' }}>
                <div className="container">
                    <h2 style={{ fontSize: '2.5rem', fontWeight: '800', fontFamily: 'var(--font-display)', marginBottom: '1.5rem' }}>Ready to Grow Your Boutique?</h2>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '1.25rem', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem' }}>
                        Join thousands of retailers stocking premium baby apparel. Account approval takes less than 4 hours.
                    </p>
                    <div className="flex justify-center" style={{ gap: '1rem' }}>
                        <Link to="/register" className="btn btn-primary" style={{ fontSize: '1.25rem', padding: '1.25rem 3rem', borderRadius: 'var(--radius-poll)' }}>
                            Start Your Application
                        </Link>
                        <Link to="/login" className="btn btn-outline" style={{ fontSize: '1.25rem', padding: '1.25rem 3rem', borderRadius: 'var(--radius-poll)' }}>
                            Member Login
                        </Link>
                    </div>
                </div>
            </section>
            <NewsletterSection />
        </div>
    )
}

export default LandingPage
