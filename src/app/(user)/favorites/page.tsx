'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
 
export default function FavoritesPage() {
  const { user, userProfile, loading: authLoading } = useAuth();
  const router = useRouter();
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

 


  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="max-w-md mx-auto">
        <div className="px-4 py-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">Favorites</h1>
        </div>

        <div className="px-4 py-4">
          {favorites.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No favorites yet</p>
              <p className="text-gray-400 text-sm mt-2">Add a user to your favorites</p>
            </div>
          ) : (
            <div className="space-y-4">
              {favorites.map((favorite) => (
                <div
                  key={favorite.id}
                  className="p-4 border border-gray-200 rounded-lg"
                >
                  <p className="text-gray-900">{favorite.username}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

