'use client'
import React, { useState, useCallback, memo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './App.css';

// Redux imports
import {
  fetchPropertyDetails,
  saveProperty,
  submitContactForm,
  addToSavedProperties,
} from './store/slices/propertySlice';

import {
  setActiveTab,
  setSearchMode,
  setSearchLocation,
  setSearchFilters,
  setSelectedImageIndex,
  toggleProfileMenu,
  toggleDescriptionExpanded,
} from './store/slices/uiSlice';

import {
  addToRecentlyViewed,
} from './store/slices/userSlice';

// Header Component
const Header = memo(() => {
  const dispatch = useDispatch();
  const { searchMode, searchLocation } = useSelector(state => state.ui);

  const handleSearchModeChange = useCallback((mode) => {
    dispatch(setSearchMode(mode));
  }, [dispatch]);

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-wrapper">
          <svg width="120" height="32" viewBox="0 0 120 32" fill="none">
            <circle cx="16" cy="16" r="14" fill="#FFB800"/>
            <path d="M16 8L19 16L16 24L13 16L16 8Z" fill="#0066CC"/>
            <text x="40" y="22" fill="#0066CC" fontSize="20" fontWeight="bold" fontFamily="Arial">91IDAM</text>
          </svg>
        </div>
        
        <div className="header-search">
          <button 
            type="button"
            className={`mode-button ${searchMode === 'Buy' ? 'active' : ''}`}
            onClick={() => handleSearchModeChange('Buy')}
          >
            Buy
          </button>
          <button 
            type="button"
            className={`mode-button ${searchMode === 'Rent' ? 'active' : ''}`}
            onClick={() => handleSearchModeChange('Rent')}
          >
            Rent
          </button>
          
          <div className="divider"></div>
          
          <button type="button" className="location-button">
            <span>{searchLocation}</span>
            <svg className="dropdown-icon" width="10" height="6" viewBox="0 0 10 6" fill="none">
              <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
          
          <div className="divider"></div>
          
          <button type="button" className="add-more-button">
            <span>Add more</span>
          </button>
        </div>
        
        <nav className="header-nav">
          <button 
            className="profile-button" 
            aria-label="Profile"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="2"/>
              <circle cx="12" cy="9" r="3" fill="currentColor"/>
              <path d="M7 18C7 15.2386 9.23858 13 12 13C14.7614 13 17 15.2386 17 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </nav>
      </div>
    </header>
  );
});

Header.displayName = 'Header';

// Property Gallery Component
const PropertyGallery = memo(() => {
  const dispatch = useDispatch();
  const selectedImageIndex = useSelector(state => state.ui.selectedImageIndex);
  
  const images = [
    "https://in-cdn1.blr1.cdn.digitaloceanspaces.com/figma-images/477fd50e4b50e960f766a5813143a23a276c6e6b.png",
    "https://in-cdn1.blr1.cdn.digitaloceanspaces.com/figma-images/591fe1b30e2aa8c848b37b7bece89fe3380ec31f.png",
    "https://in-cdn1.blr1.cdn.digitaloceanspaces.com/figma-images/3d47b58322f263a6a86e1b0a8f1b2ebb761a05ed.png"
  ];

  const handleImageSelect = useCallback((index) => {
    dispatch(setSelectedImageIndex(index));
  }, [dispatch]);
  
  return (
    <div className="property-gallery">
      <div className="gallery-main">
        <div className="main-image-wrapper">
          <img 
            src={images[selectedImageIndex]} 
            alt="Main property view" 
            className="main-image"
          />
        </div>
      </div>
      
      <div className="gallery-sidebar">
        {images.slice(1, 3).map((image, index) => (
          <div 
            key={index} 
            className="sidebar-image-wrapper"
            onClick={() => handleImageSelect(index + 1)}
          >
            <img 
              src={image} 
              alt={`Property view ${index + 2}`} 
              className="sidebar-image"
            />
            {index === 1 && (
              <button className="view-photos-button">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect x="2" y="4" width="12" height="9" rx="1" stroke="currentColor" strokeWidth="1.5"/>
                  <circle cx="8" cy="8.5" r="2" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M2 10L5 7L8 10L11 6L14 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <span>View photos</span>
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
});

PropertyGallery.displayName = 'PropertyGallery';

// Action Buttons Component
const ActionButtons = memo(() => {
  const dispatch = useDispatch();
  const [isSaved, setSaved] = useState(false);

  const handleSave = useCallback(() => {
    setSaved(!isSaved);
  }, [isSaved]);

  const handleShare = useCallback(() => {
    if (navigator.share) {
      navigator.share({
        title: 'Residential Plots/Land in Thudiyalur, Coimbatore',
        text: 'Check out this property',
        url: window.location.href,
      });
    }
  }, []);

  return (
    <div className="action-buttons">
      <button 
        className={`action-button ${isSaved ? 'saved' : ''}`} 
        onClick={handleSave} 
        aria-label="Save property"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path 
            d="M8 2L10.2451 6.90983L15.5106 7.72542L11.7553 11.3902L12.4901 16.6312L8 14.0902L3.50987 16.6312L4.24472 11.3902L0.489435 7.72542L5.75486 6.90983L8 2Z" 
            stroke="currentColor" 
            fill={isSaved ? "currentColor" : "none"}
            strokeWidth="1.5" 
            strokeLinejoin="round"
          />
        </svg>
        <span>{isSaved ? 'Saved' : 'Save'}</span>
      </button>
      <button className="action-button" onClick={handleShare} aria-label="Share property">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M6 10V14C6 14.5523 6.44772 15 7 15H13C13.5523 15 14 14.5523 14 14V10M10 7L10 1M10 1L7 4M10 1L13 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span>Share</span>
      </button>
    </div>
  );
});

ActionButtons.displayName = 'ActionButtons';

// Property Info Component
const PropertyInfo = memo(() => {
  return (
    <div className="property-info">
      <div className="price-section">
        <div className="price-main">
          <span className="currency">₹</span>
          <span className="price">19.50 Lac</span>
        </div>
        <div className="price-per-sqft">₹3,330 /sqft</div>
      </div>
      
      <h1 className="property-title">Residential Plots/Land in Thudiyalur, Coimbatore</h1>
      
      <div className="property-details">
        <div className="detail-items">
          <span className="detail-item">588 sqft</span>
          <span className="detail-separator">•</span>
          <span className="detail-item">Plot Area</span>
          <span className="detail-separator">•</span>
          <span className="detail-item">Plot/Land</span>
        </div>
        <div className="property-badge">DTCP Approved</div>
      </div>
      
      <div className="publish-info">
        <span className="publish-label">Published:</span>
        <span className="publish-date">December 27, 2018</span>
      </div>
    </div>
  );
});

PropertyInfo.displayName = 'PropertyInfo';

// Tab Navigation Component
const TabNavigation = memo(() => {
  const dispatch = useDispatch();
  const activeTab = useSelector(state => state.ui.activeTab);
  const tabs = ['Details', 'Floorplan', 'Map'];

  const handleTabChange = useCallback((tab) => {
    dispatch(setActiveTab(tab.toLowerCase()));
  }, [dispatch]);
  
  return (
    <div className="tab-navigation">
      <div className="tab-container" role="tablist">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => handleTabChange(tab)}
            className={`tab-button ${activeTab === tab.toLowerCase() ? 'active' : ''}`}
            role="tab"
            aria-selected={activeTab === tab.toLowerCase()}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
});

TabNavigation.displayName = 'TabNavigation';

// Tab Content Component
const TabContent = memo(() => {
  const activeTab = useSelector(state => state.ui.activeTab);
  const dispatch = useDispatch();
  const isExpanded = useSelector(state => state.ui.descriptionExpanded);

  const toggleDescription = useCallback(() => {
    dispatch(toggleDescriptionExpanded());
  }, [dispatch]);

  if (activeTab === 'details') {
    return (
      <div className="details-content">
        <section className="plot-details-section">
          <h2 className="section-title">Plot details</h2>
          <div className="details-grid">
            <div className="detail-row">
              <span className="detail-label">Plot Size(sqft):</span>
              <span className="detail-value">₹3,330 /sqft</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Length(ft):</span>
              <span className="detail-value">1,428 sq.m.</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Breadth(ft):</span>
              <span className="detail-value">1,428 sq.m.</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Road width:</span>
              <span className="detail-value">12</span>
            </div>
          </div>
        </section>

        <section className="description-section">
          <h2 className="section-title">Description</h2>
          <div className={`description-text ${isExpanded ? 'expanded' : ''}`}>
            <p>
              This extremely spacious two/three bedroom duplex apartment occupies a desirable position to the South-West of Harrogate's town centre and offers a huge amount of scope to update and re-model to suit t...
            </p>
          </div>
          <button className="view-more-button" onClick={toggleDescription}>
            {isExpanded ? 'View Less' : 'View More'}
          </button>
        </section>

        <section className="price-details-section">
          <h2 className="section-title">Price Details</h2>
          <div className="price-details-grid">
            <div className="price-detail-row">
              <span className="detail-label">Selling Price:</span>
              <span className="detail-value">₹ 19.50 Lac</span>
            </div>
            <div className="price-detail-row">
              <span className="detail-label">Maintenance Charges:</span>
              <span className="detail-value">₹ 19.50 Lac</span>
            </div>
            <div className="price-detail-row">
              <span className="detail-label">Negotiable:</span>
              <span className="detail-value">₹ 17.50 Lac</span>
            </div>
          </div>
        </section>

        <section className="facilities-section">
          <h2 className="section-title">Facilities</h2>
          <div className="facilities-grid">
            <div className="facility-item">
              <span className="facility-icon">🍽️</span>
              <span className="facility-name">Restaurant</span>
            </div>
            <div className="facility-item">
              <span className="facility-icon">💧</span>
              <span className="facility-name">Water</span>
            </div>
            <div className="facility-item">
              <span className="facility-icon">💡</span>
              <span className="facility-name">Internal street light</span>
            </div>
            <div className="facility-item">
              <span className="facility-icon">🔒</span>
              <span className="facility-name">24/7 Security</span>
            </div>
          </div>
        </section>

        <section className="location-section">
          <h2 className="section-title">Location Details</h2>
          <div className="location-content">
            <div className="map-container">
              <iframe
                src="https://maps.google.com/maps?q=Thudiyalur,Coimbatore&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div className="location-info">
              <div className="address-details">
                <svg className="location-pin" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22S19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="#67777A"/>
                </svg>
                <div className="address-text">
                  <div className="address-line">
                    <span className="address-part">Tamil Nadu,</span>
                    <span className="address-part">Coimbatore,</span>
                  </div>
                  <div className="address-line">
                    <span className="address-part">Thudiyalur,</span>
                    <span className="address-part">NGGO Colony,</span>
                  </div>
                  <div className="address-line">
                    <span className="address-part">641034.</span>
                  </div>
                </div>
              </div>
              <div className="map-controls">
                <button className="zoom-button" aria-label="Zoom in">+</button>
                <div className="zoom-divider"></div>
                <button className="zoom-button" aria-label="Zoom out">-</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (activeTab === 'floorplan') {
    return (
      <div className="floorplan-content">
        <div className="property-type-badge">
          <span>Land</span>
        </div>
        <div className="floorplan-card">
          <div className="floorplan-details">
            <div className="floorplan-image-wrapper">
              <img 
                src="https://in-cdn1.blr1.cdn.digitaloceanspaces.com/figma-images/5437fcaea75c079e6c07a407bad02b044fe2525d.png" 
                alt="Property floorplan" 
                className="floorplan-image"
              />
            </div>
            <div className="floorplan-info">
              <div className="price-info">
                <div className="price-amount">₹ 19.50 Lac</div>
                <div className="price-sqft">₹3,330 /sqft</div>
              </div>
              <button className="cta-button">
                <span>Call Now</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === 'map') {
    return (
      <div className="map-tab-content">
        <div className="full-map-container">
          <iframe
            src="https://maps.google.com/maps?q=Thudiyalur,Coimbatore&output=embed"
            width="100%"
            height="500"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    );
  }

  return null;
});

TabContent.displayName = 'TabContent';

// Contact Sidebar Component
const ContactSidebar = memo(() => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  const handleSubmit = useCallback(() => {
    console.log('Form submitted:', formData);
  }, [formData]);

  return (
    <aside className="contact-sidebar">
      <div className="contact-header">
        <h3 className="contact-title">Ask me for more information</h3>
      </div>

      <div className="contact-form">
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleInputChange}
          className="form-input"
          required
        />
        
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          className="form-input"
          required
        />
        
        <input
          type="tel"
          name="phone"
          placeholder="+x(xxx)xxx-xx-xx"
          value={formData.phone}
          onChange={handleInputChange}
          className="form-input"
          required
        />
        
        <textarea
          name="message"
          placeholder="I would like more information about ..."
          value={formData.message}
          onChange={handleInputChange}
          className="form-textarea"
          rows={4}
          required
        />
        
        <button onClick={handleSubmit} className="submit-button">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M15 1L7 9M15 1L10 15L7 9M15 1L1 6L7 9" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Call Now</span>
        </button>
      </div>
    </aside>
  );
});

ContactSidebar.displayName = 'ContactSidebar';

// Footer Component
const Footer = memo(() => (
  <footer className="footer">
    <div className="footer-gradient">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-section">
            <svg width="120" height="32" viewBox="0 0 120 32" fill="none">
              <circle cx="16" cy="16" r="14" fill="#FFB800"/>
              <path d="M16 8L19 16L16 24L13 16L16 8Z" fill="white"/>
              <text x="40" y="22" fill="white" fontSize="20" fontWeight="bold" fontFamily="Arial">91IDAM</text>
            </svg>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Company</h3>
            <ul className="footer-links">
              <li><a href="#about">About</a></li>
              <li><a href="#contact">Contact</a></li>
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#terms">Terms & Condition</a></li>
              <li><a href="#feedback">Feedback</a></li>
              <li><a href="#report">Report a Problem</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Our Partners</h3>
            <ul className="footer-links">
              <li><a href="#vkv">VKV Realty</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Contact Us</h3>
            <div className="contact-info">
              <div className="contact-item">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M2 4L8 9L14 4M2 2H14C14.5523 2 15 2.44772 15 3V13C15 13.5523 14.5523 14 14 14H2C1.44772 14 1 13.5523 1 13V3C1 2.44772 1.44772 2 2 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Email id</span>
              </div>
              <div className="contact-item">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 2L5 1L9 5L8 6C8 6 9 8 10 9C11 10 13 11 13 11L14 10L15 14L13 15C13 15 8 15 2 9C2 9 0 3 3 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>+1 (062) 109-9222</span>
              </div>
            </div>
            
            <h3 className="footer-title connect-title">Connect Us</h3>
            <div className="social-links">
              <a href="#facebook" className="social-link" aria-label="Facebook">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="white">
                  <path d="M20 10.061C20 4.505 15.523 0 10 0S0 4.505 0 10.061C0 15.083 3.657 19.245 8.438 20v-7.03H5.898v-2.909h2.54V7.845c0-2.522 1.492-3.915 3.777-3.915 1.094 0 2.238.197 2.238.197v2.476h-1.26c-1.243 0-1.63.775-1.63 1.57v1.888h2.773l-.443 2.908h-2.33V20C16.343 19.245 20 15.083 20 10.061z"/>
                </svg>
              </a>
              <a href="#youtube" className="social-link" aria-label="YouTube">
                <svg width="20" height="20" viewBox="0 0 20 16" fill="white">
                  <path d="M19.582 2.502a2.506 2.506 0 00-1.768-1.768C16.254.333 10 .333 10 .333s-6.254 0-7.814.401A2.506 2.506 0 00.418 2.502C0 4.07 0 7.333 0 7.333s0 3.263.418 4.831a2.506 2.506 0 001.768 1.768C3.746 14.333 10 14.333 10 14.333s6.254 0 7.814-.401a2.506 2.506 0 001.768-1.768C20 10.596 20 7.333 20 7.333s0-3.263-.418-4.831zM8 10.333V4.333L13.196 7.333 8 10.333z"/>
                </svg>
              </a>
              <a href="#instagram" className="social-link" aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="white">
                  <path d="M10 1.802c2.67 0 2.987.01 4.042.059 2.71.123 3.975 1.409 4.099 4.099.048 1.054.057 1.37.057 4.04 0 2.672-.01 2.988-.057 4.042-.124 2.687-1.387 3.975-4.1 4.099-1.054.048-1.37.058-4.041.058-2.67 0-2.987-.01-4.04-.058-2.718-.124-3.977-1.416-4.1-4.1-.048-1.054-.058-1.37-.058-4.041 0-2.67.01-2.986.058-4.04.124-2.69 1.387-3.977 4.1-4.1 1.054-.048 1.37-.058 4.04-.058zM10 0C7.284 0 6.944.012 5.877.06 2.246.227.227 2.242.061 5.877.01 6.944 0 7.284 0 10s.012 3.057.06 4.123c.167 3.632 2.182 5.65 5.817 5.817 1.067.048 1.407.06 4.123.06s3.057-.012 4.123-.06c3.629-.167 5.652-2.182 5.816-5.817.05-1.066.061-1.407.061-4.123s-.012-3.056-.06-4.122C19.777 2.249 17.76.228 14.124.06 13.057.01 12.716 0 10 0zm0 4.865a5.135 5.135 0 100 10.27 5.135 5.135 0 000-10.27zm0 8.468a3.333 3.333 0 110-6.666 3.333 3.333 0 010 6.666zm5.338-9.87a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4z"/>
                </svg>
              </a>
              <a href="#linkedin" className="social-link" aria-label="LinkedIn">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="white">
                  <path d="M4.478 20H.33V6.647h4.148V20zM2.402 4.827A2.402 2.402 0 110 2.425a2.402 2.402 0 012.402 2.402zM20 20h-4.145v-6.514c0-1.548-.028-3.543-2.16-3.543-2.16 0-2.49 1.687-2.49 3.428V20H7.06V6.647h3.98v1.823h.057a4.365 4.365 0 013.93-2.16c4.202 0 4.973 2.768 4.973 6.368V20z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
));

Footer.displayName = 'Footer';

// Main App Component
const App = () => {
  const activeTab = useSelector(state => state.ui.activeTab);

  return (
    <div className="property-view-page">
      <Header />
      
      <div className="hero-section">
        <div className="hero-content"></div>
      </div>
      
      <main className="main-content">
        <PropertyGallery />
        <ActionButtons />
        <PropertyInfo />
        <TabNavigation />
        
        <div className="tab-content-wrapper">
          <div className="main-content-area">
            <TabContent />
          </div>
          
          {activeTab === 'details' && <ContactSidebar />}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default App;