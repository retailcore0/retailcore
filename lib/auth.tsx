'use client';

import { createContext, useContext, useState, useEffect } from 'react';

// Tipo simplificado de usuário
interface User {
  id: number;
  email: string;
  name: string | null;
  role: string;
}

// Mock de usuário para frontend
const mockUser: User = {
  id: 1,
  email: 'usuario@exemplo.com',
  name: 'Usuário Demo',
  role: 'owner',
};

// Contexto de autenticação
const AuthContext = createContext<{
  userPromise: Promise<User | null>;
}>({
  userPromise: Promise.resolve(null),
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userPromise, setUserPromise] = useState<Promise<User | null>>(
    Promise.resolve(null)
  );

  useEffect(() => {
    // Simula carregamento do usuário no cliente
    const loadUser = async () => {
      // Verifica se há um item de autenticação no localStorage
      const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
      
      if (isAuthenticated) {
        return mockUser;
      }
      return null;
    };

    setUserPromise(loadUser());
  }, []);

  return (
    <AuthContext.Provider value={{ userPromise }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useUser() {
  return useContext(AuthContext);
} 