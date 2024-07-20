import axios from 'axios'
import { createContext, useState } from 'react'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState()
}
