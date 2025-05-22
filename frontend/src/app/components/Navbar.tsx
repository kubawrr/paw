'use client';

import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const isAuthenticated = !!currentUser;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="font-bold text-xl">
          <Link href="/" className="hover:text-blue-300">
            ManageMe
          </Link>
        </div>
        
        <div className="hidden md:flex space-x-4">
          {isAuthenticated ? (
            <>
              <Link href="/historyjki" className={`hover:text-blue-300 ${pathname === '/historyjki' ? 'text-blue-300' : ''}`}>
                Historyjki
              </Link>
              <Link href="/projekty" className={`hover:text-blue-300 ${pathname === '/projekty' ? 'text-blue-300' : ''}`}>
                Projekty
              </Link>
              <Link href="/zadania" className={`hover:text-blue-300 ${pathname === '/zadania' ? 'text-blue-300' : ''}`}>
                Zadania
              </Link>
              <div className="relative group">
                <button className="hover:text-blue-300 flex items-center">
                  {currentUser?.name || currentUser?.login}
                  <svg 
                    className="w-4 h-4 ml-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <button 
                    onClick={handleLogout} 
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Wyloguj
                  </button>
                </div>
              </div>
            </>
          ) : (
            <Link href="/login" className={`hover:text-blue-300 ${pathname === '/login' ? 'text-blue-300' : ''}`}>
              Logowanie
            </Link>
          )}
        </div>
        
        {/* Mobile menu button */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="focus:outline-none"
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-2 pt-2 border-t border-gray-700">
          {isAuthenticated ? (
            <>
              <Link 
                href="/historyjki" 
                className={`block py-2 hover:text-blue-300 ${pathname === '/historyjki' ? 'text-blue-300' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Historyjki
              </Link>
              <Link 
                href="/projekty" 
                className={`block py-2 hover:text-blue-300 ${pathname === '/projekty' ? 'text-blue-300' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Projekty
              </Link>
              <Link 
                href="/zadania" 
                className={`block py-2 hover:text-blue-300 ${pathname === '/zadania' ? 'text-blue-300' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Zadania
              </Link>
              <Link 
                href="/profile" 
                className={`block py-2 hover:text-blue-300 ${pathname === '/profile' ? 'text-blue-300' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Profil
              </Link>
              <button 
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }} 
                className="block w-full text-left py-2 hover:text-blue-300"
              >
                Wyloguj
              </button>
            </>
          ) : (
            <Link 
              href="/login" 
              className={`block py-2 hover:text-blue-300 ${pathname === '/login' ? 'text-blue-300' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Logowanie
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}