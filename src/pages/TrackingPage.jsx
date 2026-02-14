import { useParams, Link } from 'react-router-dom'

const TrackingPage = () => {
    const { id } = useParams()

    const events = [
        { time: '10:30 AM', date: 'Today', status: 'Out for Delivery', location: 'Distribution Center, NY', active: true },
        { time: '08:15 AM', date: 'Today', status: 'Arrived at Facility', location: 'Queens Sortation Hub', active: true },
        { time: '04:00 AM', date: 'Today', status: 'Departed Facility', location: 'Newark Logistics Park', active: true },
        { time: '06:30 PM', date: 'Yesterday', status: 'Order Picked up', location: 'Supplier Warehouse', active: true },
        { time: '05:00 PM', date: 'Yesterday', status: 'Order Placed', location: 'System', active: true },
    ]

    return (
        <div className="page-wrapper">
            <div className="container section">
                <Link to="/dashboard" className="btn btn-ghost" style={{ marginBottom: '2rem' }}>
                    ← Back to Dashboard
                </Link>

                <div className="flex flex-col" style={{ gap: '2rem' }}>
                    <div className="flex justify-between items-center wrap">
                        <div>
                            <h1 style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--color-text-main)', fontFamily: 'var(--font-display)' }}>Tracking Order #{id || 'ORD-7829'}</h1>
                            <p style={{ color: 'var(--color-text-muted)' }}>Estimated Delivery: <span style={{ color: 'var(--color-primary)', fontWeight: '600' }}>Today by 2:00 PM</span></p>
                        </div>
                        <button className="btn btn-primary">Download Invoice</button>
                    </div>

                    <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', minHeight: '500px' }}>
                        {/* Map Placeholder */}
                        <div className="card" style={{
                            padding: 0,
                            position: 'relative',
                            overflow: 'hidden',
                            minHeight: '400px',
                            backgroundColor: 'var(--color-surface-alt)'
                        }}>
                            {/* Mock Map UI */}
                            <div style={{
                                position: 'absolute',
                                inset: 0,
                                background: 'radial-gradient(circle at 50% 50%, var(--color-border) 10%, transparent 11%)',
                                backgroundSize: '40px 40px',
                                opacity: 0.3
                            }} />
                            <div style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                padding: '1rem',
                                backgroundColor: 'var(--color-surface)',
                                borderRadius: 'var(--radius-lg)',
                                boxShadow: 'var(--shadow-xl)',
                                fontWeight: '600',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                border: '1px solid var(--color-border)'
                            }}>
                                🚚 Truck #42 (Moving)
                            </div>
                        </div>

                        {/* Timeline */}
                        <div className="card">
                            <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem' }}>Shipment Progress</h3>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                                {events.map((event, idx) => (
                                    <div key={idx} style={{ display: 'flex', gap: '1.5rem', position: 'relative', paddingBottom: '2rem' }}>
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                            <div style={{
                                                width: '16px',
                                                height: '16px',
                                                borderRadius: '50%',
                                                backgroundColor: idx === 0 ? 'var(--color-primary)' : 'var(--color-border)',
                                                border: idx === 0 ? '4px solid var(--color-primary-light)' : 'none',
                                                boxShadow: idx === 0 ? '0 0 0 2px var(--color-primary)' : 'none',
                                                zIndex: 2
                                            }} />
                                            {idx !== events.length - 1 && (
                                                <div style={{
                                                    width: '2px',
                                                    flex: 1,
                                                    backgroundColor: 'var(--color-border)',
                                                    position: 'absolute',
                                                    top: '16px',
                                                    bottom: 0,
                                                    left: '7px'
                                                }} />
                                            )}
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: '600', color: idx === 0 ? 'var(--color-text-main)' : 'var(--color-text-muted)', fontSize: '1rem' }}>
                                                {event.status}
                                            </div>
                                            <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                                                {event.location}
                                            </div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.25rem', opacity: 0.8 }}>
                                                {event.date} • {event.time}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TrackingPage
