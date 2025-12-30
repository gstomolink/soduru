'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Image from 'next/image';

interface Message {
  id: string;
  userId: string;
  username: string;
  profilePicture: string;
  lastMessage: string;
  timestamp: any;
}

export default function MessagesPage() {
  const { user, userProfile, loading: authLoading } = useAuth();
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="max-w-md mx-auto">
        <div className="px-4 py-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
        </div>

        <div className="px-4 py-4">
          {messages.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No messages yet</p>
              <p className="text-gray-400 text-sm mt-2">Start a conversation with a matched user</p>
            </div>
          ) : (
            <div className="space-y-2">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className="flex items-center gap-4 p-4 border-b border-gray-100 hover:bg-gray-50"
                >
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    {message.profilePicture ? (
                      <Image
                        src={message.profilePicture}
                        alt={message.username}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400 text-xs">No picture</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 truncate">{message.username}</p>
                    <p className="text-sm text-gray-600 truncate">{message.lastMessage}</p>
                  </div>
                  <span className="text-xs text-gray-400">
                    {message.timestamp?.toDate?.().toLocaleDateString() || ''}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

