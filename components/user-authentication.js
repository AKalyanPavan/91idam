"use client";

import { useState } from 'react';
import Image from 'next/image';
import googleImage from '@/images/google.svg';
import email from '@/images/email.svg';

// Login Modal Component (moved outside)
const LoginModal = ({ onClose, onNavigate }) => (
  <div className="w-full max-w-md mx-auto bg-white rounded-lg p-8 relative">
    <button 
      onClick={onClose}
      className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 text-4xl font-light cursor-pointer"
    >
      ×
    </button>
    
    <h2 className="text-2xl font-semibold text-center mb-2">Log in</h2>
    <p className="text-center text-gray-600 mb-8">
      Don&apos;t have an account yet? 
      <button 
        onClick={() => onNavigate('signup')}
        className="text-blue-600 hover:underline ml-1 cursor-pointer"
      >
        Sign up
      </button>
    </p>

    <div className="space-y-4">
      <button className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 rounded-lg hover:bg-[#e4ebff] transition-colors cursor-pointer">
        <Image src={googleImage} alt="Google" />
        Log in with Google
      </button>

      <button 
        onClick={() => onNavigate('emailLogin')}
        className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-[#144a5e] text-white rounded-lg hover:bg-[#144a5e] transition-colors cursor-pointer"
      >
        <Image src={email} alt="Email" />
        Log in with Email
      </button>
    </div>
  </div>
);

// Email Login Form Component (moved outside)
const EmailLoginModal = ({ formData, errors, onInputChange, onSubmit, onClose, onNavigate }) => (
  <div className="w-full max-w-md mx-auto bg-white rounded-lg p-8 relative">
    <button 
      onClick={onClose}
      className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 text-4xl font-light cursor-pointer"
    >
      ×
    </button>
    
    <h2 className="text-2xl font-semibold text-center mb-2">Log in</h2>
    <p className="text-center text-gray-600 mb-8">
      Don&apos;t have an account? 
      <button 
        onClick={() => onNavigate('signup')}
        className="text-blue-600 hover:underline ml-1 cursor-pointer"
      >
        Sign up
      </button>
    </p>

    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Your email
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={onInputChange}
          placeholder="email@site.com"
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <button 
            type="button"
            className="text-sm text-blue-600 hover:underline cursor-pointer"
          >
            Forget password?
          </button>
        </div>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={onInputChange}
          placeholder="8+ characters required"
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
            errors.password ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password}</p>
        )}
      </div>

      <button
        type="button"
        onClick={() => onSubmit(false)}
        className="w-full py-3 px-4 bg-[#175973] text-white rounded-lg hover:bg-[#144a5e] transition-colors font-medium cursor-pointer"
      >
        Login
      </button>
    </div>
  </div>
);

// Signup Options Modal Component (moved outside)
const SignupModal = ({ onClose, onNavigate }) => (
  <div className="w-full max-w-md mx-auto bg-white rounded-lg p-8 relative">
    <button 
      onClick={onClose}
      className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 text-4xl font-light cursor-pointer"
    >
      ×
    </button>
    
    <h2 className="text-2xl font-semibold text-center mb-2">Sign up</h2>
    <p className="text-center text-gray-600 mb-8">
      Already have an account? 
      <button 
        onClick={() => onNavigate('login')}
        className="text-blue-600 hover:underline ml-1 cursor-pointer"
      >
        Log in
      </button>
    </p>

    <div className="space-y-4">
      <button className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
        <Image src={googleImage} alt="Google" />
        Sign up with Google
      </button>

      <button 
        onClick={() => onNavigate('emailSignup')}
        className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-[#175973] text-white rounded-lg hover:bg-[#144a5e] transition-colors cursor-pointer"
      >
        <Image src={email} alt="Email" />
        Sign up with Email
      </button>
    </div>
  </div>
);

// Email Signup Form Component (moved outside)
const EmailSignupModal = ({ formData, errors, onInputChange, onSubmit, onClose, onNavigate }) => (
  <div className="w-full max-w-md mx-auto bg-white rounded-lg p-8 relative">
    <button 
      onClick={onClose}
      className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 text-4xl font-light text-center cursor-pointer"
    >
      ×
    </button>
    
    <h2 className="text-2xl font-semibold text-center mb-2">Sign up</h2>
    <p className="text-center text-gray-600 mb-8">
      Already have an account? 
      <button 
        onClick={() => onNavigate('login')}
        className="text-blue-600 hover:underline ml-1 cursor-pointer"
      >
        Log in
      </button>
    </p>

    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Your email
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={onInputChange}
          placeholder="email@site.com"
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Password
        </label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={onInputChange}
          placeholder="8+ characters required"
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
            errors.password ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Confirm password
        </label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={onInputChange}
          placeholder="8+ characters required"
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${
            errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
        )}
      </div>

      <button
        type="button"
        onClick={() => onSubmit(true)}
        className="w-full py-3 px-4 bg-[#175973] text-white rounded-lg hover:bg-[#144a5e] transition-colors font-medium cursor-pointer"
      >
        Sign up
      </button>

      <p className="text-center text-sm text-gray-600">
        By continuing you agree to our{' '}
        <button className="text-blue-600 hover:underline cursor-pointer">
          Terms and Conditions
        </button>
      </p>
    </div>
  </div>
);

// Main Auth Modal Component
export const UserAuthentication = ({ isOpen, onClose }) => {
  const [currentView, setCurrentView] = useState('login'); // 'login', 'signup', 'emailLogin', 'emailSignup'
  
  // Separate form data for each view
  const [loginFormData, setLoginFormData] = useState({
    email: '',
    password: ''
  });
  
  const [signupFormData, setSignupFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  // Separate errors for each view
  const [loginErrors, setLoginErrors] = useState({});
  const [signupErrors, setSignupErrors] = useState({});

  if (!isOpen) return null;

  // Get current form data and errors based on view
  const getCurrentFormData = () => {
    return currentView === 'emailLogin' ? loginFormData : signupFormData;
  };

  const getCurrentErrors = () => {
    return currentView === 'emailLogin' ? loginErrors : signupErrors;
  };

  const setCurrentFormData = (newData) => {
    if (currentView === 'emailLogin') {
      setLoginFormData(newData);
    } else {
      setSignupFormData(newData);
    }
  };

  const setCurrentErrors = (newErrors) => {
    if (currentView === 'emailLogin') {
      setLoginErrors(newErrors);
    } else {
      setSignupErrors(newErrors);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const currentData = getCurrentFormData();
    const currentErrs = getCurrentErrors();
    
    setCurrentFormData({
      ...currentData,
      [name]: value
    });
    
    // Clear error when user starts typing
    if (currentErrs[name]) {
      setCurrentErrors({
        ...currentErrs,
        [name]: ''
      });
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (isSignup = false) => {
    const newErrors = {};
    const formData = getCurrentFormData();

    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    }

    // Confirm password validation (only for signup)
    if (isSignup) {
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setCurrentErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (isSignup = false) => {
    if (validateForm(isSignup)) {
      // Handle form submission logic here
      const formData = getCurrentFormData();
      console.log('Form submitted:', formData);
    }
  };

  const resetAndClose = () => {
    setCurrentView('login');
    setLoginFormData({ email: '', password: '' });
    setSignupFormData({ email: '', password: '', confirmPassword: '' });
    setLoginErrors({});
    setSignupErrors({});
    onClose();
  };

  const handleNavigate = (view) => {
    setCurrentView(view);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'login':
        return <LoginModal onClose={resetAndClose} onNavigate={handleNavigate} />;
      case 'emailLogin':
        return (
          <EmailLoginModal 
            formData={getCurrentFormData()}
            errors={getCurrentErrors()}
            onInputChange={handleInputChange}
            onSubmit={handleSubmit}
            onClose={resetAndClose}
            onNavigate={handleNavigate}
          />
        );
      case 'signup':
        return <SignupModal onClose={resetAndClose} onNavigate={handleNavigate} />;
      case 'emailSignup':
        return (
          <EmailSignupModal 
            formData={getCurrentFormData()}
            errors={getCurrentErrors()}
            onInputChange={handleInputChange}
            onSubmit={handleSubmit}
            onClose={resetAndClose}
            onNavigate={handleNavigate}
          />
        );
      default:
        return <LoginModal onClose={resetAndClose} onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="fixed inset-0 bg-[#21325b80] bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-md">
        {renderCurrentView()}
      </div>
    </div>
  );
};