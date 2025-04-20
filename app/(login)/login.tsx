'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useActionState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { signIn, signUp } from './actions';
import { ActionState } from '@/lib/auth/middleware';
import { useEffect, useRef, Suspense } from 'react';

// Component to handle search params retrieval
function LoginForm({ mode }: { mode: 'signin' | 'signup' }) {
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect');
  const priceId = searchParams.get('priceId');
  const inviteId = searchParams.get('inviteId');
  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    mode === 'signin' ? signIn : signUp,
    { error: '' }
  );
  
  return (
    <div className="max-w-md w-full mx-auto bg-white p-8 rounded-lg shadow-sm border border-gray-100">
      <div className="flex justify-start mb-6">
        <Image
          src="/logo-retail-core2.png"
          alt="Retail Core Logo"
          width={120}
          height={120}
          className="h-auto"
          priority
        />
      </div>
      
      <h2 className="text-3xl font-bold text-gray-900 mb-2">
        {mode === 'signin' ? 'Acesse sua conta' : 'Crie sua conta'}
      </h2>
      <p className="text-gray-600 mb-8">
        {mode === 'signin' 
          ? 'Entre na plataforma Retail Core' 
          : 'Registre sua loja na Retail Core'}
      </p>

      <Button
        type="button"
        className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-full shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 mb-6"
      >
        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21.8055 10.0415H21V10H12V14H17.6515C16.827 16.3285 14.6115 18 12 18C8.6865 18 6 15.3135 6 12C6 8.6865 8.6865 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C6.4775 2 2 6.4775 2 12C2 17.5225 6.4775 22 12 22C17.5225 22 22 17.5225 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z" fill="#FFC107" />
          <path d="M3.15295 7.3455L6.43845 9.755C7.32745 7.554 9.48045 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C8.15895 2 4.82795 4.1685 3.15295 7.3455Z" fill="#FF3D00" />
          <path d="M12 22C14.583 22 16.93 21.0115 18.7045 19.404L15.6095 16.785C14.5717 17.5742 13.3037 18.001 12 18C9.39903 18 7.19053 16.3415 6.35853 14.027L3.09753 16.5395C4.75253 19.778 8.11353 22 12 22Z" fill="#4CAF50" />
          <path d="M21.8055 10.0415H21V10H12V14H17.6515C17.2571 15.1082 16.5467 16.0766 15.608 16.7855L15.6095 16.7845L18.7045 19.4035C18.4855 19.6025 22 17 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z" fill="#1976D2" />
        </svg>
        Continuar com Google
      </Button>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-gray-500">
            ou {mode === 'signin' ? 'Entre' : 'Cadastre-se'} com Email
          </span>
        </div>
      </div>

      <form className="space-y-6" action={formAction}>
        <input type="hidden" name="redirect" value={redirect || ''} />
        <input type="hidden" name="priceId" value={priceId || ''} />
        <input type="hidden" name="inviteId" value={inviteId || ''} />
        
        {mode === 'signup' && (
          <div>
            <Label
              htmlFor="storeName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Nome da Loja
            </Label>
            <div className="mt-1">
              <input
                id="storeName"
                name="storeName"
                type="text"
                required
                className="appearance-none rounded-full relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-lime-500 focus:border-lime-500 focus:z-10 sm:text-sm h-10"
                placeholder="Digite o nome da sua loja"
                style={{ display: 'block' }}
              />
            </div>
          </div>
        )}
        
        <div>
          <Label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </Label>
          <div className="mt-1">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              defaultValue={state.email}
              required
              maxLength={50}
              className="appearance-none rounded-full relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-lime-500 focus:border-lime-500 focus:z-10 sm:text-sm h-10"
              placeholder="Digite seu email"
              style={{ display: 'block' }}
            />
          </div>
        </div>

        <div>
          <Label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Senha
          </Label>
          <div className="mt-1">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete={
                mode === 'signin' ? 'current-password' : 'new-password'
              }
              defaultValue={state.password}
              required
              minLength={8}
              maxLength={100}
              className="appearance-none rounded-full relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-lime-500 focus:border-lime-500 focus:z-10 sm:text-sm h-10"
              placeholder="Digite sua senha"
              style={{ display: 'block' }}
            />
          </div>
        </div>

        {state?.error && (
          <div className="text-red-500 text-sm">
            {state.error === 'Invalid email or password. Please try again.' 
              ? 'Email ou senha inválidos. Por favor, tente novamente.' 
              : state.error === 'Failed to create user. Please try again.'
              ? 'Falha ao criar usuário. Por favor, tente novamente.'
              : state.error === 'Invalid or expired invitation.'
              ? 'Convite inválido ou expirado.'
              : state.error}
          </div>
        )}

        <div>
          <Button
            type="submit"
            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-gray-900 bg-lime-300 hover:bg-lime-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500 h-12"
            disabled={pending}
          >
            {pending ? (
              <>
                <Loader2 className="animate-spin mr-2 h-4 w-4" />
                Carregando...
              </>
            ) : mode === 'signin' ? (
              'Entrar'
            ) : (
              'Cadastrar Agora'
            )}
          </Button>
        </div>
      </form>

      <div className="mt-6 text-center">
        <span className="text-sm text-gray-600">
          {mode === 'signin'
            ? 'Novo na nossa plataforma? '
            : 'Já possui uma conta? '}
        </span>
        <Link
          href={`${mode === 'signin' ? '/sign-up' : '/sign-in'}${
            redirect ? `?redirect=${redirect}` : ''
          }${priceId ? `&priceId=${priceId}` : ''}`}
          className="text-sm font-medium text-lime-600 hover:text-lime-500"
        >
          {mode === 'signin'
            ? 'Criar uma conta'
            : 'Entrar com conta existente'}
        </Link>
      </div>
    </div>
  );
}

// Fallback for Suspense
function LoginFormFallback() {
  return (
    <div className="max-w-md w-full mx-auto bg-white p-8 rounded-lg shadow-sm border border-gray-100">
      <div className="flex justify-center mb-6">
        <Loader2 className="animate-spin h-8 w-8 text-lime-500" />
      </div>
      <p className="text-center text-gray-600">Carregando...</p>
    </div>
  );
}

export function Login({ mode = 'signin' }: { mode?: 'signin' | 'signup' }) {
  const splineContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Spline viewer script
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://unpkg.com/@splinetool/viewer@1.9.82/build/spline-viewer.js';
    document.body.appendChild(script);

    // Create and append spline-viewer element
    if (splineContainerRef.current) {
      const splineViewer = document.createElement('spline-viewer');
      splineViewer.setAttribute('url', 'https://prod.spline.design/8jGmy6FtgNFPmD7S/scene.splinecode');
      splineViewer.style.width = '100%';
      splineViewer.style.height = '100%';
      
      // Use the ref directly instead of getElementById
      splineContainerRef.current.innerHTML = '';
      splineContainerRef.current.appendChild(splineViewer);
    }

    // Cleanup function
    return () => {
      // Safely remove script only if it exists in the document
      if (script && document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="min-h-[100dvh] flex bg-white">
      {/* Formulário lado esquerdo */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-12 bg-[#F3F3F3]">
        <Suspense fallback={<LoginFormFallback />}>
          <LoginForm mode={mode} />
        </Suspense>
      </div>

      {/* Lado direito - Preview da aplicação */}
      <div className="hidden lg:block lg:w-1/2 bg-[#F3F3F3] relative overflow-hidden">
        <div className="relative h-full flex items-center justify-center p-8">
          <div id="spline-container" ref={splineContainerRef} className="w-full h-full absolute inset-0"></div>
        </div>
      </div>
    </div>
  );
}
