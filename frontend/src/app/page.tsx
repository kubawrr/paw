import Link from 'next/link';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">Witaj w ManageMe</h1>
        
        <div className="max-w-2xl mx-auto mb-8">
          <p className="text-lg text-gray-600 mb-4">
            Aplikacji do zarządzania projektami.
          </p>
        </div>
      </div>
    </div>
  );
}