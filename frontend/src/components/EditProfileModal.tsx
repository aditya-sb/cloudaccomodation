import React, { useState } from 'react';
import { Loader2, X } from 'lucide-react';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userData: any;
  onSave: (data: any) => Promise<void>;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({ isOpen, onClose, userData, onSave }) => {
  const [formData, setFormData] = useState({
    firstname: userData.firstname || '',
    lastname: userData.lastname || '',
    phone_no: userData.phone_no || '',
    username: userData.username || '',
    email: userData.email || '',
    country_code: userData.country_code || '',
    country_name: userData.country_name || ''
  });
  const [isSaving, setIsSaving] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error('Error saving profile:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md relative overflow-hidden">
        {/* Header with gradient accent */}
        <div className="h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
        
        <div className="p-5">
          <button
            onClick={onClose}
            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            aria-label="Close"
          >
            <X size={18} />
          </button>
          
          <h2 className="text-lg font-medium mb-4 text-gray-800 dark:text-white">Edit Profile</h2>
          
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500 dark:text-gray-400">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full p-2 text-sm border-b border-gray-200 dark:border-gray-700 bg-transparent focus:border-blue-500 focus:outline-none transition-colors dark:text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-500 dark:text-gray-400">First Name</label>
                <input
                  type="text"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                  className="w-full p-2 text-sm border-b border-gray-200 dark:border-gray-700 bg-transparent focus:border-blue-500 focus:outline-none transition-colors dark:text-white"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-500 dark:text-gray-400">Last Name</label>
                <input
                  type="text"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  className="w-full p-2 text-sm border-b border-gray-200 dark:border-gray-700 bg-transparent focus:border-blue-500 focus:outline-none transition-colors dark:text-white"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500 dark:text-gray-400">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 text-sm border-b border-gray-200 dark:border-gray-700 bg-transparent text-gray-400 cursor-not-allowed"
                disabled={true}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-500 dark:text-gray-400">Country Code</label>
                <input
                  type="text"
                  name="country_code"
                  value={formData.country_code}
                  onChange={handleChange}
                  className="w-full p-2 text-sm border-b border-gray-200 dark:border-gray-700 bg-transparent focus:border-blue-500 focus:outline-none transition-colors dark:text-white"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-500 dark:text-gray-400">Phone Number</label>
                <input
                  type="tel"
                  name="phone_no"
                  value={formData.phone_no}
                  onChange={handleChange}
                  className="w-full p-2 text-sm border-b border-gray-200 dark:border-gray-700 bg-transparent focus:border-blue-500 focus:outline-none transition-colors dark:text-white"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-500 dark:text-gray-400">Country</label>
              <input
                type="text"
                name="country_name"
                value={formData.country_name}
                onChange={handleChange}
                className="w-full p-2 text-sm border-b border-gray-200 dark:border-gray-700 bg-transparent focus:border-blue-500 focus:outline-none transition-colors dark:text-white"
              />
            </div>

            <div className="pt-3 flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2 px-4 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 text-sm font-medium rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="flex-1 py-2 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-medium rounded hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center justify-center"
              >
                {isSaving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  'Save'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;