import { createContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  authenticate: (token) => { },
  logout: () => { }
});

export const AuthContextProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState();

  const authenticate = async (token) => {
    setAuthToken(token);
    await AsyncStorage.setItem('token', token);
  }

  const logout = () => {
    setAuthToken(null);
    AsyncStorage.removeItem('token');
  }

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate,
    logout
  }

  return <AuthContext.Provider value={value}>
    {children}
  </AuthContext.Provider>
}