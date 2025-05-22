'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoginForm from '../components/LoginForm';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { currentUser, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Only redirect after auth state has been determined and if user is logged in
    if (!loading && currentUser) {
      router.push('/historyjki');
    }
  }, [currentUser, loading, router]);

  // Show loading indicator while determining auth state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">ManageMe</h1>
        <div className="text-gray-600">Sprawdzanie sesji użytkownika...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">ManageMe</h1>
      <LoginForm />
      <div className="mt-4 text-gray-600">
        <p>Nie masz konta? <a href="/register" className="text-blue-600 hover:text-blue-800">Zarejestruj się</a></p>
      </div>
    </div>
  );
}