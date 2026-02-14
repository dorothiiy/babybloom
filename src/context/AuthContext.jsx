import { createContext, useState, useContext, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [users, setUsers] = useState([]) // Simulating database

    useEffect(() => {
        // Load users from local storage on mount
        const storedUsers = localStorage.getItem('baby_bloom_users')
        if (storedUsers) {
            setUsers(JSON.parse(storedUsers))
        } else {
            // Seed default admin if no users exist
            const defaultAdmin = {
                id: 1,
                username: 'admin',
                email: 'admin@babybloom.com',
                password: 'password', // Simple for demo
                fullName: 'System Admin',
                type: 'admin',
                storeName: 'HQ'
            }
            setUsers([defaultAdmin])
            localStorage.setItem('baby_bloom_users', JSON.stringify([defaultAdmin]))
        }
    }, [])

    const register = (userData) => {
        if (users.find(u => u.email === userData.email)) {
            return { success: false, message: 'Email already exists' }
        }

        // Generate Unique Username
        const baseName = (userData.storeName || userData.fullName || 'User').replace(/\s+/g, '').replace(/[^a-zA-Z0-9]/g, '').slice(0, 10)
        let generatedUsername = ''
        let isUnique = false

        // Simple collision avoidance
        do {
            const suffix = Math.floor(1000 + Math.random() * 9000)
            generatedUsername = `${baseName}_${suffix}`
            isUnique = !users.find(u => u.username === generatedUsername)
        } while (!isUnique)

        const newUser = { ...userData, username: generatedUsername, id: Date.now() }
        const updatedUsers = [...users, newUser]
        setUsers(updatedUsers)
        localStorage.setItem('baby_bloom_users', JSON.stringify(updatedUsers))
        return { success: true, username: generatedUsername }
    }

    const login = (identifier, password) => {
        const foundUser = users.find(u => (u.username === identifier || u.email === identifier || u.phone === identifier) && u.password === password)
        if (foundUser) {
            setUser(foundUser)
            return { success: true, type: foundUser.type }
        }
        return { success: false, message: 'Invalid credentials' }
    }

    const logout = () => {
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
