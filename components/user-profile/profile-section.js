import React, { useState } from 'react';
import { Edit2, Plus, X } from 'lucide-react';
import userprofile from '@/images/user-profile/user-profile.png'
import Image from 'next/image';

const ProfileSection = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: 'Natalie',
    email: 'natalie@example.com',
    username: 'natalie@example.com',
    phones: ['+1 (605)-561-89-29'],
    state: '',
    cityDistrict: '',
    profileImage: userprofile
  });

  const [formData, setFormData] = useState(profileData);

  const handleInputChange = (field, value, index = null) => {
    if (field === 'phones' && index !== null) {
      const newPhones = [...formData.phones];
      newPhones[index] = value;
      setFormData(prev => ({ ...prev, phones: newPhones }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const addPhone = () => {
    if (formData.phones.length < 2) {
      setFormData(prev => ({ ...prev, phones: [...prev.phones, ''] }));
    }
  };

  const removePhone = (index) => {
    if (formData.phones.length > 1) {
      const newPhones = formData.phones.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, phones: newPhones }));
    }
  };

  const handleSave = () => {
    setProfileData(formData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(profileData);
    setIsEditing(false);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newImageUrl = e.target.result;
        setFormData(prev => ({ ...prev, profileImage: newImageUrl }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Your info</h1>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-4 py-2 text-[#175973] hover:text-[#144a5e] transition-colors cursor-pointer"
          >
            <Edit2 size={16} />
            Edit Profile
          </button>
        )}
      </div>

      <div className="bg-white rounded-lg p-6 mb-6">
        {/* Profile Photo Section */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-4">
            Profile photo or Company Logo
          </label>
          <div className="flex items-center gap-4 flex-wrap">
            <div className="relative">
              <Image
                src={formData.profileImage}
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                width={80}
                height={80}
              />
            </div>
            {isEditing && (
              <div className="flex gap-3">
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <span className="inline-flex items-center px-4 py-2 bg-[#175973] text-white text-sm font-medium rounded-md hover:bg-[#144a5e] transition-colors cursor-pointer">
                    Upload photo
                  </span>
                </label>
                <button className="px-4 py-2 text-gray-500 text-sm font-medium hover:text-gray-700 transition-colors cursor-pointer">
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full name<span className="text-red-500">*</span>
            </label>
            {isEditing ? (
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#175973] focus:border-transparent"
                placeholder="Enter full name"
              />
            ) : (
              <p className="py-2 text-gray-900">{profileData.fullName}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email<span className="text-red-500">*</span>
            </label>
            {isEditing ? (
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#175973] focus:border-transparent"
                placeholder="Enter email address"
              />
            ) : (
              <p className="py-2 text-gray-900">{profileData.email}</p>
            )}
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username<span className="text-red-500">*</span>
            </label>
            {isEditing ? (
              <input
                type="text"
                value={formData.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#175973] focus:border-transparent"
                placeholder="Enter username"
              />
            ) : (
              <p className="py-2 text-gray-900">{profileData.username}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone<span className="text-red-500">*</span>
            </label>
            {isEditing ? (
              <div className="space-y-2">
                {formData.phones.map((phone, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => handleInputChange('phones', e.target.value, index)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#175973] focus:border-transparent"
                      placeholder="Enter phone number"
                    />
                    {formData.phones.length > 1 && (
                      <button
                        onClick={() => removePhone(index)}
                        className="p-1 text-red-500 hover:text-red-700 cursor-pointer"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                ))}
                {formData.phones.length < 2 && (
                  <button 
                    onClick={addPhone}
                    className="flex items-center gap-2 text-[#175973] hover:text-[#144a5e] text-sm font-medium cursor-pointer"
                  >
                    <Plus size={16} />
                    Add phone
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-2">
                {profileData.phones.map((phone, index) => (
                  <p key={index} className="py-2 text-gray-900">{phone}</p>
                ))}
              </div>
            )}
          </div>

          {/* State */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              State<span className="text-red-500">*</span>
            </label>
            {isEditing ? (
              <input
                type="text"
                value={formData.state}
                onChange={(e) => handleInputChange('state', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#175973] focus:border-transparent"
                placeholder="Enter state"
              />
            ) : (
              <p className="py-2 text-gray-900">{profileData.state || 'Not specified'}</p>
            )}
          </div>

          {/* City/District */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              City/District<span className="text-red-500">*</span>
            </label>
            {isEditing ? (
              <input
                type="text"
                value={formData.cityDistrict}
                onChange={(e) => handleInputChange('cityDistrict', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#175973] focus:border-transparent"
                placeholder="Enter city or district"
              />
            ) : (
              <p className="py-2 text-gray-900">{profileData.cityDistrict || 'Not specified'}</p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        {isEditing && (
          <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={handleCancel}
              className="px-6 py-2 text-gray-600 font-medium hover:text-gray-700 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-[#175973] text-white font-medium rounded-md hover:bg-[#144a5e] transition-colors cursor-pointer"
            >
              Save changes
            </button>
          </div>
        )}
      </div>

      {/* Delete Account Section */}
      <div className="pt-6 border-t border-gray-200">
        <button className="text-red-600 hover:text-red-700 text-sm font-medium transition-colors cursor-pointer">
          To Delete Your Account Click here
        </button>
      </div>
    </div>
  );
};

export default ProfileSection;