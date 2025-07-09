'use client'
import React, { useState } from 'react';
import { Upload, X, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import fold1image1 from '@/images/start-selling/fold1image1.svg';
import Image from 'next/image';

const StartSellingForm = () => {
  const [formData, setFormData] = useState({
    propertyType: 'residential',
    footage: '',
    roadWidth: '',
    state: '',
    cityDistrict: '',
    locationAreaName: '',
    landmark: '',
    pincode: '',
    googleMapsUrl: '',
    plotNumber: '',
    length: '',
    breadth: '',
    ownershipType: '',
    boundaryWall: 'no',
    gatedCommunity: 'yes',
    approvalAuthority: '',
    sellingPrice: '',
    negotiable: '',
    maintenanceCharges: '',
    contactName: '',
    phoneNumber: '',
    email: '',
    whatsappNumber: '',
    propertyImages: [],
    siteLayout: null,
    virtualTour: 'yes',
    disabledFriendly: 'yes',
    otherFacilities: '',
    dtcpApproval: 'yes',
    dtcpApprovalNumber: '',
    eeseaApproval: 'yes',
    eeseaApprovalNumber: '',
    licenseDocuments: []
  });

  const [errors, setErrors] = useState({});
  const [dragActive, setDragActive] = useState({ images: false, layout: false, documents: false });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState({ show: false, type: '', message: '' });

  // Dummy API simulation
  const submitToAPI = async (data) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate random success/failure (70% success rate)
    const isSuccess = Math.random() > 0.3;
    
    if (isSuccess) {
      return {
        success: true,
        message: 'Property details submitted successfully! Our team will contact you within 24 hours.',
        propertyId: 'PROP' + Math.floor(Math.random() * 10000)
      };
    } else {
      throw new Error('Unable to submit property details. Please try again later or contact support.');
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Required field validations
    if (!formData.footage) newErrors.footage = 'Footage is required';
    if (!formData.roadWidth) newErrors.roadWidth = 'Road width is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.cityDistrict) newErrors.cityDistrict = 'City/District is required';
    if (!formData.locationAreaName) newErrors.locationAreaName = 'Location area name is required';
    if (!formData.pincode) newErrors.pincode = 'Pincode is required';
    if (!formData.plotNumber) newErrors.plotNumber = 'Plot number is required';
    if (!formData.length) newErrors.length = 'Length is required';
    if (!formData.breadth) newErrors.breadth = 'Breadth is required';
    if (!formData.ownershipType) newErrors.ownershipType = 'Ownership type is required';
    if (!formData.boundaryWall) newErrors.boundaryWall = 'Boundary wall information is required';
    if (!formData.sellingPrice) newErrors.sellingPrice = 'Selling price is required';
    if (!formData.contactName) newErrors.contactName = 'Contact name is required';
    if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone number is required';
    if (!formData.email) newErrors.email = 'Email is required';

    // Format validations
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (formData.phoneNumber && !/^\d{10}$/.test(formData.phoneNumber.replace(/\D/g, ''))) {
      newErrors.phoneNumber = 'Please enter a valid 10-digit phone number';
    }
    if (formData.pincode && !/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Please enter a valid 6-digit pincode';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleFileUpload = (field, files) => {
    const fileArray = Array.from(files);
    if (field === 'propertyImages') {
      setFormData(prev => ({ 
        ...prev, 
        propertyImages: [...prev.propertyImages, ...fileArray].slice(0, 10) 
      }));
    } else if (field === 'siteLayout') {
      setFormData(prev => ({ ...prev, siteLayout: fileArray[0] }));
    } else if (field === 'licenseDocuments') {
      setFormData(prev => ({ 
        ...prev, 
        licenseDocuments: [...prev.licenseDocuments, ...fileArray] 
      }));
    }
  };

  const removeFile = (field, index) => {
    if (field === 'propertyImages') {
      setFormData(prev => ({
        ...prev,
        propertyImages: prev.propertyImages.filter((_, i) => i !== index)
      }));
    } else if (field === 'siteLayout') {
      setFormData(prev => ({ ...prev, siteLayout: null }));
    } else if (field === 'licenseDocuments') {
      setFormData(prev => ({
        ...prev,
        licenseDocuments: prev.licenseDocuments.filter((_, i) => i !== index)
      }));
    }
  };

  const handleDrag = (e, field) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(prev => ({ ...prev, [field]: true }));
    } else if (e.type === "dragleave") {
      setDragActive(prev => ({ ...prev, [field]: false }));
    }
  };

  const handleDrop = (e, field) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(prev => ({ ...prev, [field]: false }));
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(field, e.dataTransfer.files);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Scroll to first error
      const firstErrorField = Object.keys(errors)[0];
      const errorElement = document.querySelector(`[name="${firstErrorField}"], #${firstErrorField}`);
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await submitToAPI(formData);
      setShowModal({
        show: true,
        type: 'success',
        message: result.message,
        propertyId: result.propertyId
      });
      
      // Reset form on success
      setFormData({
        propertyType: 'residential',
        footage: '',
        roadWidth: '',
        state: '',
        cityDistrict: '',
        locationAreaName: '',
        landmark: '',
        pincode: '',
        googleMapsUrl: '',
        plotNumber: '',
        length: '',
        breadth: '',
        ownershipType: '',
        boundaryWall: 'no',
        gatedCommunity: 'yes',
        approvalAuthority: '',
        sellingPrice: '',
        negotiable: '',
        maintenanceCharges: '',
        contactName: '',
        phoneNumber: '',
        email: '',
        whatsappNumber: '',
        propertyImages: [],
        siteLayout: null,
        virtualTour: 'yes',
        disabledFriendly: 'yes',
        otherFacilities: '',
        dtcpApproval: 'yes',
        dtcpApprovalNumber: '',
        eeseaApproval: 'yes',
        eeseaApprovalNumber: '',
        licenseDocuments: []
      });
    } catch (error) {
      setShowModal({
        show: true,
        type: 'error',
        message: error.message
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeModal = () => {
    setShowModal({ show: false, type: '', message: '' });
  };

  const FileUploadArea = ({ field, accept, multiple = false, title, subtitle }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{title}</label>
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          dragActive[field] 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragEnter={(e) => handleDrag(e, field)}
        onDragLeave={(e) => handleDrag(e, field)}
        onDragOver={(e) => handleDrag(e, field)}
        onDrop={(e) => handleDrop(e, field)}
      >
        <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <p className="text-sm text-gray-600 mb-2">{subtitle}</p>
        <input
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={(e) => handleFileUpload(field, e.target.files)}
          className="hidden"
          id={field}
        />
        <label
          htmlFor={field}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#175973] hover:bg-[#144a5e] cursor-pointer"
        >
          Choose Files
        </label>
      </div>
    </div>
  );

  // Modal Component
  const Modal = ({ show, type, message, propertyId, onClose }) => {
    if (!show) return null;

    const isSuccess = type === 'success';

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl">
          <div className="flex items-center justify-center mb-4">
            {isSuccess ? (
              <CheckCircle className="h-16 w-16 text-[#175973]" />
            ) : (
              <AlertCircle className="h-16 w-16 text-red-500" />
            )}
          </div>
          
          <div className="text-center">
            <h3 className={`text-lg font-semibold mb-2 ${isSuccess ? 'text-[#175973]' : 'text-red-600'}`}>
              {isSuccess ? 'Success!' : 'Error'}
            </h3>
            <p className="text-gray-600 mb-4">{message}</p>
            
            {isSuccess && propertyId && (
              <div className="bg-gray-50 rounded-lg p-3 mb-4">
                <p className="text-sm text-gray-600">Property ID:</p>
                <p className="font-mono font-bold text-[#175973]">{propertyId}</p>
              </div>
            )}
            
            <button
              onClick={onClose}
              className={`w-full px-4 py-2 rounded-lg font-medium transition-colors ${
                isSuccess
                  ? 'bg-[#175973] hover:bg-[#144a5e] text-white'
                  : 'bg-red-500 hover:bg-red-600 text-white'
              }`}
            >
              {isSuccess ? 'Continue' : 'Try Again'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="max-w-4xl mx-auto p-6 bg-white">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4 gap-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Welcome Name, Fill out your basic details</h1>
              <p className="text-gray-600">I'm looking to Sell</p>
            </div>
            <div className="max-sm:hidden">
              <Image src={fold1image1} alt="Start Selling" />
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Property Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              What kind of property do you have?
            </label>
            <div className="flex space-x-6">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="propertyType"
                  value="residential"
                  checked={formData.propertyType === 'residential'}
                  onChange={(e) => handleInputChange('propertyType', e.target.value)}
                  className="h-4 w-4 accent-[#175973] focus:ring-[#175973] border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">Residential Plot/Land</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="propertyType"
                  value="commercial"
                  checked={formData.propertyType === 'commercial'}
                  onChange={(e) => handleInputChange('propertyType', e.target.value)}
                  className="h-4 w-4 accent-[#175973] focus:ring-[#175973] border-gray-300"
                />
                <span className="ml-2 text-sm text-gray-700">Commercial Plot/Land</span>
              </label>
            </div>
          </div>

          {/* Basic Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Footage</label>
              <select
                id="footage"
                name="footage"
                value={formData.footage}
                onChange={(e) => handleInputChange('footage', e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#175973] ${
                  errors.footage ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select footage</option>
                <option value="below-1000">Below 1000 sq ft</option>
                <option value="1000-2000">1000-2000 sq ft</option>
                <option value="2000-5000">2000-5000 sq ft</option>
                <option value="above-5000">Above 5000 sq ft</option>
              </select>
              {errors.footage && <p className="text-red-500 text-xs mt-1">{errors.footage}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Road Width (ft)</label>
              <select
                id="roadWidth"
                name="roadWidth"
                value={formData.roadWidth}
                onChange={(e) => handleInputChange('roadWidth', e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#175973] ${
                  errors.roadWidth ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select road width</option>
                <option value="10-15">10-15 ft</option>
                <option value="15-20">15-20 ft</option>
                <option value="20-30">20-30 ft</option>
                <option value="above-30">Above 30 ft</option>
              </select>
              {errors.roadWidth && <p className="text-red-500 text-xs mt-1">{errors.roadWidth}</p>}
            </div>
          </div>

          {/* Location Details */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Location Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  placeholder="Your State"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#175973] ${
                    errors.state ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City/District</label>
                <input
                  type="text"
                  id="cityDistrict"
                  name="cityDistrict"
                  value={formData.cityDistrict}
                  onChange={(e) => handleInputChange('cityDistrict', e.target.value)}
                  placeholder="Your City/District"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#175973] ${
                    errors.cityDistrict ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.cityDistrict && <p className="text-red-500 text-xs mt-1">{errors.cityDistrict}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location Area Name</label>
                <input
                  type="text"
                  id="locationAreaName"
                  name="locationAreaName"
                  value={formData.locationAreaName}
                  onChange={(e) => handleInputChange('locationAreaName', e.target.value)}
                  placeholder="Enter location area name"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#175973] ${
                    errors.locationAreaName ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.locationAreaName && <p className="text-red-500 text-xs mt-1">{errors.locationAreaName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Landmark</label>
                <input
                  type="text"
                  value={formData.landmark}
                  onChange={(e) => handleInputChange('landmark', e.target.value)}
                  placeholder="Enter landmark"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#175973]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                <input
                  type="text"
                  id="pincode"
                  name="pincode"
                  value={formData.pincode}
                  onChange={(e) => handleInputChange('pincode', e.target.value)}
                  placeholder="Enter pincode"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#175973] ${
                    errors.pincode ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.pincode && <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Google Maps URL</label>
                <input
                  type="url"
                  value={formData.googleMapsUrl}
                  onChange={(e) => handleInputChange('googleMapsUrl', e.target.value)}
                  placeholder="Enter Google Maps URL"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#175973]"
                />
              </div>
            </div>
          </div>

          {/* Plot Details */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Plot Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Plot Number</label>
                <select
                  id="plotNumber"
                  name="plotNumber"
                  value={formData.plotNumber}
                  onChange={(e) => handleInputChange('plotNumber', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#175973] ${
                    errors.plotNumber ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select plot number</option>
                  <option value="1">Plot 1</option>
                  <option value="2">Plot 2</option>
                  <option value="3">Plot 3</option>
                  <option value="other">Other</option>
                </select>
                {errors.plotNumber && <p className="text-red-500 text-xs mt-1">{errors.plotNumber}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Length (ft)</label>
                <select
                  id="length"
                  name="length"
                  value={formData.length}
                  onChange={(e) => handleInputChange('length', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#175973] ${
                    errors.length ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select length</option>
                  <option value="20-30">20-30 ft</option>
                  <option value="30-40">30-40 ft</option>
                  <option value="40-50">40-50 ft</option>
                  <option value="above-50">Above 50 ft</option>
                </select>
                {errors.length && <p className="text-red-500 text-xs mt-1">{errors.length}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Breadth (ft)</label>
                <select
                  id="breadth"
                  name="breadth"
                  value={formData.breadth}
                  onChange={(e) => handleInputChange('breadth', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#175973] ${
                    errors.breadth ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select breadth</option>
                  <option value="20-30">20-30 ft</option>
                  <option value="30-40">30-40 ft</option>
                  <option value="40-50">40-50 ft</option>
                  <option value="above-50">Above 50 ft</option>
                </select>
                {errors.breadth && <p className="text-red-500 text-xs mt-1">{errors.breadth}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ownership Type</label>
                <select
                  id="ownershipType"
                  name="ownershipType"
                  value={formData.ownershipType}
                  onChange={(e) => handleInputChange('ownershipType', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#175973] ${
                    errors.ownershipType ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select ownership type</option>
                  <option value="freehold">Freehold</option>
                  <option value="leasehold">Leasehold</option>
                  <option value="cooperative">Cooperative Society</option>
                </select>
                {errors.ownershipType && <p className="text-red-500 text-xs mt-1">{errors.ownershipType}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Boundary Wall</label>
                <div className="flex space-x-6">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="boundaryWall"
                      value="yes"
                      checked={formData.boundaryWall === 'yes'}
                      onChange={(e) => handleInputChange('boundaryWall', e.target.value)}
                      className="h-4 w-4 accent-[#175973] focus:ring-[#175973] border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">Yes</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="boundaryWall"
                      value="no"
                      checked={formData.boundaryWall === 'no'}
                      onChange={(e) => handleInputChange('boundaryWall', e.target.value)}
                      className="h-4 w-4 accent-[#175973] focus:ring-[#175973] border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">No</span>
                  </label>
                </div>
                {errors.boundaryWall && <p className="text-red-500 text-xs mt-1">{errors.boundaryWall}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Gated Community</label>
                <div className="flex space-x-6">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="gatedCommunity"
                      value="yes"
                      checked={formData.gatedCommunity === 'yes'}
                      onChange={(e) => handleInputChange('gatedCommunity', e.target.value)}
                      className="h-4 w-4 accent-[#175973] focus:ring-[#175973] border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">Yes</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="gatedCommunity"
                      value="no"
                      checked={formData.gatedCommunity === 'no'}
                      onChange={(e) => handleInputChange('gatedCommunity', e.target.value)}
                      className="h-4 w-4 accent-[#175973] focus:ring-[#175973] border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">No</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Approval Authority</label>
              <input
                type="text"
                value={formData.approvalAuthority}
                onChange={(e) => handleInputChange('approvalAuthority', e.target.value)}
                placeholder="Enter approval authority"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#175973]"
              />
            </div>
          </div>

          {/* Price Details */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Price Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Selling Price</label>
                <select
                  id="sellingPrice"
                  name="sellingPrice"
                  value={formData.sellingPrice}
                  onChange={(e) => handleInputChange('sellingPrice', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#175973] ${
                    errors.sellingPrice ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select price range</option>
                  <option value="below-10l">Below ₹10 Lakhs</option>
                  <option value="10l-25l">₹10-25 Lakhs</option>
                  <option value="25l-50l">₹25-50 Lakhs</option>
                  <option value="50l-1cr">₹50 Lakhs - ₹1 Crore</option>
                  <option value="above-1cr">Above ₹1 Crore</option>
                </select>
                {errors.sellingPrice && <p className="text-red-500 text-xs mt-1">{errors.sellingPrice}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Negotiable</label>
                <select
                  value={formData.negotiable}
                  onChange={(e) => handleInputChange('negotiable', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#175973]"
                >
                  <option value="">Select option</option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Maintenance Charges</label>
              <input
                type="text"
                value={formData.maintenanceCharges}
                onChange={(e) => handleInputChange('maintenanceCharges', e.target.value)}
                placeholder="Enter maintenance charges"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#175973]"
              />
            </div>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Name</label>
                <input
                  type="text"
                  id="contactName"
                  name="contactName"
                  value={formData.contactName}
                  onChange={(e) => handleInputChange('contactName', e.target.value)}
                  placeholder="Your Name"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#175973] ${
                    errors.contactName ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.contactName && <p className="text-red-500 text-xs mt-1">{errors.contactName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                  placeholder="+91XXXXXXXXXX"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#175973] ${
                    errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Your Email ID"
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#175973] ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Number</label>
                <input
                  type="tel"
                  value={formData.whatsappNumber}
                  onChange={(e) => handleInputChange('whatsappNumber', e.target.value)}
                  placeholder="Your Number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#175973]"
                />
              </div>
            </div>
          </div>

          {/* Upload Media */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload Your Media</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <FileUploadArea
                  field="propertyImages"
                  accept="image/*"
                  multiple={true}
                  title="Property Images"
                  subtitle="Browse your files and upload images Maximum file size: 50 MB"
                />
                {formData.propertyImages.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {formData.propertyImages.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded">
                        <span className="text-sm text-gray-700 truncate">{file.name}</span>
                        <button
                          type="button"
                          onClick={() => removeFile('propertyImages', index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <FileUploadArea
                  field="siteLayout"
                  accept=".pdf,image/*"
                  multiple={false}
                  title="Site Layout (PDF)"
                  subtitle="Upload Site Layout (PDF) Maximum file size: 50 MB"
                />
                {formData.siteLayout && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded">
                      <span className="text-sm text-gray-700 truncate">{formData.siteLayout.name}</span>
                      <button
                        type="button"
                        onClick={() => removeFile('siteLayout')}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Facilities */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Facilities</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Virtual Tour</label>
                <div className="flex space-x-6">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="virtualTour"
                      value="yes"
                      checked={formData.virtualTour === 'yes'}
                      onChange={(e) => handleInputChange('virtualTour', e.target.value)}
                      className="h-4 w-4 accent-[#175973] focus:ring-[#175973] border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">Yes</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="virtualTour"
                      value="no"
                      checked={formData.virtualTour === 'no'}
                      onChange={(e) => handleInputChange('virtualTour', e.target.value)}
                      className="h-4 w-4 accent-[#175973] focus:ring-[#175973] border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">No</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Disabled Friendly</label>
                <div className="flex space-x-6">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="disabledFriendly"
                      value="yes"
                      checked={formData.disabledFriendly === 'yes'}
                      onChange={(e) => handleInputChange('disabledFriendly', e.target.value)}
                      className="h-4 w-4 accent-[#175973] focus:ring-[#175973] border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">Yes</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="disabledFriendly"
                      value="no"
                      checked={formData.disabledFriendly === 'no'}
                      onChange={(e) => handleInputChange('disabledFriendly', e.target.value)}
                      className="h-4 w-4 accent-[#175973] focus:ring-[#175973] border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">No</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Other Facilities</label>
              <textarea
                value={formData.otherFacilities}
                onChange={(e) => handleInputChange('otherFacilities', e.target.value)}
                placeholder="Describe other facilities"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#175973]"
              />
            </div>
          </div>

          {/* Legal Documents */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Legal Documents</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fully Booked</label>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">DTCP Approval</label>
                    <div className="flex space-x-6">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="dtcpApproval"
                          value="yes"
                          checked={formData.dtcpApproval === 'yes'}
                          onChange={(e) => handleInputChange('dtcpApproval', e.target.value)}
                          className="h-4 w-4 accent-[#175973] focus:ring-[#175973] border-gray-300"
                        />
                        <span className="ml-2 text-sm text-gray-700">Yes</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="dtcpApproval"
                          value="no"
                          checked={formData.dtcpApproval === 'no'}
                          onChange={(e) => handleInputChange('dtcpApproval', e.target.value)}
                          className="h-4 w-4 accent-[#175973] focus:ring-[#175973] border-gray-300"
                        />
                        <span className="ml-2 text-sm text-gray-700">No</span>
                      </label>
                    </div>
                  </div>
                  
                  {formData.dtcpApproval === 'yes' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">DTCP Approval Number</label>
                      <input
                        type="text"
                        value={formData.dtcpApprovalNumber}
                        onChange={(e) => handleInputChange('dtcpApprovalNumber', e.target.value)}
                        placeholder="Enter DTCP approval number"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#175973]"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Survey Number</label>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">EESEA Approval</label>
                    <div className="flex space-x-6">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="eeseaApproval"
                          value="yes"
                          checked={formData.eeseaApproval === 'yes'}
                          onChange={(e) => handleInputChange('eeseaApproval', e.target.value)}
                          className="h-4 w-4 accent-[#175973] focus:ring-[#175973] border-gray-300"
                        />
                        <span className="ml-2 text-sm text-gray-700">Yes</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="eeseaApproval"
                          value="no"
                          checked={formData.eeseaApproval === 'no'}
                          onChange={(e) => handleInputChange('eeseaApproval', e.target.value)}
                          className="h-4 w-4 accent-[#175973] focus:ring-[#175973] border-gray-300"
                        />
                        <span className="ml-2 text-sm text-gray-700">No</span>
                      </label>
                    </div>
                  </div>

                  {formData.eeseaApproval === 'yes' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">EESEA Approval Number</label>
                      <input
                        type="text"
                        value={formData.eeseaApprovalNumber}
                        onChange={(e) => handleInputChange('eeseaApprovalNumber', e.target.value)}
                        placeholder="Enter EESEA approval number"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#175973]"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6">
              <FileUploadArea
                field="licenseDocuments"
                accept=".pdf,.doc,.docx,image/*"
                multiple={true}
                title="License Documents"
                subtitle="Browse your files and upload documents Maximum file size: 50 MB"
              />
              {formData.licenseDocuments.length > 0 && (
                <div className="mt-2 space-y-1">
                  {formData.licenseDocuments.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded">
                      <span className="text-sm text-gray-700 truncate">{file.name}</span>
                      <button
                        type="button"
                        onClick={() => removeFile('licenseDocuments', index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-6">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-8 py-3 bg-[#175973] text-white font-medium rounded-lg hover:bg-[#144a5e] focus:outline-none focus:ring-2 focus:ring-[#175973] focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
              {isSubmitting ? 'Submitting...' : 'Submit Property Details'}
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal
        show={showModal.show}
        type={showModal.type}
        message={showModal.message}
        propertyId={showModal.propertyId}
        onClose={closeModal}
      />
    </>
  );
}

export default StartSellingForm;