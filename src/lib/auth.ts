import { 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut as firebaseSignOut,
  User 
} from 'firebase/auth';
import { auth } from './firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from './firebase';

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error('Error signing in with Google:', error);
    throw error;
  }
};

export const signOut = async () => {
  try { 
    await firebaseSignOut(auth);
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

export interface UserProfile {
  uid: string;
  email: string;
  username: string;
  province: string;
  city: string;
  age: number;
  profilePicture: string;
  createdAt: any;
  updatedAt: any;
}

export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      return userDoc.data() as UserProfile;
    }
    return null;
  } catch (error) {
    console.error('Error getting user profile:', error);
    return null;
  }
};

export const createUserProfile = async (user: User, profileData: {
  username: string;
  province: string;
  city: string;
  age: number;
  profilePicture: string;
}) => {
  try {
    const userProfile: UserProfile = {
      uid: user.uid,
      email: user.email || '',
      username: profileData.username,
      province: profileData.province,
      city: profileData.city,
      age: profileData.age,
      profilePicture: profileData.profilePicture,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    await setDoc(doc(db, 'users', user.uid), userProfile);
    return userProfile;
  } catch (error) {
    console.error('Error creating user profile:', error);
    throw error;
  }
};

export const updateUserProfile = async (uid: string, updates: Partial<UserProfile>) => {
  try {
    await setDoc(
      doc(db, 'users', uid),
      { ...updates, updatedAt: new Date() },
      { merge: true }
    );
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

export const deleteUserAccount = async (uid: string) => {
  try {
     await setDoc(doc(db, 'users', uid), {}, { merge: false });
     await signOut();
  } catch (error) {
    console.error('Error deleting user account:', error);
    throw error;
  }
};

