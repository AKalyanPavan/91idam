'use client';
import React, { useState } from 'react';

const styles = `
    
    body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        background-color: #f5f5f5;
        color: #333;
        line-height: 1.6;
    }
    
    /* Language Switcher - Top Right */
    .language-switcher {
        position: fixed;
        top: 15px;
        right: 20px;
        background: white;
        border-radius: 20px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.15);
        padding: 5px;
        z-index: 1001;
    }
    
    .lang-btn {
        padding: 8px 12px;
        border: none;
        background: none;
        cursor: pointer;
        border-radius: 15px;
        font-size: 12px;
        font-weight: 500;
        transition: all 0.3s ease;
        color: #666;
    }
    
    .lang-btn.active {
        background-color: #2c5f7e;
        color: white;
    }
    
    /* Header - Matching IDAM Style */
    .nav-container {
        max-width: 1200px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;
    }
    
    /* IDAM Logo Style */
    .logo {
        display: flex;
        align-items: center;
        font-size: 28px;
        font-weight: bold;
        color: #2c5f7e;
        text-decoration: none;
    }
    
    .logo-icon {
        width: 40px;
        height: 40px;
        margin-right: 10px;
        background: linear-gradient(135deg, #2c5f7e, #5a9fd4);
        border-radius: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 20px;
        transform: rotate(45deg);
    }
    
    .logo-icon::before {
        content: "⬦";
        transform: rotate(-45deg);
    }
    
    /* Navigation */
    .nav-menu {
        display: flex;
        list-style: none;
        gap: 30px;
        align-items: center;
    }
    
    .nav-item {
        position: relative;
    }
    
    .nav-link {
        text-decoration: none;
        color: #666;
        font-weight: 500;
        padding: 10px 15px;
        border-radius: 6px;
        transition: all 0.3s ease;
        display: block;
    }
    
    .nav-link:hover, .nav-link.active {
        color: #2c5f7e;
        background-color: rgba(44, 95, 126, 0.1);
    }
    
    /* Partners Dropdown */
    .dropdown {
        position: absolute;
        top: 100%;
        left: 0;
        background: white;
        min-width: 220px;
        box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        border-radius: 8px;
        opacity: 0;
        visibility: hidden;
        transform: translateY(-10px);
        transition: all 0.3s ease;
        z-index: 1000;
        border: 1px solid #e8e0d4;
    }
    
    .nav-item:hover .dropdown {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
    }
    
    .dropdown a {
        display: block;
        padding: 15px 20px;
        color: #666;
        text-decoration: none;
        border-bottom: 1px solid #f5f5f5;
        transition: all 0.3s ease;
        font-size: 14px;
    }
    
    .dropdown a:last-child {
        border-bottom: none;
    }
    
    .dropdown a:hover {
        background-color: #f8f9fa;
        color: #2c5f7e;
        padding-left: 25px;
    }
    
    /* CTA Buttons */
    .cta-buttons {
        display: flex;
        gap: 12px;
    }
    
    .btn {
        padding: 12px 24px;
        border-radius: 6px;
        text-decoration: none;
        font-weight: 600;
        transition: all 0.3s ease;
        border: none;
        cursor: pointer;
        font-size: 14px;
    }
    
    .btn-primary {
        background-color: #2c5f7e;
        color: white;
    }
    
    .btn-primary:hover {
        background-color: #1e4a63;
        transform: translateY(-1px);
    }
    
    .btn-secondary {
        background-color: #5a9fd4;
        color: white;
    }
    
    .btn-secondary:hover {
        background-color: #4a8bc2;
        transform: translateY(-1px);
    }
    
    /* Main Content */
    .main-content {
        max-width: 1200px;
        margin: 0 auto;
        padding: 40px 20px;
    }
    
    /* Breadcrumb */
    .breadcrumb {
        margin-bottom: 30px;
        color: #666;
        font-size: 14px;
    }
    
    .breadcrumb a {
        color: #2c5f7e;
        text-decoration: none;
    }
    
    .breadcrumb a:hover {
        text-decoration: underline;
    }
    
    /* Hero Section */
    .hero-section {
        text-align: center;
        margin-bottom: 60px;
        padding: 60px 20px;
        background: linear-gradient(135deg, rgba(44, 95, 126, 0.05), rgba(90, 159, 212, 0.05));
        border-radius: 15px;
    }
    
    .hero-title {
        font-size: 3.5rem;
        color: #2c5f7e;
        margin-bottom: 20px;
        font-weight: 700;
        line-height: 1.2;
    }
    
    .hero-subtitle {
        font-size: 1.4rem;
        color: #666;
        margin-bottom: 30px;
        line-height: 1.6;
        max-width: 800px;
        margin-left: auto;
        margin-right: auto;
    }
    
    .hero-highlights {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 20px;
        margin-top: 40px;
        max-width: 800px;
        margin-left: auto;
        margin-right: auto;
    }
    
    .highlight-item {
        background: white;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        transition: all 0.3s ease;
    }
    
    .highlight-item:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 25px rgba(44, 95, 126, 0.15);
    }
    
    .highlight-icon {
        font-size: 2rem;
        margin-bottom: 10px;
        display: block;
    }
    
    .highlight-text {
        color: #2c5f7e;
        font-weight: 600;
        font-size: 14px;
    }
    
    /* Pain Points Section */
    .pain-points-section {
        background: #fff5f5;
        border-radius: 15px;
        padding: 50px 40px;
        margin: 50px 0;
        border-left: 5px solid #e53e3e;
    }
    
    .section-title {
        font-size: 2.5rem;
        color: #2c5f7e;
        margin-bottom: 30px;
        font-weight: 700;
        text-align: center;
    }
    
    .pain-intro {
        text-align: center;
        color: #666;
        font-size: 1.1rem;
        margin-bottom: 40px;
        max-width: 700px;
        margin-left: auto;
        margin-right: auto;
    }
    
    .pain-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 30px;
    }
    
    .pain-card {
        background: white;
        padding: 30px;
        border-radius: 12px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        border-top: 4px solid #e53e3e;
    }
    
    .pain-icon {
        font-size: 3rem;
        margin-bottom: 20px;
        display: block;
    }
    
    .pain-title {
        color: #e53e3e;
        font-size: 1.3rem;
        font-weight: 600;
        margin-bottom: 15px;
    }
    
    .pain-description {
        color: #666;
        line-height: 1.6;
        margin-bottom: 15px;
    }
    
    .pain-examples {
        background: #f8f9fa;
        padding: 15px;
        border-radius: 8px;
        border-left: 3px solid #e53e3e;
    }
    
    .pain-examples strong {
        color: #e53e3e;
        font-size: 14px;
    }
    
    .pain-examples ul {
        margin-top: 10px;
        margin-left: 20px;
        color: #555;
        font-size: 14px;
    }
    
    /* Solutions Section */
    .solutions-section {
        background: white;
        border-radius: 15px;
        padding: 50px 40px;
        margin: 50px 0;
        box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    }
    
    .solutions-intro {
        text-align: center;
        margin-bottom: 50px;
    }
    
    .solutions-title {
        font-size: 2.5rem;
        color: #2c5f7e;
        margin-bottom: 20px;
        font-weight: 700;
    }
    
    .solutions-subtitle {
        color: #666;
        font-size: 1.2rem;
        max-width: 700px;
        margin: 0 auto;
    }
    
    .solutions-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
        gap: 40px;
    }
    
    .solution-card {
        background: #f8f9fa;
        padding: 20px;
        border-radius: 15px;
        transition: all 0.3s ease;
        border: 2px solid transparent;
    }
    
    .solution-card:hover {
        background: white;
        border-color: #2c5f7e;
        transform: translateY(-5px);
        box-shadow: 0 15px 35px rgba(44, 95, 126, 0.15);
    }
    
    .solution-header {
        display: flex;
        align-items: center;
        margin-bottom: 25px;
    }
    
    .solution-icon {
        font-size: 3rem;
        margin-right: 20px;
    }
    
    .solution-title {
        color: #2c5f7e;
        font-size: 1.5rem;
        font-weight: 700;
    }
    
    .solution-tagline {
        color: #666;
        font-style: italic;
        margin-bottom: 20px;
        font-size: 1.1rem;
    }
    
    .solution-features {
        list-style: none;
        padding: 0;
    }
    
    .solution-features li {
        margin-bottom: 12px;
        padding-left: 25px;
        position: relative;
        color: #555;
        line-height: 1.5;
    }
    
    .solution-features li::before {
        content: "✓";
        color: #28a745;
        font-weight: bold;
        position: absolute;
        left: 0;
        top: 0;
    }
    
    /* Comparison Table */
    .comparison-section {
        background: white;
        border-radius: 15px;
        padding: 50px 40px;
        margin: 50px 0;
        box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    }
    
    .comparison-table {
        max-width: 900px;
        margin: 30px auto 0;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    }
    
    .comparison-row {
        display: grid;
        grid-template-columns: 2fr 2fr 2fr;
        min-height: 60px;
    }
    
    .comparison-cell {
        padding: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        font-weight: 500;
        border-bottom: 1px solid #e8e0d4;
    }
    
    .header-row .comparison-cell {
        background: #2c5f7e;
        color: white;
        font-weight: 700;
        font-size: 1.1rem;
    }
    
    .comparison-cell.feature {
        background: #f8f9fa;
        color: #2c5f7e;
        font-weight: 600;
        justify-content: flex-start;
        text-align: left;
    }
    
    .comparison-cell.traditional {
        background: #ffeaa7;
        color: #d63031;
    }
    
    .comparison-cell.idam {
        background: #d4edda;
        color: #155724;
    }
    
    /* Trust Indicators */
    .trust-section {
        background: linear-gradient(135deg, #2c5f7e, #5a9fd4);
        color: white;
        border-radius: 15px;
        padding: 50px 40px;
        margin: 50px 0;
        text-align: center;
    }
    
    .trust-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 30px;
        margin-top: 40px;
    }
    
    .trust-item {
        background: rgba(255, 255, 255, 0.1);
        padding: 30px;
        border-radius: 12px;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        transition: all 0.3s ease;
    }
    
    .trust-item:hover {
        background: rgba(255, 255, 255, 0.15);
        transform: translateY(-5px);
    }
    
    .trust-item-icon {
        font-size: 2.5rem;
        margin-bottom: 15px;
        display: block;
    }
    
    .trust-item-title {
        font-size: 1.2rem;
        font-weight: 600;
        margin-bottom: 10px;
    }
    
    .trust-item-description {
        opacity: 0.9;
        font-size: 14px;
        line-height: 1.5;
    }
    
    /* Call to Action */
    .cta-section {
        background: linear-gradient(135deg, rgba(44, 95, 126, 0.95), rgba(90, 159, 212, 0.95));
        color: white;
        border-radius: 15px;
        padding: 60px 40px;
        margin: 50px 0;
        text-align: center;
        position: relative;
        overflow: hidden;
    }
    
    .cta-section::before {
        content: "";
        position: absolute;
        top: -50%;
        right: -50%;
        width: 100%;
        height: 100%;
        background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
        animation: float 6s ease-in-out infinite;
    }
    
    @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(180deg); }
    }
    
    .cta-content {
        position: relative;
        z-index: 2;
    }
    
    .cta-title {
        font-size: 2.5rem;
        margin-bottom: 20px;
        font-weight: 700;
    }
    
    .cta-description {
        font-size: 1.2rem;
        margin-bottom: 35px;
        max-width: 600px;
        margin-left: auto;
        margin-right: auto;
        opacity: 0.95;
    }
    
    .cta-buttons-section {
        display: flex;
        gap: 20px;
        justify-content: center;
        flex-wrap: wrap;
    }
    
    .btn-large {
        padding: 15px 35px;
        border-radius: 8px;
        text-decoration: none;
        font-weight: 700;
        font-size: 16px;
        transition: all 0.3s ease;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    }
    
    .btn-large.primary {
        background-color: white;
        color: #2c5f7e;
    }
    
    .btn-large.primary:hover {
        background-color: #f8f9fa;
        transform: translateY(-3px);
        box-shadow: 0 8px 25px rgba(0,0,0,0.3);
    }
    
    .btn-large.secondary {
        background-color: #25d366;
        color: white;
    }
    
    .btn-large.secondary:hover {
        background-color: #1da851;
        transform: translateY(-3px);
    }
    
    /* WhatsApp Floating Button */
    .whatsapp-float {
        position: fixed;
        bottom: 25px;
        right: 25px;
        background-color: #25d366;
        color: white;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        font-size: 28px;
        box-shadow: 0 5px 20px rgba(37, 211, 102, 0.5);
        z-index: 1000;
        transition: all 0.3s ease;
    }
    
    .whatsapp-float:hover {
        transform: scale(1.1);
        box-shadow: 0 8px 30px rgba(37, 211, 102, 0.6);
    }
    
    /* Mobile Responsive */
    @media (max-width: 768px) {
        .nav-menu {
            display: none;
        }
        
        .hero-title {
            font-size: 2.5rem;
        }
        
        .hero-subtitle {
            font-size: 1.1rem;
        }
        
        .hero-highlights {
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
        }
        
        .pain-grid {
            grid-template-columns: 1fr;
        }
        
        .solutions-grid {
            grid-template-columns: 1fr;
        }
        
        .comparison-row {
            grid-template-columns: 1fr;
            text-align: center;
        }
        
        .comparison-cell.feature {
            text-align: center;
            justify-content: center;
        }
        
        .trust-grid {
            grid-template-columns: 1fr;
        }
        
        .cta-buttons-section {
            flex-direction: column;
            align-items: center;
        }
    }
    
    @media (max-width: 480px) {
        .hero-title {
            font-size: 2rem;
        }
        
        .section-title {
            font-size: 2rem;
        }
        
        .hero-highlights {
            grid-template-columns: 1fr;
        }
    }
`;

if (typeof document !== 'undefined') {
	const styleSheet = document.createElement('style');
	styleSheet.textContent = styles;
	document.head.appendChild(styleSheet);
}

export default function WhyChooseIdam() {
	return(
	    <main className="main-content">
	        <div className="breadcrumb">
	            <a href="/">Home</a> / Why Choose IDAM
	        </div>

	        <div className="hero-section">
	            <h1 className="hero-title">Why Choose IDAM?</h1>
	            <p className="hero-subtitle">
	                The only real estate platform that combines <strong>tech-first solutions</strong>, <strong>legal verification</strong>, 
	                <strong>franchise opportunities</strong>, and <strong>40+ years of industry wisdom</strong> to deliver speed, simplicity, and trust.
	            </p>
	            
	            <div className="hero-highlights">
	                <div className="highlight-item">
	                    <span className="highlight-icon">🔒</span>
	                    <div className="highlight-text">Legal Safety First</div>
	                </div>
	                <div className="highlight-item">
	                    <span className="highlight-icon">🏢</span>
	                    <div className="highlight-text">Franchise-First Model</div>
	                </div>
	                <div className="highlight-item">
	                    <span className="highlight-icon">💻</span>
	                    <div className="highlight-text">Tech-Powered Platform</div>
	                </div>
	                <div className="highlight-item">
	                    <span className="highlight-icon">🤝</span>
	                    <div className="highlight-text">Trust & Transparency</div>
	                </div>
	            </div>
	        </div>

	        <div className="pain-points-section">
	            <h2 className="section-title">We Solve Real Estate's Biggest Problems</h2>
	            <p className="pain-intro">
	                Traditional real estate transactions are plagued with challenges that cost time, money, and peace of mind. 
	                IDAM addresses these pain points head-on with systematic solutions.
	            </p>
	            
	            <div className="pain-grid">
	                <div className="pain-card">
	                    <span className="pain-icon">⚖️</span>
	                    <h3 className="pain-title">Legal Confusion & Fraud</h3>
	                    <p className="pain-description">
	                        Property buyers and sellers face complex legal documentation, title verification issues, and risk of fraud from unverified properties.
	                    </p>
	                    <div className="pain-examples">
	                        <strong>Common Issues:</strong>
	                        <ul>
	                            <li>Fake property documents</li>
	                            <li>Title disputes and unclear ownership</li>
	                            <li>Hidden legal liabilities</li>
	                            <li>Fraudulent broker practices</li>
	                        </ul>
	                    </div>
	                </div>
	                
	                <div className="pain-card">
	                    <span className="pain-icon">💼</span>
	                    <h3 className="pain-title">No System, No Brand, No Income</h3>
	                    <p className="pain-description">
	                        Independent brokers and entrepreneurs struggle without established systems, brand recognition, or consistent income streams.
	                    </p>
	                    <div className="pain-examples">
	                        <strong>Common Issues:</strong>
	                        <ul>
	                            <li>Lack of professional CRM tools</li>
	                            <li>No brand credibility or trust</li>
	                            <li>Inconsistent lead generation</li>
	                            <li>Limited business growth potential</li>
	                        </ul>
	                    </div>
	                </div>
	                
	                <div className="pain-card">
	                    <span className="pain-icon">👁️</span>
	                    <h3 className="pain-title">No Visibility, One-Time Work</h3>
	                    <p className="pain-description">
	                        Service providers like builders, lawyers, and surveyors struggle with limited visibility and depend on one-time projects without recurring opportunities.
	                    </p>
	                    <div className="pain-examples">
	                        <strong>Common Issues:</strong>
	                        <ul>
	                            <li>Limited market visibility</li>
	                            <li>Irregular project flow</li>
	                            <li>No professional verification</li>
	                            <li>Lack of systematic client acquisition</li>
	                        </ul>
	                    </div>
	                </div>
	                
	                <div className="pain-card">
	                    <span className="pain-icon">🏛️</span>
	                    <h3 className="pain-title">No Local Execution, Compliance Risk</h3>
	                    <p className="pain-description">
	                        Corporations and institutions face challenges with multi-location property requirements and compliance management across different regions.
	                    </p>
	                    <div className="pain-examples">
	                        <strong>Common Issues:</strong>
	                        <ul>
	                            <li>Inconsistent service quality across locations</li>
	                            <li>Complex compliance requirements</li>
	                            <li>No standardized processes</li>
	                            <li>Limited local market expertise</li>
	                        </ul>
	                    </div>
	                </div>
	            </div>
	        </div>

	        <div className="solutions-section">
	            <div className="solutions-intro">
	                <h2 className="solutions-title">How IDAM Solves These Problems</h2>
	                <p className="solutions-subtitle">
	                    Our integrated, tech-enabled ecosystem addresses every pain point with systematic solutions 
	                    tailored for each segment of the real estate market.
	                </p>
	            </div>
	            
	            <div className="solutions-grid">
	                <div className="solution-card">
	                    <div className="solution-header">
	                        <span className="solution-icon">🔒</span>
	                        <h3 className="solution-title">Property. Done Right.</h3>
	                    </div>
	                    <p className="solution-tagline">Complete legal safety and verification for all property transactions</p>
	                    <ul className="solution-features">
	                        <li><strong>Verified Properties Only:</strong> Every property undergoes thorough legal verification and title checking</li>
	                        <li><strong>Digital Document Locker:</strong> Secure cloud storage for all property documents with bank-level security</li>
	                        <li><strong>Anti-Fraud Protection:</strong> Multi-layer verification prevents fake listings and fraudulent transactions</li>
	                        <li><strong>Rental Agreement Services:</strong> Legal template creation and digital agreement management</li>
	                        <li><strong>CRM Support:</strong> Complete transaction tracking and customer relationship management</li>
	                    </ul>
	                </div>
	                
	                <div className="solution-card">
	                    <div className="solution-header">
	                        <span className="solution-icon">🏢</span>
	                        <h3 className="solution-title">Your Business. Our System.</h3>
	                    </div>
	                    <p className="solution-tagline">Complete franchise ecosystem with proven business model</p>
	                    <ul className="solution-features">
	                        <li><strong>Business-in-a-Box:</strong> Complete franchise package with established processes and tools</li>
	                        <li><strong>Advanced CRM Tools:</strong> Professional customer relationship management and lead tracking systems</li>
	                        <li><strong>Brand Recognition:</strong> Leverage IDAM's trusted brand and marketing support</li>
	                        <li><strong>Recurring Income Streams:</strong> Multiple revenue sources through transactions, rentals, and services</li>
	                        <li><strong>Training & Support:</strong> Ongoing business development and operational guidance</li>
	                    </ul>
	                </div>
	                
	                <div className="solution-card">
	                    <div className="solution-header">
	                        <span className="solution-icon">⭐</span>
	                        <h3 className="solution-title">Earn More. Get Recognized.</h3>
	                    </div>
	                    <p className="solution-tagline">Verified partner network with regular project opportunities</p>
	                    <ul className="solution-features">
	                        <li><strong>Verified Vendor Status:</strong> Professional recognition and credibility through verification process</li>
	                        <li><strong>Regular Project Pipeline:</strong> Consistent opportunities through our extensive property network</li>
	                        <li><strong>CRM Integration:</strong> Project management and client communication through integrated systems</li>
	                        <li><strong>Quality Certification:</strong> Professional standards and performance tracking</li>
	                        <li><strong>Network Expansion:</strong> Access to broader market and collaboration opportunities</li>
	                    </ul>
	                </div>
	                
	                <div className="solution-card">
	                    <div className="solution-header">
	                        <span className="solution-icon">🏛️</span>
	                        <h3 className="solution-title">Enterprise Real Estate Execution.</h3>
	                    </div>
	                    <p className="solution-tagline">Multi-location SLA delivery with compliance management</p>
	                    <ul className="solution-features">
	                        <li><strong>Multi-Location SLA:</strong> Guaranteed service level agreements across multiple cities with standardized processes</li>
	                        <li><strong>Compliance Dashboard:</strong> Real-time monitoring and reporting for regulatory compliance and risk management</li>
	                        <li><strong>Dedicated Account Management:</strong> Specialized support for enterprise requirements and complex projects</li>
	                        <li><strong>Standardized Processes:</strong> Consistent service delivery across all locations and project types</li>
	                        <li><strong>Risk Management:</strong> Comprehensive legal verification and compliance support</li>
	                    </ul>
	                </div>
	            </div>
	        </div>

	        <div className="comparison-section">
	            <h2 className="section-title">Traditional vs IDAM: See the Difference</h2>
	            <div className="comparison-table">
	                <div className="comparison-row header-row">
	                    <div className="comparison-cell">Features</div>
	                    <div className="comparison-cell traditional">Traditional Approach</div>
	                    <div className="comparison-cell idam">IDAM Platform</div>
	                </div>
	                
	                <div className="comparison-row">
	                    <div className="comparison-cell feature">Legal Verification</div>
	                    <div className="comparison-cell traditional">❌ Manual, time-consuming, unreliable</div>
	                    <div className="comparison-cell idam">✅ Automated verification with legal experts</div>
	                </div>
	                
	                <div className="comparison-row">
	                    <div className="comparison-cell feature">Fraud Protection</div>
	                    <div className="comparison-cell traditional">❌ Limited protection, buyer beware</div>
	                    <div className="comparison-cell idam">✅ Multi-layer fraud prevention system</div>
	                </div>
	                
	                <div className="comparison-row">
	                    <div className="comparison-cell feature">Document Management</div>
	                    <div className="comparison-cell traditional">❌ Physical papers, risk of loss</div>
	                    <div className="comparison-cell idam">✅ Digital locker with cloud backup</div>
	                </div>
	                
	                <div className="comparison-row">
	                    <div className="comparison-cell feature">Business Support</div>
	                    <div className="comparison-cell traditional">❌ Individual efforts, no system</div>
	                    <div className="comparison-cell idam">✅ Complete franchise system with CRM</div>
	                </div>
	                
	                <div className="comparison-row">
	                    <div className="comparison-cell feature">Technology Integration</div>
	                    <div className="comparison-cell traditional">❌ Basic listings, no automation</div>
	                    <div className="comparison-cell idam">✅ Advanced CRM, WhatsApp automation</div>
	                </div>
	                
	                <div className="comparison-row">
	                    <div className="comparison-cell feature">Service Provider Network</div>
	                    <div className="comparison-cell traditional">❌ Unverified, inconsistent quality</div>
	                    <div className="comparison-cell idam">✅ Verified partners with quality standards</div>
	                </div>
	                
	                <div className="comparison-row">
	                    <div className="comparison-cell feature">Enterprise Solutions</div>
	                    <div className="comparison-cell traditional">❌ No standardized processes</div>
	                    <div className="comparison-cell idam">✅ Multi-location SLA with compliance</div>
	                </div>
	            </div>
	        </div>

	        <div className="trust-section">
	            <h2 className="section-title" style={{
	            	color: 'white',
	            	textAlign: 'center',
	            }}>
	            	Built on Trust & Transparency
	            </h2>
	            <div className="trust-grid">
	                <div className="trust-item">
	                    <span className="trust-item-icon">🏆</span>
	                    <h4 className="trust-item-title">40+ Years Experience</h4>
	                    <p className="trust-item-description">Legacy industry wisdom combined with modern execution and technology innovation</p>
	                </div>
	                
	                <div className="trust-item">
	                    <span className="trust-item-icon">⚖️</span>
	                    <h4 className="trust-item-title">Legal Compliance</h4>
	                    <p className="trust-item-description">Complete regulatory compliance with transparent processes and documented procedures</p>
	                </div>
	                
	                <div className="trust-item">
	                    <span className="trust-item-icon">🔒</span>
	                    <h4 className="trust-item-title">Data Security</h4>
	                    <p className="trust-item-description">Bank-level security for all documents and transactions with confidentiality guarantees</p>
	                </div>
	                
	                <div className="trust-item">
	                    <span className="trust-item-icon">🤝</span>
	                    <h4 className="trust-item-title">Integrity & Ethics</h4>
	                    <p className="trust-item-description">We stand by what's right with clear pricing and ethical conduct in every transaction</p>
	                </div>
	                
	                <div className="trust-item">
	                    <span className="trust-item-icon">📱</span>
	                    <h4 className="trust-item-title">Technology Partnership</h4>
	                    <p className="trust-item-description">Advanced CRM, automation tools, and digital solutions for streamlined operations</p>
	                </div>
	                
	                <div className="trust-item">
	                    <span className="trust-item-icon">🎯</span>
	                    <h4 className="trust-item-title">Customer-Centricity</h4>
	                    <p className="trust-item-description">Peace of mind and satisfaction at every touchpoint with dedicated support</p>
	                </div>
	            </div>
	        </div>

	        <div className="cta-section">
	            <div className="cta-content">
	                <h2 className="cta-title">Experience the IDAM Difference</h2>
	                <p className="cta-description">
	                    Join thousands who have chosen IDAM for safe, systematic, and successful real estate transactions. 
	                    Whether you're buying, selling, or building a business, we're here to make it happen.
	                </p>
	                <div className="cta-buttons-section">
	                    <a href="/contact" className="btn-large primary">Get Started Today</a>
	                    <a href="https://wa.me/916210999222" className="btn-large secondary">WhatsApp Us</a>
	                </div>
	            </div>
	        </div>
	    </main>
	)
}