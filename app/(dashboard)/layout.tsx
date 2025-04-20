'use client';

import Link from 'next/link';
import { useState, Suspense, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { CircleIcon, Home, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useRouter } from 'next/navigation';
import React from 'react';

function UserMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<{ email: string; name: string | null } | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Verificar autenticação no client-side
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (isAuthenticated) {
      setUser({
        email: 'usuario@exemplo.com',
        name: 'Usuário Demo'
      });
    } else {
      router.push('/sign-in');
    }
  }, [router]);

  // Função simulada para logout
  const handleSignOut = async () => {
    // Simular uma pequena espera para parecer autêntico
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Limpar estado de autenticação
    localStorage.removeItem('isAuthenticated');
    
    // Redirecionar para a página de login
    router.push('/sign-in');
  };

  if (!user) {
    return null;
  }

  return (
    <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <DropdownMenuTrigger>
        <Avatar className="cursor-pointer size-9">
          <AvatarImage alt={user.name || ''} />
          <AvatarFallback>
            {user.email
              .split(' ')
              .map((n) => n[0])
              .join('')}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="flex flex-col gap-1">
        <DropdownMenuItem className="cursor-pointer">
          <Link href="/dashboard" className="flex w-full items-center">
            <Home className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </Link>
        </DropdownMenuItem>
        <button onClick={handleSignOut} className="flex w-full">
          <DropdownMenuItem className="w-full flex-1 cursor-pointer">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sair</span>
          </DropdownMenuItem>
        </button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <img 
            src="/logo-retail-core2.png" 
            alt="Retail Core Logo" 
            width={260} 
            height={260} 
            className="object-contain"
            style={{color: 'transparent'}}
          />
        </Link>
        <div className="flex items-center space-x-6">
          <Link
            href="/solucoes"
            className="text-base font-medium text-gray-700 hover:text-black transition-colors px-4 py-2 rounded-full hover:bg-gray-100"
          >
            Soluções
          </Link>
          <Link
            href="/contato"
            className="text-base font-medium text-gray-700 hover:text-black transition-colors px-4 py-2 rounded-full hover:bg-gray-100"
          >
            Contato
          </Link>
          <Suspense fallback={<div className="h-9" />}>
            <UserMenu />
          </Suspense>
        </div>
      </div>
    </header>
  );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-white">
      {/* Conteúdo principal */}
      <div className="flex flex-col">
        <Header />
        <div className="flex-1">
          {children}
        </div>
      </div>
    </div>
  );
}
