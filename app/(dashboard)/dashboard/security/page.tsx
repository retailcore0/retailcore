'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Lock, Trash2, Loader2 } from 'lucide-react';

export default function SecurityPage() {
  const [passwordState, setPasswordState] = useState({
    error: '',
    success: '',
  });
  const [deleteState, setDeleteState] = useState({
    error: '',
    success: '',
  });
  const [isPasswordPending, setIsPasswordPending] = useState(false);
  const [isDeletePending, setIsDeletePending] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [deleteForm, setDeleteForm] = useState({
    password: '',
  });

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDeleteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDeleteForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setIsPasswordPending(true);
    setPasswordState({ error: '', success: '' });

    // Simular atraso de processamento
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simulação de validação
    if (!passwordForm.currentPassword) {
      setPasswordState({ error: 'Current password is required', success: '' });
      setIsPasswordPending(false);
      return;
    }

    if (passwordForm.newPassword.length < 8) {
      setPasswordState({
        error: 'New password must be at least 8 characters',
        success: '',
      });
      setIsPasswordPending(false);
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordState({
        error: 'New passwords do not match',
        success: '',
      });
      setIsPasswordPending(false);
      return;
    }

    // Simulação de sucesso
    setPasswordState({ error: '', success: 'Password updated successfully' });
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
    setIsPasswordPending(false);
  };

  const handleDeleteSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setIsDeletePending(true);
    setDeleteState({ error: '', success: '' });

    // Simular atraso de processamento
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simulação de validação
    if (!deleteForm.password) {
      setDeleteState({ error: 'Password is required to delete account', success: '' });
      setIsDeletePending(false);
      return;
    }

    if (deleteForm.password !== 'deleteconfirm') {
      setDeleteState({
        error: 'Incorrect password. For this demo, use "deleteconfirm"',
        success: '',
      });
      setIsDeletePending(false);
      return;
    }

    // Simulação de sucesso
    setDeleteState({ error: '', success: 'Account deleted successfully. Redirecting...' });
    setIsDeletePending(false);

    // Simular redirecionamento
    setTimeout(() => {
      alert('In a real app, you would be redirected to the home page.');
    }, 2000);
  };

  return (
    <section className="flex-1 p-4 lg:p-8">
      <h1 className="text-lg lg:text-2xl font-medium bold text-gray-900 mb-6">
        Security Settings
      </h1>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Password</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handlePasswordSubmit}>
            <div>
              <Label htmlFor="current-password" className="mb-2">
                Current Password
              </Label>
              <Input
                id="current-password"
                name="currentPassword"
                type="password"
                autoComplete="current-password"
                required
                minLength={8}
                maxLength={100}
                value={passwordForm.currentPassword}
                onChange={handlePasswordChange}
              />
            </div>
            <div>
              <Label htmlFor="new-password" className="mb-2">
                New Password
              </Label>
              <Input
                id="new-password"
                name="newPassword"
                type="password"
                autoComplete="new-password"
                required
                minLength={8}
                maxLength={100}
                value={passwordForm.newPassword}
                onChange={handlePasswordChange}
              />
            </div>
            <div>
              <Label htmlFor="confirm-password" className="mb-2">
                Confirm New Password
              </Label>
              <Input
                id="confirm-password"
                name="confirmPassword"
                type="password"
                required
                minLength={8}
                maxLength={100}
                value={passwordForm.confirmPassword}
                onChange={handlePasswordChange}
              />
            </div>
            {passwordState.error && (
              <p className="text-red-500 text-sm">{passwordState.error}</p>
            )}
            {passwordState.success && (
              <p className="text-green-500 text-sm">{passwordState.success}</p>
            )}
            <Button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white"
              disabled={isPasswordPending}
            >
              {isPasswordPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <Lock className="mr-2 h-4 w-4" />
                  Update Password
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Delete Account</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500 mb-4">
            Account deletion is non-reversable. Please proceed with caution.
            <br />
            <span className="font-semibold">(For demo, use password: "deleteconfirm")</span>
          </p>
          <form onSubmit={handleDeleteSubmit} className="space-y-4">
            <div>
              <Label htmlFor="delete-password" className="mb-2">
                Confirm Password
              </Label>
              <Input
                id="delete-password"
                name="password"
                type="password"
                required
                minLength={8}
                maxLength={100}
                value={deleteForm.password}
                onChange={handleDeleteChange}
              />
            </div>
            {deleteState.error && (
              <p className="text-red-500 text-sm">{deleteState.error}</p>
            )}
            {deleteState.success && (
              <p className="text-green-500 text-sm">{deleteState.success}</p>
            )}
            <Button
              type="submit"
              variant="destructive"
              className="bg-red-600 hover:bg-red-700"
              disabled={isDeletePending}
            >
              {isDeletePending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Account
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
