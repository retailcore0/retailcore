'use client';

import { z } from 'zod';
import { redirect } from 'next/navigation';

// Esquema de validação para o login
const signInSchema = z.object({
  email: z.string().email().min(3).max(255),
  password: z.string().min(8).max(100),
});

// Esquema de validação para o registro
const signUpSchema = z.object({
  email: z.string().email().min(3).max(255),
  password: z.string().min(8).max(100),
  storeName: z.string().min(2).optional(),
});

// Função cliente para simulação de login
export async function signIn(state: any, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  try {
    const validatedData = signInSchema.parse({ email, password });
    
    // Simula uma verificação de email/senha (apenas para demonstração)
    if (email === 'error@exemplo.com') {
      return {
        error: 'Email ou senha inválidos. Por favor, tente novamente.',
        email,
        password,
      };
    }
    
    // Simula login bem-sucedido
    localStorage.setItem('isAuthenticated', 'true');
    
    // Redirecionamento para dashboard
    window.location.href = '/dashboard';
    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        error: 'Dados de login inválidos. Verifique email e senha.',
        email,
        password,
      };
    }
    
    return {
      error: 'Erro ao fazer login. Tente novamente.',
      email,
      password,
    };
  }
}

// Função cliente para simulação de registro
export async function signUp(state: any, formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const storeName = formData.get('storeName') as string;

  try {
    const validatedData = signUpSchema.parse({ email, password, storeName });
    
    // Simula verificação de email existente
    if (email === 'existente@exemplo.com') {
      return {
        error: 'Este email já está registrado. Tente outro ou faça login.',
        email,
        password,
      };
    }
    
    // Simula registro bem-sucedido
    localStorage.setItem('isAuthenticated', 'true');
    
    // Redirecionamento para dashboard
    window.location.href = '/dashboard';
    return { success: true };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        error: 'Dados de registro inválidos. Verifique as informações fornecidas.',
        email,
        password,
      };
    }
    
    return {
      error: 'Erro ao criar conta. Tente novamente.',
      email,
      password,
    };
  }
}

// Função cliente para simulação de logout
export async function signOut() {
  // Remove o flag de autenticação
  localStorage.removeItem('isAuthenticated');
  
  // Redireciona para a página inicial
  window.location.href = '/';
}
