"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useGetUserDetailsQuery, useUpdateUserMutation } from '../../redux/slices/apiSlice';
import { Loader2, ArrowLeft } from 'lucide-react';

const EditProfilePage = () => {
  const router = useRouter();
  const { data, isLoading } = useGetUserDetailsQuery();
  const [updateUser] = useUpdateUserMutation();
  const [message, setMessage] = useState('');
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
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateUser({
        userId: data?.user?._id,
        ...formData
      }).unwrap();
      setMessage("Profile updated successfully");
      setTimeout(() => router.push('/auth/profile'), 1500);
    } catch (error) {
      console.error("Update failed", error);
      setMessage("Error updating profile");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center text-primary hover:opacity-80"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Profile
        </button>
      </div>

      <div className="bg-card rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium">First Name</label>
              <input
                type="text"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                className="w-full p-2 rounded border bg-transparent"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium">Last Name</label>
              <input
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                className="w-full p-2 rounded border bg-transparent"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full p-2 rounded border bg-transparent"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                disabled
                className="w-full p-2 rounded border bg-transparent opacity-60"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium">Country Code</label>
              <input
                type="text"
                name="country_code"
                value={formData.country_code}
                onChange={handleChange}
                className="w-full p-2 rounded border bg-transparent"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium">Phone Number</label>
              <input
                type="tel"
                name="phone_no"
                value={formData.phone_no}
                onChange={handleChange}
                className="w-full p-2 rounded border bg-transparent"
              />
            </div>
          </div>

          {message && (
            <div className="text-center text-sm italic" style={{ color: message.includes('Error') ? 'var(--error-text)' : 'var(--success-text)' }}>
              {message}
            </div>
          )}

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 border rounded hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded hover:opacity-90"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfilePage;
