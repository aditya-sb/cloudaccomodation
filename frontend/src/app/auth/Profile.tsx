"use client";
import React, { useState, useEffect } from 'react';
import { FaSignOutAlt, FaUser, FaCamera } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import { useGetUserDetailsQuery, useUpdateUserMutation } from '../redux/slices/apiSlice';
import { setAuthToken } from '../../utils/auth-util';
import { signOut } from 'next-auth/react';
import { Loader2 } from 'lucide-react';

const Profile: React.FC = () => {
  const [message, setMessage] = useState('');
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const router = useRouter();

  const { data, error, isLoading } = useGetUserDetailsQuery();
  const [updateUser] = useUpdateUserMutation();

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
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
      setIsDirty(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        userId: data?.user?._id,
        ...formData,
        // Only include profilePicture if there's a selected image
        ...(selectedImage && {
          profilePicture: await convertImageToBase64(selectedImage)
        })
      };

      const result = await updateUser(payload).unwrap();

      if (result.user) {
        setMessage("Profile updated successfully");
        setIsDirty(false);
      } else {
        setMessage("Error updating profile");
      }
    } catch (error) {
      console.error("Update failed", error);
      setMessage("Error updating profile");
    }
  };

  // Add this helper function to convert File to base64
  const convertImageToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      setMessage("Logging out...");

      await signOut({ redirect: false });

      setAuthToken(null);

      setMessage("You have successfully logged out.");

      await new Promise(resolve => setTimeout(resolve, 2000));
      window.location.href = '/';
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
            className="rounded-full w-24 h-24 flex items-center justify-center shadow-md cursor-pointer relative overflow-hidden group-hover:opacity-90"
            style={{ backgroundColor: "var(--grape)" }}
          >
            {data?.user?.profilePicture ? (
              <img src={data.user.profilePicture} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <FaUser className="text-4xl text-white" />
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
