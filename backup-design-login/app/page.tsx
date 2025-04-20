import { redirect } from 'next/navigation';

export default function Home() {
  // Redirecionamento direto para a página de login
  redirect('/auth/login');
} 