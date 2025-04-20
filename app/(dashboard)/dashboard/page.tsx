'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar autenticação no client-side
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (!isAuthenticated) {
      router.push('/sign-in');
    } else {
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Carregando...</div>;
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="flex flex-col space-y-4">
        <h1 className="text-4xl font-bold">Dashboard</h1>
        <p className="text-gray-500">Bem-vindo à sua área administrativa na Retail Core.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Visão Geral</CardTitle>
            <CardDescription>Resumo da sua loja</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Vendas de hoje</p>
                <p className="text-2xl font-bold">R$ 1.250,00</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Pedidos</p>
                <p className="text-2xl font-bold">8</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Clientes</p>
                <p className="text-2xl font-bold">3</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Atividades Recentes</CardTitle>
            <CardDescription>Últimas interações na plataforma</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <p className="text-sm">Novo pedido realizado</p>
                <p className="text-xs text-gray-500">Há 10 min</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm">Produto adicionado</p>
                <p className="text-xs text-gray-500">Há 2 horas</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm">Promoção criada</p>
                <p className="text-xs text-gray-500">Há 1 dia</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
            <CardDescription>Acesso às funções principais</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button className="w-full">Novo Pedido</Button>
              <Button className="w-full" variant="outline">Adicionar Produto</Button>
              <Button className="w-full" variant="outline">Gerenciar Estoque</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
