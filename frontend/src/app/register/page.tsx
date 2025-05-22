'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LoginForm from '../components/LoginForm';
import { useAuth } from '../context/AuthContext';
import RegisterForm from '../components/RegisterForm';

export default function RegisterPage() {
  const { currentUser, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && currentUser) {
      router.push('/historyjki');
    }
  }, [currentUser, loading, router]);

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
      <RegisterForm />
    </div>
  );
}