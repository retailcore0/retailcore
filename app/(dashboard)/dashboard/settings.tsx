'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { InviteTeamMember } from './invite-team';

// Dados de equipe simulados
const mockTeamData = {
  id: '1',
  name: 'Demo Team',
  planName: 'Pro',
  subscriptionStatus: 'active',
  teamMembers: [
    {
      id: '1',
      role: 'owner',
      user: {
        id: '1',
        name: 'Demo User',
        email: 'demo@example.com',
      }
    },
    {
      id: '2',
      role: 'member',
      user: {
        id: '2',
        name: 'John Doe',
        email: 'john@example.com',
      }
    },
    {
      id: '3',
      role: 'member',
      user: {
        id: '3',
        name: 'Jane Smith',
        email: 'jane@example.com',
      }
    }
  ]
};

export function Settings() {
  const [teamData, setTeamData] = useState(mockTeamData);
  const [isRemovePending, setIsRemovePending] = useState<string | null>(null);
  const [removeState, setRemoveState] = useState({
    error: '',
    success: '',
  });

  const getUserDisplayName = (user: { id: string; name?: string; email?: string }) => {
    return user.name || user.email || 'Unknown User';
  };

  const handleManageSubscription = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('In a real app, this would redirect to your payment provider\'s customer portal.');
  };

  const handleRemoveMember = async (e: React.FormEvent<HTMLFormElement>, memberId: string) => {
    e.preventDefault();
    setIsRemovePending(memberId);
    setRemoveState({ error: '', success: '' });

    // Simulando atraso no processamento
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Lógica para remover membro
    try {
      // Simulando sucesso
      setTeamData(prev => ({
        ...prev,
        teamMembers: prev.teamMembers.filter(member => member.id !== memberId)
      }));
      setRemoveState({ error: '', success: 'Member removed successfully' });
    } catch (error) {
      setRemoveState({ error: 'Failed to remove team member', success: '' });
    }

    setIsRemovePending(null);
  };

  return (
    <section className="flex-1 p-4 lg:p-8">
      <h1 className="text-lg lg:text-2xl font-medium mb-6">Team Settings</h1>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Team Subscription</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div className="mb-4 sm:mb-0">
                <p className="font-medium">
                  Current Plan: {teamData.planName || 'Free'}
                </p>
                <p className="text-sm text-muted-foreground">
                  {teamData.subscriptionStatus === 'active'
                    ? 'Billed monthly'
                    : teamData.subscriptionStatus === 'trialing'
                      ? 'Trial period'
                      : 'No active subscription'}
                </p>
              </div>
              <form onSubmit={handleManageSubscription}>
                <Button type="submit" variant="outline">
                  Manage Subscription
                </Button>
              </form>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {teamData.teamMembers.map((member, index) => (
              <li key={member.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage
                      src={`/placeholder.svg?height=32&width=32`}
                      alt={getUserDisplayName(member.user)}
                    />
                    <AvatarFallback>
                      {getUserDisplayName(member.user)
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">
                      {getUserDisplayName(member.user)}
                    </p>
                    <p className="text-sm text-muted-foreground capitalize">
                      {member.role}
                    </p>
                  </div>
                </div>
                {index > 0 && (
                  <form onSubmit={(e) => handleRemoveMember(e, member.id)}>
                    <input type="hidden" name="memberId" value={member.id} />
                    <Button
                      type="submit"
                      variant="outline"
                      size="sm"
                      disabled={isRemovePending === member.id}
                    >
                      {isRemovePending === member.id ? 'Removing...' : 'Remove'}
                    </Button>
                  </form>
                )}
              </li>
            ))}
          </ul>
          {removeState.error && (
            <p className="text-red-500 mt-4">{removeState.error}</p>
          )}
          {removeState.success && (
            <p className="text-green-500 mt-4">{removeState.success}</p>
          )}
        </CardContent>
      </Card>
      <InviteTeamMember />
    </section>
  );
}
