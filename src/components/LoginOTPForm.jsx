import { useState, useEffect } from 'react';
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const LoginOTPForm = ({ onLoginSuccess }) => {
    const navigate = useNavigate();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState('PHONE'); // PHONE | OTP
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [timer, setTimer] = useState(0);
    const [confirmationResult, setConfirmationResult] = useState(null);

    useEffect(() => {
        // Initialize Recaptcha
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
                'size': 'invisible',
                'callback': (response) => {
                    // reCAPTCHA solved, allow signInWithPhoneNumber.
                },
                'expired-callback': () => {
                    // Response expired. Ask user to solve reCAPTCHA again.
                }
            });
        }

        let interval;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [timer]);

    const handleSendOTP = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        const formattedPhoneNumber = phoneNumber.startsWith('+') ? phoneNumber : `+${phoneNumber}`; // Basic formatting, ideally use a library

        try {
            const appVerifier = window.recaptchaVerifier;
            const result = await signInWithPhoneNumber(auth, formattedPhoneNumber, appVerifier);
            setConfirmationResult(result);
            setStep('OTP');
            setTimer(120); // 2 minutes
            setIsLoading(false);
        } catch (err) {
            console.error(err);
            setError(err.message || 'Failed to send OTP. Please try again.');
            setIsLoading(false);
            if (window.recaptchaVerifier) {
                window.recaptchaVerifier.clear();
                window.recaptchaVerifier = null; // Forces re-initialization on next attempt if needed, though usually just reset is enough
            }
        }
    };

    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const result = await confirmationResult.confirm(otp);
            const user = result.user;
            // Success!
            if (onLoginSuccess) {
                onLoginSuccess(user);
            } else {
                // Default behavior if no prop
                navigate('/dashboard');
            }
        } catch (err) {
            setError('Invalid OTP. Please check the code and try again.');
            setIsLoading(false);
        }
    };

    const handleResendOTP = async () => {
        if (timer > 0) return;
        setOtp('');
        // Re-trigger send OTP logic (might need to re-verify recaptcha depending on flow, but usually invisible recaptcha handles it)
        // For simplicity, we can just reset verify step or call handleSendOTP again if we kept the phone number
        // Ideally we should reuse the existing verifier if possible or create new one.
        // Let's just call the same logic but we need the event object or separate the logic.

        // Simulating event
        handleSendOTP({ preventDefault: () => { } });
    };

    return (
        <div className="flex flex-col gap-4 animate-fadeIn">
            <div id="recaptcha-container"></div>
            {error && (
                <div style={{ backgroundColor: '#FEF2F2', color: '#EF4444', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid #FECACA', fontSize: '0.9rem' }}>
                    ⚠️ {error}
                </div>
            )}

            {step === 'PHONE' ? (
                <form onSubmit={handleSendOTP} className="flex flex-col gap-4">
                    <div className="input-group">
                        <label className="input-label">Mobile Number</label>
                        <input
                            className="input"
                            type="tel"
                            placeholder="+1 555-0123"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                            disabled={isLoading}
                        />
                        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.5rem' }}>
                            We’ll send a one-time code to your registered phone number.
                        </p>
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ padding: '1rem', fontSize: '1rem' }}
                        disabled={isLoading || !phoneNumber}
                    >
                        {isLoading ? 'Sending Code...' : 'Send OTP'}
                    </button>
                    <div className="flex items-center justify-center" style={{ gap: '0.5rem', color: 'var(--color-text-muted)', fontSize: '0.75rem' }}>
                        <span>🔒 Secure Verification</span>
                    </div>
                </form>
            ) : (
                <form onSubmit={handleVerifyOTP} className="flex flex-col gap-4">
                    <div className="input-group">
                        <label className="input-label">Enter Verification Code</label>
                        <input
                            className="input"
                            type="text"
                            placeholder="123456"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            required
                            maxLength={6}
                            style={{ letterSpacing: '0.5rem', textAlign: 'center', fontSize: '1.5rem' }}
                            disabled={isLoading}
                        />
                        <div className="flex justify-between items-center" style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>
                            <span style={{ color: 'var(--color-text-muted)' }}>
                                {timer > 0 ? `Code expires in ${Math.floor(timer / 60)}:${(timer % 60).toString().padStart(2, '0')}` : 'Code expired'}
                            </span>
                            <button
                                type="button"
                                onClick={handleResendOTP}
                                disabled={timer > 0 || isLoading}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    color: timer > 0 ? 'var(--color-text-muted)' : 'var(--color-primary)',
                                    cursor: timer > 0 ? 'default' : 'pointer',
                                    fontWeight: '500'
                                }}
                            >
                                Resend OTP
                            </button>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ padding: '1rem', fontSize: '1rem' }}
                        disabled={isLoading || otp.length !== 6}
                    >
                        {isLoading ? 'Verifying...' : 'Verify & Login'}
                    </button>
                    <button
                        type="button"
                        onClick={() => { setStep('PHONE'); setOtp(''); setError(''); }}
                        style={{ background: 'none', border: 'none', color: 'var(--color-text-muted)', cursor: 'pointer', fontSize: '0.875rem' }}
                    >
                        ← Change Phone Number
                    </button>
                </form>
            )}
        </div>
    );
};

export default LoginOTPForm;
