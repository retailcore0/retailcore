'use client';

import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState('');
  
  // Função para lidar com o envio do formulário
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setFormError('');

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    // Simulação de login - em um projeto real, você chamaria seu backend
    try {
      // Aqui você chamaria sua API de autenticação
      console.log('Login com:', { email, password });
      
      // Simulando um delay para mostrar o estado de carregamento
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirecionar após login bem-sucedido
      router.push('/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      setFormError('Ocorreu um erro ao tentar fazer login. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Logo no topo esquerdo */}
      <div className="absolute top-[-2rem] left-16 z-20">
        <Link href="/">
          <Image 
            src="/logo-retail-core2.png" 
            alt="Retail Core Logo" 
            width={320} 
            height={320} 
            className="object-contain"
            priority
          />
        </Link>
      </div>
      
      {/* Menu de navegação no topo direito */}
      <div className="absolute top-6 right-8 z-20 flex gap-6">
        <Link href="/solucoes" className="text-white/90 hover:text-blue-400 transition-colors font-medium px-2 py-1">
          Soluções
        </Link>
        <Link href="/precos" className="text-white/90 hover:text-blue-400 transition-colors font-medium px-2 py-1">
          Preços
        </Link>
        <Link href="/contato" className="text-white/90 hover:text-blue-400 transition-colors font-medium px-2 py-1">
          Contato
        </Link>
      </div>
      
      <div className="min-h-screen relative flex items-center justify-start pl-[12%] mt-[30px]">
        {/* Card com efeito glassmorphism */}
        <div className="w-full max-w-md p-8 backdrop-blur-md bg-white/10 rounded-xl shadow-2xl border border-white/20 relative z-[100]">
          <div className="space-y-6">
            {/* Logo em vez de título */}
            <div className="flex justify-center mb-6">
              <Image 
                src="/logo-retail-core2.png" 
                alt="Retail Core Logo" 
                width={240}
                height={240}
                className="object-contain"
                priority
              />
            </div>
            
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-white">Entre ou Cadastre-se</h2>
            </div>

            {/* Mensagem de erro */}
            {formError && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm">
                {formError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-full text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={isLoading}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Senha"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-full text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={isLoading}
                    required
                  />
                  <button 
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-300"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="remember"
                    className="w-4 h-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                    disabled={isLoading}
                  />
                  <label htmlFor="remember" className="ml-2 text-sm text-gray-300">
                    Lembrar-me
                  </label>
                </div>
                <Link href="/forgot-password" className="text-sm text-gray-300 hover:text-blue-400">
                  Esqueceu a senha?
                </Link>
              </div>

              {/* Botão simples sem animações complexas */}
              <div className="relative mt-4 z-[100]" style={{ 
                position: 'relative', 
                zIndex: 100,
                visibility: 'visible',
                opacity: 1
              }}>
                <button
                  type="submit"
                  style={{ 
                    width: '100%', 
                    padding: '12px 16px',
                    borderRadius: '9999px',
                    fontWeight: '500',
                    color: 'white',
                    background: 'linear-gradient(to right, #1e40af, #2563eb)',
                    zIndex: 100,
                    position: 'relative',
                    visibility: 'visible',
                    opacity: 1,
                    pointerEvents: 'auto',
                    cursor: 'pointer'
                  }}
                  disabled={isLoading}
                >
                  {isLoading ? 'Entrando...' : 'Entrar'}
                </button>
              </div>
            </form>

            <div className="text-center mt-6">
              <p className="text-sm text-gray-300">
                Não tem uma conta?{' '}
                <Link href="/register" className="text-blue-400 hover:text-blue-300">
                  Cadastre-se agora
                </Link>
              </p>
            </div>

            <div className="relative flex items-center mt-6">
              <div className="flex-grow border-t border-gray-400/30"></div>
              <span className="flex-shrink mx-4 text-xs text-gray-400">ou continue com</span>
              <div className="flex-grow border-t border-gray-400/30"></div>
            </div>

            <div className="flex gap-3 justify-center">
              <button 
                type="button" 
                className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition"
                aria-label="Login com Google"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.3v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.08z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
              </button>
              <button 
                type="button" 
                className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition"
                aria-label="Login com GitHub"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.933.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" fill="white" />
                </svg>
              </button>
              <button 
                type="button" 
                className="bg-white/10 hover:bg-white/20 p-3 rounded-full transition"
                aria-label="Login com Microsoft"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.4 2H2v9.4h9.4V2z" fill="#F25022" />
                  <path d="M22 2h-9.4v9.4H22V2z" fill="#7FBA00" />
                  <path d="M11.4 12.7H2V22h9.4v-9.3z" fill="#00A4EF" />
                  <path d="M22 12.7h-9.4V22H22v-9.3z" fill="#FFB900" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 