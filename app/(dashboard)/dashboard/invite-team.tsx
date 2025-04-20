'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { Loader2, PlusCircle } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

// Simulação de usuário atual
const mockUser = {
  id: '1',
  name: 'Demo User',
  email: 'demo@example.com',
  role: 'owner' // Pode ser 'owner' ou 'member'
};

export function InviteTeamMember() {
  const [isInvitePending, setIsInvitePending] = useState(false);
  const [inviteState, setInviteState] = useState({
    error: '',
    success: '',
  });
  const [formData, setFormData] = useState({
    email: '',
    role: 'member',
  });

  // Simulação: usuário atual é proprietário da equipe
  const isOwner = mockUser.role === 'owner';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRoleChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      role: value
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsInvitePending(true);
    setInviteState({ error: '', success: '' });

    // Simular atraso de processamento
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Simulação de validação
    if (!formData.email) {
      setInviteState({ error: 'Email is required', success: '' });
      setIsInvitePending(false);
      return;
    }

    if (!formData.email.includes('@')) {
      setInviteState({ error: 'Please enter a valid email address', success: '' });
      setIsInvitePending(false);
      return;
    }

    // Simulação de sucesso
    setInviteState({ 
      error: '', 
      success: `Invitation sent to ${formData.email} with ${formData.role} role` 
    });
    setFormData({
      email: '',
      role: 'member',
    });
    setIsInvitePending(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Invite Team Member</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email" className="mb-2">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Enter email"
              required
              disabled={!isOwner}
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <Label>Role</Label>
            <RadioGroup
              value={formData.role}
              onValueChange={handleRoleChange}
              name="role"
              className="flex space-x-4"
              disabled={!isOwner}
            >
              <div className="flex items-center space-x-2 mt-2">
                <RadioGroupItem value="member" id="member" />
                <Label htmlFor="member">Member</Label>
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <RadioGroupItem value="owner" id="owner" />
                <Label htmlFor="owner">Owner</Label>
              </div>
            </RadioGroup>
          </div>
          {inviteState.error && (
            <p className="text-red-500">{inviteState.error}</p>
          )}
          {inviteState.success && (
            <p className="text-green-500">{inviteState.success}</p>
          )}
          <Button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white"
            disabled={isInvitePending || !isOwner}
          >
            {isInvitePending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Inviting...
              </>
            ) : (
              <>
                <PlusCircle className="mr-2 h-4 w-4" />
                Invite Member
              </>
            )}
          </Button>
        </form>
      </CardContent>
      {!isOwner && (
        <CardFooter>
          <p className="text-sm text-muted-foreground">
            You must be a team owner to invite new members.
          </p>
        </CardFooter>
      )}
    </Card>
  );
}
