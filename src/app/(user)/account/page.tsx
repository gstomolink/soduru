'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { updateUserProfile, deleteUserAccount, signOut } from '@/lib/auth';
import { uploadProfilePicture } from '@/lib/storage';
import Image from 'next/image';

const provinces = [
  'Northern',
  "Eastern",
  "Southern",
  "Western",
  "Central", 
  "North Western", 
  "North Central", 
  "Sabaragamuwa", 
  "Uva"
];

export default function AccountPage() {
  const { user, userProfile, loading: authLoading, refreshProfile } = useAuth();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    username: '',
    province: '',
    city: '',
    age: '',
  });
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    if (!authLoading) {
      if (userProfile) {
        setFormData({
          username: userProfile.username,
          province: userProfile.province,
          city: userProfile.city,
          age: userProfile.age.toString(),
        });
        setPreview(userProfile.profilePicture);
      }
    }
  }, [user, userProfile, authLoading, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfilePicture(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user || !userProfile) return;

    try {
      setLoading(true);
      let profilePictureUrl = userProfile.profilePicture;
      
      if (profilePicture) {
        profilePictureUrl = await uploadProfilePicture(profilePicture, user.uid);
      }

      await updateUserProfile(user.uid, {
        username: formData.username,
        province: formData.province,
        city: formData.city,
        age: parseInt(formData.age),
        profilePicture: profilePictureUrl,
      });

      await refreshProfile();
      alert('Profile updated');
    } catch (error) {
      console.error('Update error:', error);
      alert('Update failed');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!user) return;

    if (!window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      return;
    }

    try {
      setLoading(true);
      await deleteUserAccount(user.uid);
      router.push('/login');
    } catch (error) {
      console.error('Delete error:', error);
      alert('Account deletion failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push('/login');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

 

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="max-w-md mx-auto">
        <div className="px-4 py-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">My Page</h1>
        </div>

        <div className="px-4 py-6">
          <form onSubmit={handleUpdate} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 text-center">
                Profile Picture
              </label>
              <div className="flex flex-col items-center">
                {preview ? (
                  <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4 border-2 border-gray-300">
                    <Image
                      src={preview}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                    <span className="text-gray-400">No picture</span>
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                >
                  Change Picture
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Province
              </label>
              <select
                name="province"
                value={formData.province}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              >
                  <option value="">Select</option>
                {provinces.map(province => (
                  <option key={province} value={province}>{province}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Age
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                min="18"
                max="100"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-500 text-white py-4 rounded-lg font-medium hover:bg-red-600 transition-colors disabled:opacity-50"
            >
              {loading ? 'Updating...' : 'Update Profile'}
            </button>
          </form>

          <div className="mt-8 space-y-4">
            <button
              onClick={handleSignOut}
              className="w-full bg-gray-100 text-gray-700 py-4 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              Logout
            </button>

            <button
              onClick={handleDeleteAccount}
              disabled={loading}
              className="w-full bg-red-600 text-white py-4 rounded-lg font-medium hover:bg-red-700 transition-colors disabled:opacity-50"
            >
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

