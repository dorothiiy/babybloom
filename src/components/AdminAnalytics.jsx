
const AdminAnalytics = ({ orders, inventory }) => {
    // Mock analytics logic
    const totalRevenue = orders.reduce((sum, o) => sum + (o.amount || 0), 0)
    const activeRetailers = 12 // Mock
    const lowStockItems = inventory.filter(i => i.stock < 10).length

    // Stat Card
    const Metric = ({ label, value, sub, color = 'var(--color-primary)' }) => (
        <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', flex: 1 }}>
            <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>{label}</div>
            <div style={{ fontSize: '2rem', fontWeight: '800', lineHeight: 1, color: 'var(--color-text-main)' }}>{value}</div>
            {sub && <div style={{ fontSize: '0.75rem', marginTop: '0.5rem', color: color }}>{sub}</div>}
        </div>
    )

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>
            {/* Top Metrics */}
            <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                <Metric label="Total Revenue (YTD)" value={`₹${(totalRevenue / 100000).toFixed(2)}L`} sub="↗ 12% vs last month" color="var(--color-success)" />
                <Metric label="Pending Orders" value={orders.filter(o => o.status === 'Pending').length} sub="Needs Attention" color="orange" />
                <Metric label="Active Retailers" value={activeRetailers} sub="+3 new this week" color="var(--color-primary)" />
                <Metric label="Low Stock Alerts" value={lowStockItems} sub="Urgent Restock" color="var(--color-error)" />
            </div>

            {/* Charts Area (Mock Visuals) */}
            <div className="grid" style={{ gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
                <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', minHeight: '300px' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 'Bold', marginBottom: '1.5rem' }}>Order Volume</h3>
                    {/* CSS-only Bar Chart Mock */}
                    <div style={{ display: 'flex', alignItems: 'flex-end', height: '200px', gap: '1rem' }}>
                        {[40, 65, 30, 80, 55, 90, 70].map((h, i) => (
                            <div key={i} style={{ flex: 1, backgroundColor: 'var(--color-primary-light)', height: `${h}%`, borderRadius: '4px 4px 0 0', position: 'relative', transition: 'height 0.3s ease' }}>
                                <div style={{ position: 'absolute', bottom: '-25px', width: '100%', textAlign: 'center', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', minHeight: '300px' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 'Bold', marginBottom: '1.5rem' }}>Fulfillment Status</h3>
                    {/* Donut Chart Mock */}
                    <div style={{ position: 'relative', width: '160px', height: '160px', borderRadius: '50%', background: 'conic-gradient(var(--color-success) 0% 60%, var(--color-primary) 60% 85%, orange 85% 100%)', margin: '0 auto' }}>
                        <div style={{ position: 'absolute', inset: '20px', backgroundColor: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                            <div style={{ fontSize: '1.5rem', fontWeight: '800' }}>98%</div>
                            <div style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)' }}>On Time</div>
                        </div>
                    </div>
                    <div style={{ marginTop: '2rem', fontSize: '0.875rem' }}>
                        <div className="flex justify-between" style={{ marginBottom: '0.5rem' }}><span style={{ color: 'var(--color-success)' }}>● Delivered</span> <span>60%</span></div>
                        <div className="flex justify-between" style={{ marginBottom: '0.5rem' }}><span style={{ color: 'var(--color-primary)' }}>● In Transit</span> <span>25%</span></div>
                        <div className="flex justify-between"><span style={{ color: 'orange' }}>● Pending</span> <span>15%</span></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminAnalytics
