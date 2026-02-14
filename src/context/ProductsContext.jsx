import { createContext, useState, useContext } from 'react'

const ProductsContext = createContext()

export const useProducts = () => useContext(ProductsContext)

export const ProductsProvider = ({ children }) => {
    // Initial mock data
    const [products, setProducts] = useState([
        {
            id: 1,
            sku: 'BB-OS-001',
            name: 'Cotton Onesie Set',
            category: 'Essentials',
            price: 1200,
            retailPrice: 2400,
            moq: 10,
            packSize: 'Pack of 3',
            stock: 150,
            status: 'In Stock',
            sizes: ['0-3M', '3-6M', '6-9M'],
            tieredPricing: [
                { minQty: 10, price: 1200 },
                { minQty: 50, price: 1050 },
                { minQty: 100, price: 950 }
            ],
            description: 'Pack of 3 organic cotton onesies. Soft, breathable, and perfect for daily wear.',
            image: '👕'
        },
        {
            id: 2,
            sku: 'BB-KR-002',
            name: 'Knitted Romper',
            category: 'Outerwear',
            price: 2450,
            retailPrice: 4500,
            moq: 5,
            packSize: 'Single Unit',
            stock: 45,
            status: 'Low Stock',
            sizes: ['6-12M', '12-18M'],
            tieredPricing: [
                { minQty: 5, price: 2450 },
                { minQty: 20, price: 2200 }
            ],
            description: 'Warm knitted romper suitable for cooler evenings. Available in pastel shades.',
            image: '🧶'
        },
        {
            id: 3,
            sku: 'BB-SB-003',
            name: 'Soft Sole Booties',
            category: 'Footwear',
            price: 850,
            retailPrice: 1500,
            moq: 20,
            packSize: 'Pair',
            stock: 200,
            status: 'In Stock',
            sizes: ['S', 'M', 'L'],
            tieredPricing: [
                { minQty: 20, price: 850 },
                { minQty: 50, price: 750 },
                { minQty: 100, price: 650 }
            ],
            description: 'Handmade soft sole booties to keep little feet warm and cozy.',
            image: '🧦'
        },
        {
            id: 4,
            sku: 'BB-MS-004',
            name: 'Muslin Swaddle Wrap',
            category: 'Accessories',
            price: 1500,
            retailPrice: 2800,
            moq: 15,
            packSize: 'Pack of 2',
            stock: 80,
            status: 'In Stock',
            sizes: ['One Size'],
            tieredPricing: [
                { minQty: 15, price: 1500 },
                { minQty: 40, price: 1350 }
            ],
            description: 'Premium bamboo muslin swaddles. Ultra-soft and breathable.',
            image: '🧣'
        },
        {
            id: 5,
            sku: 'BB-FD-005',
            name: 'Summer Floral Dress',
            category: 'Dresses',
            price: 1800,
            retailPrice: 3200,
            moq: 8,
            packSize: 'Single Unit',
            stock: 60,
            status: 'In Stock',
            sizes: ['18-24M', '2-3Y', '3-4Y'],
            tieredPricing: [
                { minQty: 8, price: 1800 },
                { minQty: 24, price: 1650 }
            ],
            description: 'Lightweight floral print dress for summer outings.',
            image: '👗'
        },
        {
            id: 6,
            sku: 'BB-JO-006',
            name: 'Denim Overalls',
            category: 'Playwear',
            price: 2100,
            retailPrice: 3800,
            moq: 10,
            packSize: 'Single Unit',
            stock: 90,
            status: 'In Stock',
            sizes: ['2-3Y', '3-4Y', '4-5Y'],
            tieredPricing: [
                { minQty: 10, price: 2100 },
                { minQty: 30, price: 1950 }
            ],
            description: 'Durable and cute denim overalls for active toddlers.',
            image: '👖'
        },
        {
            id: 7,
            sku: 'BB-SS-007',
            name: 'Organic Sleep Sack',
            category: 'Essentials',
            price: 2800,
            retailPrice: 5000,
            moq: 6,
            packSize: 'Single Unit',
            stock: 0,
            status: 'Out of Stock',
            sizes: ['0-6M', '6-18M'],
            tieredPricing: [
                { minQty: 6, price: 2800 }
            ],
            description: 'Temperature regulating sleep sack for safe nights.',
            image: '💤'
        },
        {
            id: 8,
            sku: 'BB-RL-008',
            name: 'Ribbed Leggings',
            category: 'Bottoms',
            price: 950,
            retailPrice: 1800,
            moq: 25,
            packSize: 'Pack of 2',
            stock: 300,
            status: 'In Stock',
            sizes: ['All Sizes'],
            tieredPricing: [
                { minQty: 25, price: 950 },
                { minQty: 100, price: 800 }
            ],
            description: 'Stretchy ribbed leggings in neutral earth tones.',
            image: '👖'
        },
    ])

    const addProduct = (product) => {
        const newProduct = { ...product, id: Date.now() }
        setProducts(prev => [...prev, newProduct])
    }

    const updateProduct = (id, updatedData) => {
        setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updatedData } : p))
    }

    const deleteProduct = (id) => {
        setProducts(prev => prev.filter(p => p.id !== id))
    }

    return (
        <ProductsContext.Provider value={{ products, addProduct, updateProduct, deleteProduct }}>
            {children}
        </ProductsContext.Provider>
    )
}
