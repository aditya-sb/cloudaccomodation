"use client";
import React, { useState, useEffect, useMemo } from 'react';
import { FaSignOutAlt, FaUser, FaCamera } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import { useGetUserDetailsQuery, useUpdateUserMutation } from '../redux/slices/apiSlice';
import { setAuthToken } from '../../utils/auth-util';
import { signOut as nextAuthSignOut } from 'next-auth/react';
import { Loader2 } from 'lucide-react';
import { createAvatar } from '@dicebear/core';
import { bottts } from '@dicebear/collection';

const Profile: React.FC = () => {
  const [message, setMessage] = useState('');
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const router = useRouter();
  
  const { data, error, isLoading } = useGetUserDetailsQuery();
  const [updateUser] = useUpdateUserMutation();

  // Generate avatar based on user's email
  const avatarUrl = useMemo(() => {
    if (data?.user?.profilePicture) return undefined;
    const avatar = createAvatar(bottts, {
      seed: data?.user?.email || 'default',
      size: 128,
    });
    return avatar.toDataUri();
  }, [data?.user?.email, data?.user?.profilePicture]);

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    phone_no: '',
    username: '',
    email: '',
    country_code: '',
    country_name: ''
  });

  useEffect(() => {
    if (data?.user) {
      setFormData({
        firstname: data.user.firstname || '',
        lastname: data.user.lastname || '',
        phone_no: data.user.phone_no || '',
        username: data.user.username || '',
        email: data.user.email || '',
        country_code: data.user.country_code || '',
        country_name: data.user.country_name || ''
      });
    }
  }, [data?.user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setIsDirty(true);
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file type
    if (!file.type.startsWith('image/')) {
      setMessage('Please upload an image file (JPEG, PNG, etc.)');
      return;
    }

    // Check file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      setMessage('Image size should be less than 5MB');
      return;
    }

    setSelectedImage(file);
    setIsDirty(true);
    setMessage(''); // Clear any previous error messages
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('Saving changes...');
    
    try {
      const formDataPayload = new FormData();
      
      // Add all form fields to FormData
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          formDataPayload.append(key, value);
        }
      });

      // Add the image file if selected
      if (selectedImage) {
        formDataPayload.append('profilePicture', selectedImage);
      }

      // Create the payload with FormData
      const payload = new FormData();
      payload.append('userId', data?.user?._id || '');
      
      // Append all form data
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          payload.append(key, value);
        }
      });
      
      // Append the file
      if (selectedImage) {
        payload.append('profilePicture', selectedImage);
      }

      const result = await updateUser(payload).unwrap();

      if (result.user) {
        setMessage('Profile updated successfully');
        setIsDirty(false);
        // Clear the selected image state after successful upload
        setSelectedImage(null);
        
        // Auto-clear success message after 3 seconds
        setTimeout(() => {
          setMessage('');
        }, 3000);
      } else {
        setMessage(result.message || 'Error updating profile');
      }
    } catch (error: any) {
      console.error('Update failed', error);
      setMessage(
        error?.data?.message || 
        error?.message || 
        'An error occurred while updating your profile. Please try again.'
      );
    }
  };

  // Helper function to convert File to base64 with proper error handling
  const convertImageToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          reject(new Error('Failed to read file as data URL'));
        }
      };
      
      reader.onerror = () => {
        reject(new Error('Error reading file'));
      };
      
      try {
        reader.readAsDataURL(file);
      } catch (error) {
        reject(error);
      }
    });
  };

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      setMessage("Logging out...");

      // Sign out from NextAuth
      await nextAuthSignOut({
        callbackUrl: '/',
        redirect: false
      });

      // Clear any local auth tokens
      setAuthToken(null);

      setMessage("You have successfully logged out.");

      // Redirect to home after a short delay
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);
    } catch (error) {
      console.error("Logout failed", error);
      setMessage("Error logging out.");
      setIsLoggingOut(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
        <p>Loading profile information...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8 space-y-4">
        <div className="text-red-500 font-semibold">
          Error loading profile information
        </div>
        <button
          onClick={() => router.push('/auth')}
          className="px-4 py-2 bg-primary text-white rounded-md"
        >
          Return to Login
        </button>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto px-6 py-8 space-y-6 rounded-lg shadow-lg" style={{ backgroundColor: "var(--card)", color: "var(--copy-primary)" }}>
      <div className="flex flex-col items-center space-y-4">
        <div className="relative group">
          <div
            onClick={handleImageClick}
            className="rounded-full w-24 h-24 flex items-center justify-center shadow-lg cursor-pointer relative overflow-hidden group-hover:opacity-90"
            style={{ backgroundColor: "var(--grape)" }}
          >
            {data?.user?.profilePicture ? (
              <img src={data.user.profilePicture} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <img 
                src={avatarUrl} 
                alt="Generated Avatar" 
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <FaCamera className="text-white text-xl" />
            </div>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: "First Name", name: "firstname" },
            { label: "Last Name", name: "lastname" },
            { label: "Username", name: "username" },
            { label: "Email", name: "email", disabled: true },
            { label: "Country Code", name: "country_code" },
            { label: "Phone Number", name: "phone_no" }
          ].map((field) => (
            <div key={field.name} className="space-y-2">
              <label className="block text-sm font-medium">{field.label}</label>
              <input
                type={field.name === "email" ? "email" : "text"}
                name={field.name}
                value={formData[field.name as keyof typeof formData]}
                onChange={handleChange}
                disabled={field.disabled}
                className={`w-full p-2 rounded border bg-transparent transition-colors
                  ${field.disabled ? 'opacity-60 cursor-not-allowed' : 'hover:border-primary focus:border-primary cursor-text'}`}
              />
            </div>
          ))}
        </div>

        {message && (
          <div className="text-center text-sm italic" style={{ color: message.includes('Error') ? 'var(--error-text)' : 'var(--success-text)' }}>
            {message}
          </div>
        )}

        {isDirty && (
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 w-full py-2 bg-primary text-white bg-blue-600 rounded hover:opacity-90 transition-opacity"
            >
              Save Changes
            </button>
          </div>
        )}
      </form>

      <div className="border-t" style={{ borderColor: "var(--border)" }}></div>

      <button
        onClick={handleLogout}
        disabled={isLoggingOut}
        className="w-full flex items-center justify-center py-2 rounded-lg font-semibold transition hover:opacity-75"
        style={{ backgroundColor: "var(--cta-active)", color: "var(--cta-text)" }}
      >
        {isLoggingOut ? (
          <Loader2 className="h-5 w-5 animate-spin mr-2" />
        ) : (
          <FaSignOutAlt className="mr-2" />
        )}
        {isLoggingOut ? 'Logging out...' : 'Log Out'}
      </button>
    </div>
  );
};

export default Profile;
