import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import AuthLayout from '../components/AuthLayout'
import LoginOTPForm from '../components/LoginOTPForm'
import ForgotPasswordModal from '../components/ForgotPasswordModal'

const LoginPage = () => {
    const navigate = useNavigate()
    const { login } = useAuth()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('customer') // 'customer' | 'admin'
    const [loginMethod, setLoginMethod] = useState('password') // 'password' | 'otp'
    const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false)
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const handleLogin = async (e) => {
        e.preventDefault()
        setError('')
        setIsLoading(true)

        // Simulate network delay
        setTimeout(() => {
            const res = login(username, password)
            if (res.success) {
                // Check if role matches user type for better UX, or just route based on actual type
                // Here we essentially "request" a role login
                if (res.type !== role) {
                    setError(`Account exists but is not a ${role} account.`)
                    setIsLoading(false)
                    return;
                }

                if (res.type === 'customer') navigate('/dashboard')
                else navigate('/admin')
            } else {
                setError(res.message)
                setIsLoading(false)
            }
        }, 800)
    }

    return (
        <AuthLayout
            title="Welcome Back"
            subtitle="Log in to access your wholesale dashboard."
            illustration="🔐"
        >
            {/* Login Method Toggle */}
            <div className="flex justify-center mb-6">
                <button
                    type="button"
                    onClick={() => setLoginMethod(loginMethod === 'password' ? 'otp' : 'password')}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--color-primary)',
                        fontWeight: '600',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}
                >
                    {loginMethod === 'password' ? '📱 Login with OTP instead' : '🔑 Login with Password instead'}
                </button>
            </div>

            {loginMethod === 'otp' ? (
                <LoginOTPForm onLoginSuccess={() => navigate('/dashboard')} />
            ) : (
                <form onSubmit={handleLogin} className="flex flex-col" style={{ gap: '1.5rem', width: '100%' }}>

                    {/* Role Switcher */}
                    <div style={{ display: 'flex', backgroundColor: 'var(--color-surface-alt)', padding: '0.35rem', borderRadius: 'var(--radius-lg)', marginBottom: '1rem' }}>
                        <button
                            type="button"
                            onClick={() => setRole('customer')}
                            style={{
                                flex: 1,
                                padding: '0.75rem',
                                borderRadius: 'var(--radius-md)',
                                border: 'none',
                                fontWeight: '600',
                                backgroundColor: role === 'customer' ? 'white' : 'transparent',
                                boxShadow: role === 'customer' ? 'var(--shadow-sm)' : 'none',
                                color: role === 'customer' ? 'var(--color-primary)' : 'var(--color-text-muted)',
                                transition: 'all 0.2s ease',
                                cursor: 'pointer'
                            }}
                        >
                            Retailer
                        </button>
                        <button
                            type="button"
                            onClick={() => setRole('admin')}
                            style={{
                                flex: 1,
                                padding: '0.75rem',
                                borderRadius: 'var(--radius-md)',
                                border: 'none',
                                fontWeight: '600',
                                backgroundColor: role === 'admin' ? 'white' : 'transparent',
                                boxShadow: role === 'admin' ? 'var(--shadow-sm)' : 'none',
                                color: role === 'admin' ? 'var(--color-primary)' : 'var(--color-text-muted)',
                                transition: 'all 0.2s ease',
                                cursor: 'pointer'
                            }}
                        >
                            Administrator
                        </button>
                    </div>

                    {error && (
                        <div style={{ backgroundColor: '#FEF2F2', color: '#EF4444', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid #FECACA', fontSize: '0.9rem' }}>
                            ⚠️ {error}
                        </div>
                    )}

                    <div className="input-group">
                        <label className="input-label">Email or Username</label>
                        <input
                            className="input"
                            required
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            placeholder="e.g. retailer@example.com"
                            autoFocus
                        />
                    </div>
                    <div className="input-group">
                        <div className="flex justify-between">
                            <label className="input-label">Password</label>
                            <button
                                type="button"
                                onClick={() => setIsForgotPasswordOpen(true)}
                                style={{
                                    fontSize: '0.875rem',
                                    color: 'var(--color-primary)',
                                    fontWeight: '500',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer'
                                }}
                            >
                                Forgot?
                            </button>
                        </div>
                        <input
                            className="input"
                            type="password"
                            required
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ padding: '1rem', fontSize: '1rem', marginTop: '1rem' }}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Verifying...' : 'Secure Login →'}
                    </button>

                    <div className="flex items-center" style={{ gap: '0.5rem', marginTop: '1rem', color: 'var(--color-text-muted)', fontSize: '0.875rem', justifyContent: 'center' }}>
                        <span>🔒 256-bit SSL Encrypted Connection</span>
                    </div>
                </form>
            )}

            <ForgotPasswordModal
                isOpen={isForgotPasswordOpen}
                onClose={() => setIsForgotPasswordOpen(false)}
            />

            <div style={{ marginTop: '2rem', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                Don't have a retailer account?
                <Link to="/register" style={{ color: 'var(--color-primary)', fontWeight: '600', marginLeft: '0.5rem' }}>Apply Now</Link>
            </div>
        </AuthLayout>
    )
}

export default LoginPage
