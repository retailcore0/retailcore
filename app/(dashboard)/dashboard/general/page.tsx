'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';

// Simulação de usuário logado
const mockUser = {
  id: '1',
  name: 'Demo User',
  email: 'demo@example.com',
};

export default function GeneralPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [state, setState] = useState({
    error: '',
    success: '',
  });
  const [formData, setFormData] = useState({
    name: mockUser.name,
    email: mockUser.email,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setIsLoading(true);
    setState({ error: '', success: '' });

    // Simular atraso de processamento
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Simulação de validação
    if (!formData.name || !formData.email) {
      setState({ error: 'Name and email are required', success: '' });
      setIsLoading(false);
      return;
    }

    if (!formData.email.includes('@')) {
      setState({ error: 'Please enter a valid email address', success: '' });
      setIsLoading(false);
      return;
    }

    // Simulação de sucesso
    setState({ error: '', success: 'Account information updated successfully' });
    setIsLoading(false);
  };

  return (
    <section className="flex-1 p-4 lg:p-8">
      <h1 className="text-lg lg:text-2xl font-medium text-gray-900 mb-6">
        General Settings
      </h1>

      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="name" className="mb-2">
                Name
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="email" className="mb-2">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            {state.error && (
              <p className="text-red-500 text-sm">{state.error}</p>
            )}
            {state.success && (
              <p className="text-green-500 text-sm">{state.success}</p>
            )}
            <Button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
