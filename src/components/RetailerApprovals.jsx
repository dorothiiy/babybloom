
const RetailerApprovals = () => {
    // Mock Data
    const retailers = [
        { id: 1, name: 'Tiny Toes Boutique', owner: 'Sarah J.', type: 'Physical Store', date: '2 mins ago', status: 'Pending' },
        { id: 2, name: 'Kids World Online', owner: 'Mike R.', type: 'E-commerce', date: '4 hours ago', status: 'Pending' },
        { id: 3, name: 'Baby Steps', owner: 'Emily W.', type: 'Chain (3 loc)', date: '1 day ago', status: 'Reviewing' },
    ]

    return (
        <div style={{ backgroundColor: 'white', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', overflow: 'hidden' }}>
            <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: '600' }}>New Retailer Applications <span style={{ backgroundColor: 'orange', padding: '0.1rem 0.5rem', borderRadius: '10px', fontSize: '0.75rem', color: 'white', marginLeft: '0.5rem' }}>3 New</span></h3>
                <button className="btn btn-ghost" style={{ fontSize: '0.875rem' }}>View All</button>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                <thead style={{ backgroundColor: 'var(--color-surface-alt)', textAlign: 'left' }}>
                    <tr>
                        <th style={{ padding: '0.75rem 1.5rem', fontWeight: '600', color: 'var(--color-text-muted)' }}>Store Name</th>
                        <th style={{ padding: '0.75rem 1.5rem', fontWeight: '600', color: 'var(--color-text-muted)' }}>Type</th>
                        <th style={{ padding: '0.75rem 1.5rem', fontWeight: '600', color: 'var(--color-text-muted)' }}>Contact</th>
                        <th style={{ padding: '0.75rem 1.5rem', fontWeight: '600', color: 'var(--color-text-muted)' }}>Applied</th>
                        <th style={{ padding: '0.75rem 1.5rem', fontWeight: '600', color: 'var(--color-text-muted)' }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {retailers.map((r, i) => (
                        <tr key={i} style={{ borderBottom: '1px solid var(--color-border)' }}>
                            <td style={{ padding: '1rem 1.5rem', fontWeight: '600' }}>{r.name}</td>
                            <td style={{ padding: '1rem 1.5rem' }}>{r.type}</td>
                            <td style={{ padding: '1rem 1.5rem' }}>{r.owner}</td>
                            <td style={{ padding: '1rem 1.5rem', color: 'var(--color-text-muted)' }}>{r.date}</td>
                            <td style={{ padding: '1rem 1.5rem' }}>
                                <div className="flex" style={{ gap: '0.5rem' }}>
                                    <button className="btn btn-primary" style={{ padding: '0.25rem 0.75rem', fontSize: '0.75rem' }}>Approve</button>
                                    <button className="btn btn-outline" style={{ padding: '0.25rem 0.75rem', fontSize: '0.75rem' }}>Review</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default RetailerApprovals
