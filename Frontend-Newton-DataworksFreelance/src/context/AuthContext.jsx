import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      // Verify token
      axios.get('/api/auth/me')
        .then(response => {
          setUser(response.data)
        })
        .catch(() => {
          localStorage.removeItem('token')
        })
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  const login = async (credentials) => {
    console.log('Auth: Logging in...')
    try {
      const response = await axios.post('/api/auth/login', credentials, {
        timeout: 10000 // 10 second timeout
      })
      console.log('Auth: Login response:', response.data)
      const token = response.data.token
      const userData = response.data.user

      // Set token first
      localStorage.setItem('token', token)
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`

      // Set user state BEFORE navigating
      setUser(userData)
      console.log('Auth: User set, navigating to dashboard...')

      // Return the user data so the component can handle navigation
      return userData
    } catch (error) {
      console.error('Auth: Login error:', error)
      if (error.code === 'ECONNABORTED') {
        throw new Error('Request timed out. Please check your connection.')
      }
      throw error
    }
  }

  const signup = async (credentials) => {
    const response = await axios.post('/api/auth/signup', credentials)
    const token = response.data.token
    localStorage.setItem('token', token)
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    setUser(response.data.user)
    return response.data.user
  }

  const logout = () => {
    localStorage.removeItem('token')
    delete axios.defaults.headers.common['Authorization']
    setUser(null)
  }

  const updateProfile = async (profileData) => {
    try {
      const response = await axios.put('/api/users/profile', profileData)
      setUser(response.data)
      return response.data
    } catch (error) {
      console.error('Error updating profile:', error.response?.data || error.message)
      throw error
    }
  }

  const value = {
    user,
    login,
    signup,
    logout,
    updateProfile,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
