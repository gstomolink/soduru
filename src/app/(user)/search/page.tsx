'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { UserProfile } from '@/lib/auth';
import Image from 'next/image';

export default function SearchPage() {
  const { user, userProfile, loading: authLoading } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);



  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="max-w-md mx-auto">
        <div className="sticky top-0 bg-white z-10 border-b border-gray-200 px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <button className="bg-red-500 text-white px-6 py-2 rounded-lg text-sm font-medium">
              Search
            </button>
            <button className="border border-red-500 text-red-500 px-6 py-2 rounded-lg text-sm font-medium">
              For You
            </button>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Set search criteria"
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2">🔍</span>
            </div>
            <button className="p-2 border border-gray-300 rounded-lg">
              <span>⚙️</span>
            </button>
          </div>
        </div>

        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="text-red-500">✓</span>
              <span className="text-sm text-gray-700">Today's pickup update</span>
            </div>
            <span className="text-sm text-red-500">Like! Free</span>
            <span>→</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {users.map((profile) => (
              <div
                key={profile.uid}
                className="border-2 border-green-500 rounded-lg overflow-hidden bg-white"
              >
                <div className="relative aspect-[3/4]">
                  {profile.profilePicture ? (
                    <Image
                      src={profile.profilePicture}
                      alt={profile.username}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400">No picture</span>
                    </div>
                  )}
                  <div className="absolute top-2 left-2">
                    <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">
                      Today's join
                    </span>
                  </div>
                  <div className="absolute top-2 right-2">
                    <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">
                      Common point 1
                    </span>
                  </div>
                </div>
                <div className="p-3">
                  <p className="text-green-600 text-sm font-medium">Easy to match</p>
                  <p className="text-gray-800 font-semibold mt-1">{profile.username}</p>
                  <p className="text-gray-600 text-xs mt-1">{profile.age}歳 · {profile.city}</p>
                </div>
              </div>
            ))}
          </div>

          {users.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No users available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

