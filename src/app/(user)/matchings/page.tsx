'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { UserProfile } from '@/lib/auth';
import Image from 'next/image';

export default function MatchingsPage() {
  const { user, userProfile, loading: authLoading } = useAuth();
  const router = useRouter();
  const [matches, setMatches] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);

 

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="max-w-md mx-auto">
        <div className="px-4 py-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">Matches</h1>
        </div>

        <div className="px-4 py-4">
          {matches.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No matches yet</p>
              <p className="text-gray-400 text-sm mt-2">Send a like to other users</p>
            </div>
          ) : (
            <div className="space-y-4">
              {matches.map((match) => (
                <div
                  key={match.uid}
                  className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg"
                >
                  <div className="relative w-16 h-16 rounded-full overflow-hidden">
                    {match.profilePicture ? (
                      <Image
                        src={match.profilePicture}
                        alt={match.username}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400 text-xs">No picture</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{match.username}</p>
                    <p className="text-sm text-gray-600">{match.age}歳 · {match.city}</p>
                  </div>
                  <button className="text-red-500">💬</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

