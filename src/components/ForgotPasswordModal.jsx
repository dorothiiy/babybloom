import { useState } from 'react';
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from '../firebase';

const ForgotPasswordModal = ({ isOpen, onClose }) => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [message, setMessage] = useState('');

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setStatus('loading');

        try {
            await sendPasswordResetEmail(auth, email);
            setStatus('success');
            setMessage('Password reset email sent! Check your inbox.');
        } catch (error) {
            console.error("Error sending password reset email: ", error);
            setStatus('error');
            // Friendly error messages
            if (error.code === 'auth/user-not-found') {
                setMessage('No account found with this email.');
            } else {
                setMessage('Failed to send reset email. Please try again.');
            }
        }
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            backdropFilter: 'blur(2px)'
        }} onClick={onClose}>
            <div style={{
                backgroundColor: 'white',
                padding: '2rem',
                borderRadius: 'var(--radius-lg)', // Assuming global var exists, else 1rem
                maxWidth: '400px',
                width: '90%',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                position: 'relative'
            }} onClick={e => e.stopPropagation()}>

                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        background: 'none',
                        border: 'none',
                        fontSize: '1.5rem',
                        cursor: 'pointer',
                        color: '#6b7280'
                    }}
                >
                    &times;
                </button>

                <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.5rem', color: '#1f2937' }}>Reset Password</h2>
                <p style={{ color: '#6b7280', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                    Enter the email address associated with your account and we'll send you a link to reset your password.
                </p>

                {status === 'success' ? (
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📧</div>
                        <p style={{ color: '#059669', marginBottom: '1.5rem', fontWeight: '500' }}>{message}</p>
                        <button
                            onClick={onClose}
                            className="btn btn-primary" // Assuming global class
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', background: 'var(--color-primary, #10b981)', color: 'white', border: 'none', fontWeight: '600', cursor: 'pointer' }}
                        >
                            Back to Login
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        {message && status === 'error' && (
                            <div style={{ backgroundColor: '#FEF2F2', color: '#EF4444', padding: '0.75rem', borderRadius: '0.375rem', marginBottom: '1rem', fontSize: '0.9rem' }}>
                                {message}
                            </div>
                        )}

                        <div className="input-group" style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                required
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    border: '1px solid #d1d5db',
                                    borderRadius: '0.5rem',
                                    fontSize: '1rem'
                                }}
                                disabled={status === 'loading'}
                            />
                        </div>

                        <button
                            type="submit"
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                borderRadius: '0.5rem',
                                background: 'var(--color-primary, #10b981)',
                                color: 'white',
                                border: 'none',
                                fontWeight: '600',
                                cursor: 'pointer',
                                opacity: status === 'loading' ? 0.7 : 1
                            }}
                            disabled={status === 'loading'}
                        >
                            {status === 'loading' ? 'Sending Link...' : 'Send Reset Link'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ForgotPasswordModal;
