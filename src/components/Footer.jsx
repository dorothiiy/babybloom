const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <h3 className="brand" style={{ marginBottom: '1rem' }}>
                        Baby<span className="brand-accent">Bloom</span>.
                    </h3>
                    <p className="footer-text">
                        Premium clothing usage for the little years. Wholesaling made simple for modern retailers.
                    </p>
                    <div className="footer-copyright">
                        &copy; {new Date().getFullYear()} BabyBloom Agency. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
