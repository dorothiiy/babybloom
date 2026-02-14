import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import './NewsletterSection.css'; // We will create this for basic styling if needed, or use inline/existing styles

const NewsletterSection = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !email.includes('@')) {
            setMessage('Please enter a valid email address.');
            setStatus('error');
            return;
        }

        setStatus('loading');
        try {
            await addDoc(collection(db, 'mailingList'), {
                email: email,
                timestamp: new Date()
            });
            setStatus('success');
            setMessage('Thank you for joining our mailing list!');
            setEmail('');
        } catch (error) {
            console.error("Error adding document: ", error);
            setStatus('error');
            setMessage('Something went wrong. Please try again later.');
        }
    };

    return (
        <section className="newsletter-section">
            <div className="container">
                <div className="newsletter-content">
                    <h2>Join Our Mailing List</h2>
                    <p>Stay updated with our latest products and wholesale offers.</p>

                    <form onSubmit={handleSubmit} className="newsletter-form">
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={status === 'loading' || status === 'success'}
                            className="newsletter-input"
                        />
                        <button
                            type="submit"
                            disabled={status === 'loading' || status === 'success'}
                            className="newsletter-button"
                        >
                            {status === 'loading' ? 'Joining...' : status === 'success' ? 'Joined!' : 'Join Now'}
                        </button>
                    </form>

                    {message && (
                        <p className={`newsletter-message ${status}`}>
                            {message}
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
};

// Start of fix for the bug in the button text logic
// I noticed I used 'success' variable which is not defined, I should check status === 'success'
// I will correct this in the file content directly.

export default NewsletterSection;
