import React, { useState } from 'react';
import { Eye, EyeOff, Edit2 } from 'lucide-react';

const ChangePasswordSection = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [passwordData, setPasswordData] = useState({
    current: 'myCurrentPassword123!',
    new: '',
    confirm: ''
  });
  
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const [formData, setFormData] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSave = () => {
    // Here you would typically validate and save the password
    if (formData.new === formData.confirm) {
      setPasswordData(prev => ({ ...prev, current: formData.new }));
      setFormData({ current: '', new: '', confirm: '' });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setFormData({ current: '', new: '', confirm: '' });
    setShowPassword({ current: false, new: false, confirm: false });
    setIsEditing(false);
  };

  // Password requirements validation
  const validatePassword = (password) => {
    return {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      special: /[0-9\s\W]/.test(password)
    };
  };

  const requirements = validatePassword(formData.new);

  const RequirementItem = ({ met, children }) => (
    <li className={`flex items-center gap-2 ${met ? 'text-green-600' : 'text-gray-500'}`}>
      <span className={`w-2 h-2 rounded-full ${met ? 'bg-green-600' : 'bg-gray-300'}`}></span>
      {children}
    </li>
  );

  const PasswordInput = ({ label, field, placeholder, value, onChange }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <input
          type={showPassword[field] ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(field, e.target.value)}
          className="w-full px-3 py-3 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#175973] focus:border-transparent"
          placeholder={placeholder}
        />
        <button
          type="button"
          onClick={() => togglePasswordVisibility(field)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
        >
          {showPassword[field] ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Password</h1>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-4 py-2 text-[#175973] hover:text-[#144a5e] transition-colors cursor-pointer"
          >
            <Edit2 size={16} />
            Change Password
          </button>
        )}
      </div>

      <div className="bg-white rounded-lg p-6">
        {!isEditing ? (
          // View Mode - Show current password with dots
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current password
              </label>
              <div className="relative">
                <input
                  type={showPassword.current ? 'text' : 'password'}
                  value={passwordData.current}
                  readOnly
                  className="w-full px-3 py-3 pr-10 border border-gray-300 rounded-md bg-gray-100 text-gray-700"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('current')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
                >
                  {showPassword.current ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
          </div>
        ) : (
          // Edit Mode - Password change form
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <PasswordInput
                label="Current password"
                field="current"
                placeholder="Enter current password"
                value={formData.current}
                onChange={handleInputChange}
              />

              <PasswordInput
                label="New password"
                field="new"
                placeholder="Enter new password"
                value={formData.new}
                onChange={handleInputChange}
              />

              <PasswordInput
                label="Confirm new password"
                field="confirm"
                placeholder="Confirm your new password"
                value={formData.confirm}
                onChange={handleInputChange}
              />
            </div>

            {/* Password Requirements */}
            <div className="mt-6 p-4 bg-white rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Password requirements:
              </h3>
              <p className="text-gray-600 mb-4">
                Ensure that these requirements are met:
              </p>
              <ul className="space-y-2">
                <RequirementItem met={requirements.length}>
                  Minimum 8 characters long - the more, the better
                </RequirementItem>
                <RequirementItem met={requirements.lowercase}>
                  At least one lowercase character
                </RequirementItem>
                <RequirementItem met={requirements.uppercase}>
                  At least one uppercase character
                </RequirementItem>
                <RequirementItem met={requirements.special}>
                  At least one number, symbol, or whitespace character
                </RequirementItem>
              </ul>
            </div>

            {/* Password Mismatch Warning */}
            {formData.confirm && formData.new !== formData.confirm && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-600 text-sm">
                  Passwords do not match. Please try again.
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={handleCancel}
                className="px-6 py-2 text-gray-600 font-medium hover:text-gray-700 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={
                  !formData.current || 
                  !formData.new || 
                  !formData.confirm || 
                  formData.new !== formData.confirm ||
                  !Object.values(requirements).every(Boolean)
                }
                className="px-6 py-2 bg-[#175973] text-white font-medium rounded-md hover:bg-[#144a5e] transition-colors cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Update Password
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChangePasswordSection;