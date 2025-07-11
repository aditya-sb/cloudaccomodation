import React, { useState } from 'react';
import { X, ChevronDown } from 'lucide-react';
import { useCreateAgentRequestMutation } from '../redux/slices/apiSlice';
import { toast } from 'react-hot-toast';

const GetAgent = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    nationality: '',
    code: '',
    mobileNumber: '',
    moveInDate: '',
    universityName: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const [createAgentRequest, { isLoading, isSuccess, error }] = useCreateAgentRequestMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check for required fields first
    const requiredFields = [
      { field: 'fullName', label: 'Full Name' },
      { field: 'email', label: 'Email Address' },
      { field: 'code', label: 'Country Code' },
      { field: 'mobileNumber', label: 'Mobile Number' },
      { field: 'moveInDate', label: 'Move In Date' },
      { field: 'nationality', label: 'Nationality' },
      { field: 'universityName', label: 'University Name' }
    ];

    // Find first empty required field
    const emptyField = requiredFields.find(({ field }) => !formData[field as keyof typeof formData]);
    
    if (emptyField) {
      toast.error(`${emptyField.label} is required`);
      return;
    }
    
    try {
      await createAgentRequest({
        fullName: formData.fullName,
        email: formData.email,
        code: formData.code,
        mobileNumber: formData.mobileNumber,
        moveInDate: formData.moveInDate,
        universityName: formData.universityName,
        nationality: formData.nationality
      }).unwrap();
      
      // Reset form on success
      setFormData({
        fullName: '',
        email: '',
        nationality: '',
        code: '',
        mobileNumber: '',
        moveInDate: '',
        universityName: ''
      });
      
      toast.success('Your request has been submitted successfully! We will contact you soon.');
    } catch (err: any) {
      console.error('Failed to submit request:', err);
      
      if (err?.data?.errors && err.data.errors.length > 0) {
        // Show only the first validation error
        toast.error(err.data.errors[0].msg);
      } else {
        toast.error(err?.data?.message || 'Failed to submit request. Please try again.');
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="w-100%">

        <div className="flex justify-between items-center p-6 border-b">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Get an agent</h2>
            <p className="text-gray-600 mt-2">
              Fill out our get an agent form and we will assign you a personal housing expert who will help you find verified properties, guide you through the booking process, and answer your questions stress free and fast.
            </p>
          </div>
          {/* <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-gray-600 ml-4"
          >
            <X size={24} />
          </button> */}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                placeholder="Enter Full Name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mobile number <span className="text-red-500">*</span>
              </label>
              <div className="flex">
                <div className="relative">
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.code}
                      onChange={(e) => handleInputChange('code', e.target.value)}
                      placeholder="+1"
                      className="w-20 pl-3 pr-8 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <div className="absolute right-0 top-0 h-full flex flex-col items-center justify-center pr-1">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          const current = formData.code;
                          const num = current ? parseInt(current.replace(/\D/g, '')) || 0 : 0;
                          handleInputChange('code', `+${num + 1}`);
                        }}
                        className="h-1/2 flex items-center justify-center w-5 text-gray-500 hover:text-gray-700 focus:outline-none"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          const current = formData.code;
                          const num = current ? parseInt(current.replace(/\D/g, '')) || 1 : 1;
                          if (num > 1) {
                            handleInputChange('code', `+${num - 1}`);
                          }
                        }}
                        className="h-1/2 flex items-center justify-center w-5 text-gray-500 hover:text-gray-700 focus:outline-none"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <input
                  type="tel"
                  value={formData.mobileNumber}
                  onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
                  placeholder="Enter Mobile Number"
                  className="flex-1 px-3 py-2 border ml-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={formData.email}
                placeholder="Enter Email Address"
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Move In Date */}
            <div>
              <div className="flex flex-col">
                <label htmlFor="moveInDate" className="mb-2 text-sm font-medium text-gray-700">Move In Date</label>
                <input
                  id="moveInDate"
                  name="moveInDate"
                  type="date"
                  value={formData.moveInDate}
                  onChange={(e) => handleInputChange('moveInDate', e.target.value)}
                  className="p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            {/* Nationality */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nationality <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  value={formData.nationality}
                  onChange={(e) => handleInputChange('nationality', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                >
                  <option value="">Select</option>
                  <option value="US">United States</option>
                  <option value="UK">United Kingdom</option>
                  <option value="IN">India</option>
                  <option value="CA">Canada</option>
                  <option value="AU">Australia</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              </div>
            </div>

            {/* University Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                University Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.universityName}
                onChange={(e) => handleInputChange('universityName', e.target.value)}
                placeholder="Enter the university name."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Submitting...' : 'Submit Request'}
            </button>
          </div>
        </form>
      </div>
  );
};

export default GetAgent;