import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useOrders } from '../context/OrdersContext'

const CartPage = () => {
    const navigate = useNavigate()
    const { addOrder } = useOrders()

    // Mock cart data for demonstration (in a real app, this would come from a CartContext)
    const [cartItems, setCartItems] = useState([
        { id: 1, name: 'Cotton Onesie Set', price: 1200, quantity: 10, image: '👕' }, // 10 packs
        { id: 4, name: 'Muslin Swaddle Wrap', price: 1500, quantity: 5, image: '🧣' }, // 5 packs
    ])

    const [poNumber, setPoNumber] = useState('')
    const [paymentMethod, setPaymentMethod] = useState('pay_later') // 'pay_now' | 'pay_later'
    const [isSubmitting, setIsSubmitting] = useState(false)

    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    const tax = total * 0.18 // 18% GST example

    const handleQuantityChange = (id, delta) => {
        setCartItems(prev => prev.map(item => {
            if (item.id === id) {
                const newQty = Math.max(0, item.quantity + delta)
                return { ...item, quantity: newQty }
            }
            return item
        }).filter(item => item.quantity > 0))
    }

    const loadScript = (src) => {
        return new Promise((resolve) => {
            const script = document.createElement('script')
            script.src = src
            script.onload = () => resolve(true)
            script.onerror = () => resolve(false)
            document.body.appendChild(script)
        })
    }

    const handleCheckout = async () => {
        setIsSubmitting(true)

        if (paymentMethod === 'pay_later') {
            // Existing Pay Later Logic
            setTimeout(() => {
                const newOrder = {
                    customer: 'Retailer (You)',
                    destination: 'Your Store Address',
                    amount: total + tax,
                    items: cartItems,
                    poNumber: poNumber || 'N/A',
                    paymentMethod: 'pay_later',
                    paymentStatus: 'Pending Payment'
                }

                const orderId = addOrder(newOrder)
                alert(`Wholesale Order #${orderId} Submitted Successfully! Invoice generated.`)
                navigate('/dashboard')
            }, 1500)
            return;
        }

        // Razorpay Logic
        const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

        if (!res) {
            alert('Razorpay SDK failed to load. Are you online?')
            setIsSubmitting(false)
            return
        }

        // Create Order on Backend
        try {
            const result = await fetch('http://localhost:3001/api/create-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: total + tax,
                    currency: 'INR',
                    receipt: `receipt_${Date.now()}`
                })
            });

            if (!result.ok) {
                throw new Error(`Server error: ${result.status}`);
            }

            const orderData = await result.json();

            if (!orderData.id) {
                alert('Server error: Invalid order data received.');
                setIsSubmitting(false);
                return;
            }

            const options = {
                key: "rzp_test_YOUR_KEY_ID_HERE", // Enter the Key ID generated from the Dashboard
                amount: orderData.amount,
                currency: orderData.currency,
                name: "BabyBloom Wholesale",
                description: "Wholesale Purchase",
                image: "https://example.com/your_logo",
                order_id: orderData.id,
                handler: async function (response) {
                    // Verify Payment with Backup
                    try {
                        const verifyRes = await fetch('http://localhost:3001/api/verify-payment', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature
                            })
                        });

                        const verifyData = await verifyRes.json();

                        if (verifyData.success) {
                            const newOrder = {
                                customer: 'Retailer (You)',
                                destination: 'Your Store Address',
                                amount: total + tax,
                                items: cartItems,
                                poNumber: poNumber || 'N/A',
                                paymentMethod: paymentMethod, // 'pay_now'
                                paymentStatus: 'Paid',
                                paymentDetails: {
                                    id: response.razorpay_payment_id,
                                    orderId: response.razorpay_order_id
                                }
                            }
                            const orderId = addOrder(newOrder)
                            alert(`Payment Successful! Order #${orderId} Confirmed.`)
                            navigate('/dashboard')
                        } else {
                            alert('Payment verification failed. Please contact support.')
                        }
                    } catch (err) {
                        console.error(err);
                        alert('Payment verification error')
                    }
                },
                prefill: {
                    name: "Retailer Name",
                    email: "retailer@example.com",
                    contact: "9999999999"
                },
                notes: {
                    address: "Retailer Address"
                },
                theme: {
                    color: "#10b981"
                }
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
            setIsSubmitting(false); // Modal is open, we can reset this or keep it true until handler called. 
            // Better to keep UI interactive or handle modal close. 
            // Razorpay has 'modal.ondismiss' callback if needed.

        } catch (err) {
            console.error(err);
            alert('Error creating order. Is backend running?');
            setIsSubmitting(false);
        }
    }

    if (cartItems.length === 0) {
        return (
            <div className="section" style={{ textAlign: 'center', minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🛒</div>
                <h1 style={{ fontSize: '2rem', marginBottom: '1rem', fontWeight: '700' }}>Your Wholesale Order is Empty</h1>
                <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem' }}>Start adding products to build your line sheet.</p>
                <Link to="/products" className="btn btn-primary">Browse Catalog</Link>
            </div>
        )
    }

    return (
        <div className="page-wrapper">
            <div className="container section">
                <h1 style={{ fontSize: '2rem', fontWeight: '800', fontFamily: 'var(--font-display)', marginBottom: '2rem' }}>Review Order</h1>

                <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
                    {/* Cart Items */}
                    <div className="flex flex-col" style={{ gap: '1.5rem', flex: 2 }}>
                        {cartItems.map(item => (
                            <div key={item.id} className="card" style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', padding: '1.5rem' }}>
                                <div style={{ fontSize: '2.5rem', backgroundColor: 'var(--color-primary-light)', width: '80px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 'var(--radius-md)' }}>
                                    {item.image}
                                </div>

                                <div style={{ flex: 1 }}>
                                    <h3 style={{ fontSize: '1.125rem', fontWeight: '700', marginBottom: '0.25rem' }}>{item.name}</h3>
                                    <div style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>ID: {item.id}</div>
                                </div>

                                <div className="flex items-center" style={{ gap: '1rem' }}>
                                    <div className="flex items-center" style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)' }}>
                                        <button
                                            className="btn btn-ghost"
                                            style={{ padding: '0.5rem 0.75rem' }}
                                            onClick={() => handleQuantityChange(item.id, -1)}
                                        >-</button>
                                        <span style={{ fontWeight: '600', minWidth: '30px', textAlign: 'center' }}>{item.quantity}</span>
                                        <button
                                            className="btn btn-ghost"
                                            style={{ padding: '0.5rem 0.75rem' }}
                                            onClick={() => handleQuantityChange(item.id, 1)}
                                        >+</button>
                                    </div>
                                </div>

                                <div style={{ fontWeight: '700', minWidth: '100px', textAlign: 'right', fontSize: '1.125rem' }}>
                                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Summary */}
                    <div style={{ flex: 1 }}>
                        <div className="card" style={{ position: 'sticky', top: '100px' }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem' }}>Order Summary</h3>

                            <div className="flex flex-col" style={{ gap: '1rem', marginBottom: '1.5rem' }}>
                                <div className="flex justify-between">
                                    <span style={{ color: 'var(--color-text-muted)' }}>Subtotal</span>
                                    <span style={{ fontWeight: '600' }}>₹{total.toLocaleString('en-IN')}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span style={{ color: 'var(--color-text-muted)' }}>GST (18%)</span>
                                    <span style={{ fontWeight: '600' }}>₹{tax.toLocaleString('en-IN')}</span>
                                </div>
                                <div className="flex justify-between" style={{ borderTop: '1px solid var(--color-border)', paddingTop: '1rem', marginTop: '0.5rem' }}>
                                    <span style={{ fontSize: '1.125rem', fontWeight: '700' }}>Total</span>
                                    <span style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--color-primary)' }}>₹{(total + tax).toLocaleString('en-IN')}</span>
                                </div>
                            </div>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', fontSize: '1rem', fontWeight: '600', marginBottom: '1rem', color: '#374151' }}>Payment Method</label>

                                <div className="flex flex-col" style={{ gap: '0.75rem' }}>
                                    {/* Pay Later Option */}
                                    <label style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        padding: '1rem',
                                        border: `1px solid ${paymentMethod === 'pay_later' ? 'var(--color-primary)' : 'var(--color-border)'}`,
                                        borderRadius: 'var(--radius-md)',
                                        cursor: 'pointer',
                                        backgroundColor: paymentMethod === 'pay_later' ? '#F0FDF4' : 'white',
                                        transition: 'all 0.2s'
                                    }}>
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="pay_later"
                                            checked={paymentMethod === 'pay_later'}
                                            onChange={() => setPaymentMethod('pay_later')}
                                            style={{ marginRight: '1rem', accentColor: 'var(--color-primary)' }}
                                        />
                                        <div>
                                            <div style={{ fontWeight: '600', color: '#1f2937' }}>Pay Later (Net-30)</div>
                                            <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>Invoice generated upon dispatch</div>
                                        </div>
                                    </label>

                                    {/* Pay Now Option */}
                                    <label style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        padding: '1rem',
                                        border: `1px solid ${paymentMethod === 'pay_now' ? 'var(--color-primary)' : 'var(--color-border)'}`,
                                        borderRadius: 'var(--radius-md)',
                                        cursor: 'pointer',
                                        backgroundColor: paymentMethod === 'pay_now' ? '#F0FDF4' : 'white',
                                        transition: 'all 0.2s'
                                    }}>
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="pay_now"
                                            checked={paymentMethod === 'pay_now'}
                                            onChange={() => setPaymentMethod('pay_now')}
                                            style={{ marginRight: '1rem', accentColor: 'var(--color-primary)' }}
                                        />
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontWeight: '600', color: '#1f2937' }}>Pay Now</div>
                                            <div style={{ fontSize: '0.8rem', color: '#6b7280', display: 'flex', gap: '0.5rem', marginTop: '0.25rem' }}>
                                                <span>💳 Card</span>
                                                <span>•</span>
                                                <span>📱 UPI</span>
                                                <span>•</span>
                                                <span>🏦 NetBanking</span>
                                            </div>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            <div className="input-group" style={{ marginBottom: '1.5rem' }}>
                                <label className="input-label">Purchase Order (PO) Number</label>
                                <input
                                    className="input"
                                    placeholder="Optional (e.g., PO-2025-001)"
                                    value={poNumber}
                                    onChange={(e) => setPoNumber(e.target.value)}
                                />
                            </div>

                            <button
                                className="btn btn-primary"
                                style={{ width: '100%', padding: '1rem', fontSize: '1.125rem' }}
                                onClick={handleCheckout}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (paymentMethod === 'pay_now' ? 'Processing Payment...' : 'Processing Order...') : (paymentMethod === 'pay_now' ? 'Proceed to Secure Payment' : 'Submit Wholesale Order')}
                            </button>

                            {paymentMethod === 'pay_now' && (
                                <div style={{ marginTop: '1rem', fontSize: '0.75rem', color: '#6b7280', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                    <span>🔒 Secure payment powered by</span>
                                    <span style={{ fontWeight: '700', color: '#374151' }}>Razorpay</span>
                                </div>
                            )}

                            {paymentMethod === 'pay_later' && (
                                <p style={{ marginTop: '1rem', fontSize: '0.75rem', color: 'var(--color-text-muted)', textAlign: 'center' }}>
                                    Invoice will be generated upon dispatch.
                                    <br />Standard Net-30 payment terms apply.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartPage
