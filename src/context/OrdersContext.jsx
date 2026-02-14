import { createContext, useState, useContext } from 'react'

const OrdersContext = createContext()

export const useOrders = () => useContext(OrdersContext)

export const OrdersProvider = ({ children }) => {
    // Initial mock data moved from Dashboard
    const [orders, setOrders] = useState([
        { id: 'ORD-7829', customer: 'Tiny Tots Boutique', destination: '123 Market St, New York', amount: 12450, status: 'In Transit', date: 'Today, 10:30 AM', items: [] },
        { id: 'ORD-7830', customer: 'Kids World', destination: '45 Green Ave, Brooklyn', amount: 8800, status: 'Pending', date: 'Today, 08:15 AM', items: [] },
        { id: 'ORD-7831', customer: 'Baby Bliss Store', destination: '890 Broad Way, Queens', amount: 15150, status: 'Delivered', date: 'Yesterday, 04:00 PM', items: [] },
        { id: 'ORD-7832', customer: 'Little Stars Shop', destination: '567 Commerce Blvd, Jersey City', amount: 22900, status: 'In Transit', date: 'Yesterday, 02:30 PM', items: [] },
        { id: 'ORD-7833', customer: 'Mom & Me', destination: '12 Main St, Hoboken', amount: 5540, status: 'Delivered', date: '2 days ago', items: [] },
        { id: 'ORD-7834', customer: 'CuddleBug Retail', destination: '789 Industrial Pkwy, Newark', amount: 40400, status: 'Pending', date: '2 days ago', items: [] },
    ])

    const addOrder = (order) => {
        const newOrder = {
            id: `ORD-${Math.floor(Math.random() * 10000)}`,
            status: 'Pending',
            date: 'Just now',
            ...order
        }
        setOrders(prev => [newOrder, ...prev])
        return newOrder.id
    }

    const updateOrder = (id, status) => {
        setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o))
    }

    return (
        <OrdersContext.Provider value={{ orders, addOrder, updateOrder }}>
            {children}
        </OrdersContext.Provider>
    )
}
