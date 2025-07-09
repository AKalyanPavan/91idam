// import Header from '@/components/header.js'
// import Fold1 from './fold1.js'

// export default function Homepage() {
//  return(
//    <>
//      <Header />
//      <Fold1 />
//    </>
//  )
// }

'use client';
import React, { useState } from 'react';

/* CSS Styles */
const styles = `
  /* Reset and base styles */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Montserrat', 'Mongolian Baiti', system-ui, -apple-system, sans-serif;
    line-height: 1.6;
    color: #1E2022;
    background-color: #ffffff;
  }

  .app {
    min-height: 100vh;
    overflow-x: hidden;
  }

  /* Header Styles */
  .header {
    position: relative;
    width: 100%;
    padding: 18px 0;
    background-color: #DFE0D0;
    border-bottom: 1px solid rgba(151, 162, 165, 0.125);
  }

  .header-container {
    max-width: 1440px;
    margin: 0 auto;
    padding: 0 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo-image {
    height: 60px;
    width: auto;
    object-fit: contain;
  }

  .navigation {
    flex: 1;
    max-width: 980px;
    margin-left: auto;
  }

  .nav-list {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 32px;
    list-style: none;
  }

  .nav-link {
    font-family: 'Montserrat', sans-serif;
    font-weight: 700;
    font-size: 16px;
    color: #1E2022;
    text-decoration: none;
    transition: color 0.3s ease;
  }

  .nav-link--for-buyers {
    color: #B5932A;
  }

  .nav-link:hover {
    color: #B5932A;
  }

  .nav-button {
    background-color: #17596D;
    color: white;
    border: 1px solid #17596D;
    border-radius: 5px;
    padding: 12px 20px;
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .nav-button:hover {
    background-color: #145561;
    transform: translateY(-1px);
  }

  /* Hero Section */
  .hero-section {
    position: relative;
    background: linear-gradient(135deg, rgba(23, 89, 109, 0.05) 0%, rgba(181, 147, 42, 0.05) 100%);
    padding: 40px 0;
    min-height: 640px;
    display: flex;
    align-items: center;
  }

  .hero-content {
    max-width: 1440px;
    margin: 0 auto;
    padding: 0 24px;
    display: grid;
    grid-template-columns: 1fr 558px;
    gap: 48px;
    align-items: center;
  }

  .hero-main-image {
    width: 558px;
    height: 558px;
    object-fit: cover;
    border-radius: 8px;
  }

  .hero-text-section {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .hero-heading {
    position: relative;
  }

  .hero-title {
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    font-size: 56px;
    line-height: 1.2;
    color: #1E2022;
    margin-bottom: 16px;
  }

  .hero-subtitle-overlay {
    position: relative;
    background: linear-gradient(90deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.8) 100%);
    padding: 8px 16px;
    border-radius: 8px;
    display: inline-block;
  }

  .hero-subtitle {
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    font-size: 56px;
    line-height: 1.2;
    color: #B5932A;
  }

  /* Search Form */
  .search-form {
    background: white;
    border-radius: 8px;
    padding: 24px;
    box-shadow: 0 6px 24px rgba(141, 154, 164, 0.125);
  }

  .search-container {
    display: flex;
    background: white;
    border-radius: 5px;
    overflow: hidden;
    border: 1px solid #E7E9EA;
    margin-bottom: 16px;
  }

  .search-input-group {
    flex: 1;
    display: flex;
    align-items: center;
  }

  .search-type {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 16px 20px;
    border-right: 1px solid #ECF0F1;
    min-width: 120px;
  }

  .search-type-text {
    font-family: 'Mongolian Baiti', serif;
    font-size: 16px;
    color: #5A5D5F;
  }

  .location-input {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px 20px;
  }

  .location-search-input {
    flex: 1;
    border: none;
    outline: none;
    font-family: 'Mongolian Baiti', serif;
    font-size: 16px;
    color: #5A5D5F;
  }

  .location-search-input::placeholder {
    color: #5A5D5F;
  }

  .search-button {
    background-color: #17596D;
    color: white;
    border: none;
    padding: 16px 24px;
    font-family: 'Mongolian Baiti', serif;
    font-size: 16px;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s ease;
  }

  .search-button:hover {
    background-color: #145561;
  }

  .property-types {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .property-type {
    font-family: 'Mongolian Baiti', serif;
    font-size: 16px;
    color: #000000;
    font-weight: 400;
  }

  .filter-tags {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .filter-tag {
    font-family: 'Mongolian Baiti', serif;
    font-size: 14px;
    color: #626466;
    padding: 8px 16px;
    border: 1px solid rgba(141, 154, 164, 0.125);
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .filter-tag--active {
    background-color: rgba(23, 89, 109, 0.1);
    border-color: #17596D;
    color: #000000;
  }

  .additional-filters {
    display: flex;
    gap: 24px;
  }

  .filter-group {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    border: 1px solid rgba(141, 154, 164, 0.125);
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .filter-group:hover {
    border-color: #17596D;
  }

  .filter-text {
    font-family: 'Mongolian Baiti', serif;
    font-size: 14px;
    color: #626466;
  }

  /* Property Listings */
  .property-listings, .additional-listings {
    padding: 80px 0;
    max-width: 1440px;
    margin: 0 auto;
    padding-left: 24px;
    padding-right: 24px;
  }

  .section-header {
    text-align: center;
    margin-bottom: 48px;
  }

  .section-title {
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    font-size: 28px;
    line-height: 1.2;
    color: #1E2022;
    margin-bottom: 8px;
  }

  .section-subtitle {
    font-family: 'Mongolian Baiti', serif;
    font-size: 16px;
    color: #677888;
  }

  .section-overline {
    font-family: 'Mongolian Baiti', serif;
    font-size: 16px;
    color: #677888;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 16px;
  }

  .properties-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(356px, 1fr));
    gap: 32px;
  }

  .property-card {
    background: white;
    border-radius: 8px;
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .property-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 32px rgba(141, 154, 164, 0.15);
  }

  .property-image {
    width: 100%;
    height: 237px;
    overflow: hidden;
  }

  .property-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .property-info {
    padding: 24px;
  }

  .property-title {
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    font-size: 18px;
    color: #1E2022;
    margin-bottom: 12px;
  }

  .property-price {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .price-range {
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    font-size: 16px;
    color: #B5932A;
  }

  /* Places Section */
  .places-section {
    padding: 80px 0;
    max-width: 1440px;
    margin: 0 auto;
    padding-left: 24px;
    padding-right: 24px;
  }

  .property-type-filters {
    display: flex;
    justify-content: center;
    gap: 16px;
    margin-top: 24px;
  }

  .filter-button {
    padding: 8px 24px;
    border: 1px solid rgba(141, 154, 164, 0.125);
    border-radius: 5px;
    background: white;
    font-family: 'Mongolian Baiti', serif;
    font-size: 16px;
    color: #1E2022;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .filter-button--active {
    background-color: rgba(23, 89, 109, 0.1);
    border-color: #17596D;
  }

  .filter-button:hover {
    border-color: #17596D;
  }

  .places-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(356px, 1fr));
    gap: 32px;
    margin-top: 48px;
  }

  .place-card {
    background: white;
    border-radius: 8px;
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .place-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 32px rgba(141, 154, 164, 0.15);
  }

  .place-image {
    width: 100%;
    height: 237px;
    overflow: hidden;
  }

  .place-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .place-info {
    padding: 24px;
  }

  .place-name {
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    font-size: 18px;
    color: #1E2022;
  }

  /* Seller Types Section */
  .seller-types-section {
    position: relative;
    padding: 80px 0;
    min-height: 490px;
    overflow: hidden;
  }

  .seller-background-image {
    position: absolute;
    top: 0;
    right: 0;
    width: 50%;
    height: 100%;
    z-index: 1;
  }

  .background-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .seller-content {
    position: relative;
    z-index: 2;
    max-width: 1440px;
    margin: 0 auto;
    padding: 0 24px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 48px;
    align-items: center;
  }

  .seller-text {
    color: white;
  }

  .seller-title {
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    font-size: 40px;
    line-height: 1.2;
    margin-bottom: 16px;
  }

  .seller-subtitle {
    font-family: 'Mongolian Baiti', serif;
    font-size: 16px;
    margin-bottom: 32px;
  }

  .seller-heading {
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    font-size: 40px;
    line-height: 1.2;
    color: #000000;
    margin-bottom: 16px;
  }

  .seller-description {
    font-family: 'Mongolian Baiti', serif;
    font-size: 16px;
    color: #1E2022;
  }

  .seller-cards {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .seller-card {
    background: white;
    padding: 32px;
    border-radius: 8px;
    box-shadow: 0 6px 24px rgba(141, 154, 164, 0.125);
    display: flex;
    align-items: center;
    gap: 24px;
    transition: transform 0.3s ease;
  }

  .seller-card:hover {
    transform: translateY(-2px);
  }

  .seller-icon {
    width: 60px;
    height: 60px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .seller-card-title {
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    font-size: 18px;
    color: #1E2022;
    margin-bottom: 8px;
  }

  .seller-card-properties {
    font-family: 'Mongolian Baiti', serif;
    font-size: 16px;
    color: #677888;
  }

  /* CTA Section */
  .cta-section {
    position: relative;
    padding: 80px 0;
    overflow: hidden;
  }

  .cta-background {
    position: absolute;
    top: 0;
    right: 0;
    width: 60%;
    height: 100%;
    z-index: 1;
  }

  .cta-bg-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .cta-content {
    position: relative;
    z-index: 2;
    max-width: 1440px;
    margin: 0 auto;
    padding: 0 24px;
    display: grid;
    grid-template-columns: 1fr 356px;
    gap: 48px;
    align-items: center;
  }

  .cta-subtitle {
    font-family: 'Mongolian Baiti', serif;
    font-size: 16px;
    color: #677888;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 16px;
  }

  .cta-title {
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    font-size: 28px;
    line-height: 1.2;
    color: #1E2022;
    margin-bottom: 24px;
  }

  .cta-card {
    background: white;
    padding: 48px 32px;
    border-radius: 8px;
    box-shadow: 0 6px 24px rgba(141, 154, 164, 0.125);
    text-align: center;
  }

  .cta-card-subtitle {
    font-family: 'Mongolian Baiti', serif;
    font-size: 16px;
    color: #677888;
    margin-bottom: 16px;
  }

  .cta-card-title {
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    font-size: 21px;
    line-height: 1.2;
    color: #1E2022;
    margin-bottom: 16px;
  }

  .cta-card-description {
    font-family: 'Mongolian Baiti', serif;
    font-size: 15.8px;
    color: #677888;
    margin-bottom: 32px;
  }

  .cta-button {
    background-color: #17596D;
    color: white;
    border: none;
    padding: 16px 32px;
    border-radius: 5px;
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    font-size: 16px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    margin: 0 auto;
    transition: background-color 0.3s ease;
  }

  .cta-button:hover {
    background-color: #145561;
  }

  /* Cities Section */
  .cities-section {
    padding: 80px 0;
    max-width: 1440px;
    margin: 0 auto;
    padding-left: 24px;
    padding-right: 24px;
  }

  .cities-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 32px;
    margin-top: 48px;
  }

  .city-card {
    background: white;
    border-radius: 8px;
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .city-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 32px rgba(141, 154, 164, 0.15);
  }

  .city-image {
    width: 100%;
    height: 240px;
    overflow: hidden;
  }

  .city-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .city-info {
    padding: 24px;
  }

  .city-name {
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    font-size: 21px;
    color: #1E2022;
    margin-bottom: 8px;
  }

  .city-properties {
    font-family: 'Mongolian Baiti', serif;
    font-size: 16px;
    color: #1E2022;
  }

  /* Footer */
  .footer {
    padding: 64px 0 32px;
    color: white;
  }

  .footer-container {
    max-width: 1440px;
    margin: 0 auto;
    padding: 0 24px;
  }

  .footer-logo {
    margin-bottom: 48px;
  }

  .footer-logo-image {
    height: 64px;
    width: auto;
    object-fit: contain;
  }

  .footer-columns {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 48px;
    margin-bottom: 48px;
  }

  .footer-heading {
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    font-size: 16px;
    margin-bottom: 24px;
  }

  .footer-links {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .footer-link {
    font-family: 'Mongolian Baiti', serif;
    font-size: 14px;
    color: #F7FBFF;
    text-decoration: none;
    transition: color 0.3s ease;
  }

  .footer-link:hover {
    color: #B5932A;
  }

  .contact-info {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .contact-item {
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    color: #F7FBFF;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .social-section {
    margin-top: 32px;
  }

  .social-links {
    display: flex;
    gap: 12px;
    margin-top: 16px;
  }

  .social-link {
    width: 28px;
    height: 28px;
    background-color: rgba(246, 251, 255, 0.1);
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #F7FBFF;
    transition: background-color 0.3s ease;
  }

  .social-link:hover {
    background-color: rgba(246, 251, 255, 0.2);
  }

  .footer-divider {
    height: 1px;
    background-color: rgba(255, 255, 255, 0.1);
  }

  /* Responsive Design */
  @media (max-width: 1024px) {
    .hero-content {
      grid-template-columns: 1fr;
      text-align: center;
    }

    .hero-main-image {
      max-width: 100%;
      height: auto;
    }

    .seller-content,
    .cta-content {
      grid-template-columns: 1fr;
      gap: 32px;
    }

    .cities-grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .footer-columns {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media (max-width: 768px) {
    .header-container {
      flex-direction: column;
      gap: 16px;
    }

    .nav-list {
      flex-wrap: wrap;
      justify-content: center;
      gap: 16px;
    }

    .hero-title,
    .hero-subtitle {
      font-size: 36px;
    }

    .section-title {
      font-size: 24px;
    }

    .properties-grid,
    .places-grid {
      grid-template-columns: 1fr;
    }

    .cities-grid {
      grid-template-columns: 1fr;
    }

    .footer-columns {
      grid-template-columns: 1fr;
      gap: 32px;
    }

    .seller-cards {
      gap: 16px;
    }

    .seller-card {
      flex-direction: column;
      text-align: center;
    }
  }

  @media (max-width: 480px) {
    .hero-title,
    .hero-subtitle {
      font-size: 28px;
    }

    .search-form {
      padding: 16px;
    }

    .search-container {
      flex-direction: column;
    }

    .search-input-group {
      flex-direction: column;
    }

    .search-type {
      border-right: none;
      border-bottom: 1px solid #ECF0F1;
    }

    .additional-filters {
      flex-direction: column;
      gap: 12px;
    }
  }
`;

// Inject styles into document head
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

// Image URL mappings based on reference IDs
const imageMap = {
  '147eaf877fa812a28db7009ccbf10e422c325f23': 'https://raw.githubusercontent.com/Ravigandhiarul/images/main/147eaf877fa812a28db7009ccbf10e422c325f23.png',
  '275a0daee60e09660ef4b047a9f00de52101fe0a': 'https://raw.githubusercontent.com/Ravigandhiarul/images/main/275a0daee60e09660ef4b047a9f00de52101fe0a.png',
  '3920cf718b6b33916c6db37b337df8dfe33265d1': 'https://raw.githubusercontent.com/Ravigandhiarul/images/main/3920cf718b6b33916c6db37b337df8dfe33265d1.png',
  '3c8da4da6576b1c86a577e46e4b20a6b5165fb4b': 'https://raw.githubusercontent.com/Ravigandhiarul/images/main/3c8da4da6576b1c86a577e46e4b20a6b5165fb4b.png',
  '3fbe7763a3e42e34a5e742c4f59cf718f7040bf6': 'https://raw.githubusercontent.com/Ravigandhiarul/images/main/3fbe7763a3e42e34a5e742c4f59cf718f7040bf6.png',
  '45da984af4d799aba2662b8c45e1fa16512f6a44': 'https://raw.githubusercontent.com/Ravigandhiarul/images/main/45da984af4d799aba2662b8c45e1fa16512f6a44.png',
  '477fd50e4b50e960f766a5813143a23a276c6e6b': 'https://raw.githubusercontent.com/Ravigandhiarul/images/main/477fd50e4b50e960f766a5813143a23a276c6e6b.png',
  '486947993cf624e9ad6984e35c0810a5b329f3b4': 'https://raw.githubusercontent.com/Ravigandhiarul/images/main/486947993cf624e9ad6984e35c0810a5b329f3b4.png',
  '49be453f52343aa5a0e84d763a4d6e20c480f1ec': 'https://raw.githubusercontent.com/Ravigandhiarul/images/main/49be453f52343aa5a0e84d763a4d6e20c480f1ec.png',
  '4e0a7866be1adb71579d52e7c5dc5c0672577e0c': 'https://raw.githubusercontent.com/Ravigandhiarul/images/main/4e0a7866be1adb71579d52e7c5dc5c0672577e0c.png',
  '610f374aa84820f15a2b30c0d21290a5815c4121': 'https://raw.githubusercontent.com/Ravigandhiarul/images/main/610f374aa84820f15a2b30c0d21290a5815c4121.png',
  '7e47f3ecffd0d65076e64a6b1f1f12ca0a3c936d': 'https://raw.githubusercontent.com/Ravigandhiarul/images/main/7e47f3ecffd0d65076e64a6b1f1f12ca0a3c936d.png',
  '948ac9ea38441b7910b16d13c3a4e68d0aed76f5': 'https://raw.githubusercontent.com/Ravigandhiarul/images/main/948ac9ea38441b7910b16d13c3a4e68d0aed76f5.png',
  '9d8619d8551e775f7b16a6ecd29abf47a8fb652f': 'https://raw.githubusercontent.com/Ravigandhiarul/images/main/9d8619d8551e775f7b16a6ecd29abf47a8fb652f.png',
  '9e077fcb22a2ee4dcd958780ac07a35f86284c44': 'https://raw.githubusercontent.com/Ravigandhiarul/images/main/9e077fcb22a2ee4dcd958780ac07a35f86284c44.png',
  'a75dff7e5e33730f25de81b8cbc09716356220c5': 'https://raw.githubusercontent.com/Ravigandhiarul/images/main/a75dff7e5e33730f25de81b8cbc09716356220c5.png',
  'a913dfa5178be853c718aca9445fbc7040e3712b': 'https://raw.githubusercontent.com/Ravigandhiarul/images/main/a913dfa5178be853c718aca9445fbc7040e3712b.png',
  'b5239a76b6712c05e37b536b8c3bb8e5f3591146': 'https://raw.githubusercontent.com/Ravigandhiarul/images/main/b5239a76b6712c05e37b536b8c3bb8e5f3591146.png',
  'c93c67184ff554ca37fb7cd91f6cd073d22e33e2': 'https://raw.githubusercontent.com/Ravigandhiarul/images/main/c93c67184ff554ca37fb7cd91f6cd073d22e33e2.png',
  'dbf399a8332532b32ad9b3f557ec48ce54958c55': 'https://raw.githubusercontent.com/Ravigandhiarul/images/main/dbf399a8332532b32ad9b3f557ec48ce54958c55.png',
  'dcae0469056a0c4d221aaaf4e520de25d84a7f31': 'https://raw.githubusercontent.com/Ravigandhiarul/images/main/dcae0469056a0c4d221aaaf4e520de25d84a7f31.png'
};

// Header Component
const Header = () => {
  return (
    <header className="header" style={{ backgroundColor: '#DFE0D0' }}>
      <div className="header-container">
        <div className="logo">
          <img 
            src={imageMap['dbf399a8332532b32ad9b3f557ec48ce54958c55']} 
            alt="91 IDAM Logo" 
            className="logo-image"
          />
        </div>
        <nav className="navigation">
          <ul className="nav-list">
            <li className="nav-item">
              <a href="#" className="nav-link nav-link--for-buyers">For Buyers</a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">For Owners</a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">For Dealers/Builders</a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link">Contact</a>
            </li>
            <li className="nav-item">
              <button className="nav-button">Start Selling</button>
            </li>
            <li className="nav-item">
              <button className="nav-button">Start Buying</button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

// Hero Section Component
const HeroSection = () => {
  const [location, setLocation] = useState('');
  
  return (
    <section className="hero-section">
      <div className="hero-background"></div>
      <div className="hero-content">
        <div className="hero-image">
          <img 
            src={imageMap['49be453f52343aa5a0e84d763a4d6e20c480f1ec']} 
            alt="91 IDAM Home" 
            className="hero-main-image"
          />
        </div>
        <div className="hero-text-section">
          <div className="hero-heading">
            <h1 className="hero-title">Land you&apos;ll love.</h1>
            <div className="hero-subtitle-overlay">
              <h2 className="hero-subtitle">A place to start.</h2>
            </div>
          </div>
          <div className="search-form">
            <div className="search-container">
              <div className="search-input-group">
                <div className="search-type">
                  <span className="search-type-text">Residential</span>
                  <div className="search-dropdown-icon">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M4 6L8 10L12 6" stroke="#677788" strokeWidth="1"/>
                    </svg>
                  </div>
                </div>
                <div className="search-divider"></div>
                <div className="location-input">
                  <div className="location-icon">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M8 2C5.79 2 4 3.79 4 6C4 9.25 8 14 8 14S12 9.25 12 6C12 3.79 10.21 2 8 2Z" stroke="#8C99A6" strokeWidth="1"/>
                    </svg>
                  </div>
                  <input 
                    type="text" 
                    placeholder="Enter location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="location-search-input"
                  />
                </div>
              </div>
              <button className="search-button">Search</button>
            </div>
            <div className="property-types">
              <span className="property-type">Plots/Land</span>
              <div className="filter-tags">
                <span className="filter-tag filter-tag--active">Residential Plots/Land</span>
                <div className="filter-tag-indicator"></div>
                <span className="filter-tag">Commercial Plots/Land</span>
              </div>
              <div className="additional-filters">
                <div className="filter-group">
                  <div className="filter-icon">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M2 4H14M2 8H14M2 12H14" stroke="currentColor" strokeWidth="1"/>
                    </svg>
                  </div>
                  <span className="filter-text">Budget</span>
                </div>
                <div className="filter-group">
                  <div className="filter-icon">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M2 4H14M2 8H14M2 12H14" stroke="currentColor" strokeWidth="1"/>
                    </svg>
                  </div>
                  <span className="filter-text">Area</span>
                </div>
                <div className="filter-group">
                  <div className="filter-icon">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M2 4H14M2 8H14M2 12H14" stroke="currentColor" strokeWidth="1"/>
                    </svg>
                  </div>
                  <span className="filter-text">Posted By</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Property Card Component
const PropertyCard = ({ image, title, price }) => {
  return (
    <div className="property-card">
      <div className="property-image">
        <img src={image} alt={title} loading="lazy" />
      </div>
      <div className="property-info">
        <h3 className="property-title">{title}</h3>
        <div className="property-price">
          <span className="price-range">{price}</span>
          <div className="price-icons">
            <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
              <path d="M7 2L2 7L7 12L12 7L7 2Z" fill="#B593A7"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

// Property Listings Section
const PropertyListings = () => {
  const properties = [
    {
      id: 1,
      image: imageMap['275a0daee60e09660ef4b047a9f00de52101fe0a'],
      title: 'Project name',
      price: '7.95L - 96.59L',
      location: 'City name'
    },
    {
      id: 2,
      image: imageMap['610f374aa84820f15a2b30c0d21290a5815c4121'],
      title: 'Project name',
      price: '7.95L - 96.59L',
      location: 'City name'
    },
    {
      id: 3,
      image: imageMap['b5239a76b6712c05e37b536b8c3bb8e5f3591146'],
      title: 'Project name',
      price: '7.95L - 96.59L',
      location: 'City name'
    },
    {
      id: 4,
      image: imageMap['b5239a76b6712c05e37b536b8c3bb8e5f3591146'],
      title: 'Project name',
      price: '7.95L - 96.59L',
      location: 'City name'
    }
  ];

  return (
    <section className="property-listings">
      <div className="section-header">
        <h2 className="section-title">Trending Plot/Land Listings</h2>
        <p className="section-subtitle">Discover Plots near you</p>
      </div>
      <div className="properties-grid">
        {properties.map(property => (
          <PropertyCard key={property.id} {...property} />
        ))}
      </div>
    </section>
  );
};

// Places Section
const PlacesSection = () => {
  const places = [
    {
      id: 1,
      image: imageMap['275a0daee60e09660ef4b047a9f00de52101fe0a'],
      name: 'Corner Plots',
      properties: '15,000+ Properties'
    },
    {
      id: 2,
      image: imageMap['610f374aa84820f15a2b30c0d21290a5815c4121'],
      name: 'Plots in Gated Community',
      properties: '15,000+ Properties'
    },
    {
      id: 3,
      image: imageMap['477fd50e4b50e960f766a5813143a23a276c6e6b'],
      name: 'East facing plots',
      properties: '15,000+ Properties'
    },
    {
      id: 4,
      image: imageMap['45da984af4d799aba2662b8c45e1fa16512f6a44'],
      name: 'Plots with Compound wall',
      properties: '15,000+ Properties'
    }
  ];

  return (
    <section className="places-section">
      <div className="section-header">
        <h2 className="section-title">Plots/Land in Places</h2>
        <p className="section-subtitle">Explore Nearby Neighborhoods</p>
        <div className="property-type-filters">
          <button className="filter-button filter-button--active">Residential Plots</button>
          <button className="filter-button">Commercial Plots</button>
        </div>
      </div>
      <div className="places-grid">
        {places.map(place => (
          <div key={place.id} className="place-card">
            <div className="place-image">
              <img src={place.image} alt={place.name} loading="lazy" />
            </div>
            <div className="place-info">
              <h3 className="place-name">{place.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// Seller Types Section
const SellerTypesSection = () => {
  return (
    <section className="seller-types-section" style={{ backgroundColor: '#B5932A' }}>
      <div className="seller-background-image">
        <img 
          src={imageMap['486947993cf624e9ad6984e35c0810a5b329f3b4']} 
          alt="Building Background" 
          className="background-image"
        />
      </div>
      <div className="seller-content">
        <div className="seller-text">
          <h2 className="seller-title">Plots/Land Posted by</h2>
          <p className="seller-subtitle">Browse by Seller Category</p>
          <div className="seller-main-text">
            <h3 className="seller-heading">Choose Who&apos;s Selling</h3>
            <p className="seller-description">Discover Listings You&apos;ll Like</p>
          </div>
        </div>
        <div className="seller-cards">
          <div className="seller-card">
            <div className="seller-icon">
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                <rect width="60" height="60" fill="#17596D"/>
                <path d="M30 15L45 30L30 45L15 30L30 15Z" fill="white"/>
              </svg>
            </div>
            <h4 className="seller-card-title">Dealer</h4>
            <p className="seller-card-properties">3000+ Properties</p>
          </div>
          <div className="seller-card">
            <div className="seller-icon">
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                <circle cx="30" cy="30" r="25" stroke="#17596D" strokeWidth="2" fill="none"/>
                <circle cx="30" cy="30" r="8" fill="#17596D"/>
              </svg>
            </div>
            <h4 className="seller-card-title">Owner</h4>
            <p className="seller-card-properties">3000+ Properties</p>
          </div>
          <div className="seller-card">
            <div className="seller-icon">
              <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                <rect x="15" y="20" width="30" height="25" stroke="#17596D" strokeWidth="2" fill="none"/>
                <path d="M20 35H25V40H20V35Z" fill="#17596D"/>
              </svg>
            </div>
            <h4 className="seller-card-title">Builder</h4>
            <p className="seller-card-properties">3000+ Properties</p>
          </div>
        </div>
      </div>
    </section>
  );
};

// Call to Action Section
const CTASection = () => {
  return (
    <section className="cta-section">
      <div className="cta-background">
        <img 
          src={imageMap['a913dfa5178be853c718aca9445fbc7040e3712b']} 
          alt="Luxury Room Background" 
          className="cta-bg-image"
        />
      </div>
      <div className="cta-content">
        <div className="cta-text">
          <p className="cta-subtitle">DO YOU HAVE LAND FOR SALE?</p>
          <h2 className="cta-title">List Your Land for Sale on<br />91 IDAM</h2>
        </div>
        <div className="cta-card">
          <p className="cta-card-subtitle">ADD YOUR PROPERTY</p>
          <h3 className="cta-card-title">Want to Find Land<br />Buyers?</h3>
          <p className="cta-card-description">Sell out your property—fast & easy</p>
          <button className="cta-button">
            List Your Property Free
            <svg width="6" height="12" viewBox="0 0 6 12" fill="none">
              <path d="M1 1L5 6L1 11" stroke="white" strokeWidth="1"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

// Cities Section
const CitiesSection = () => {
  const cities = [
    {
      id: 1,
      image: imageMap['7e47f3ecffd0d65076e64a6b1f1f12ca0a3c936d'],
      name: 'Delhi',
      properties: '15,000+ Properties'
    },
    {
      id: 2,
      image: imageMap['dcae0469056a0c4d221aaaf4e520de25d84a7f31'],
      name: 'Mumbai',
      properties: '15,000+ Properties'
    },
    {
      id: 3,
      image: imageMap['c93c67184ff554ca37fb7cd91f6cd073d22e33e2'],
      name: 'Bangalore',
      properties: '15,000+ Properties'
    },
    {
      id: 4,
      image: imageMap['a75dff7e5e33730f25de81b8cbc09716356220c5'],
      name: 'Hyderabad',
      properties: '15,000+ Properties'
    },
    {
      id: 5,
      image: imageMap['9e077fcb22a2ee4dcd958780ac07a35f86284c44'],
      name: 'Chennai',
      properties: '15,000+ Properties'
    },
    {
      id: 6,
      image: imageMap['3c8da4da6576b1c86a577e46e4b20a6b5165fb4b'],
      name: 'Pune',
      properties: '15,000+ Properties'
    }
  ];

  return (
    <section className="cities-section">
      <div className="section-header">
        <p className="section-overline">CITIES YOU&apos;LL LOVE</p>
        <h2 className="section-title">Choose Plots in India&apos;s Most Popular Cities</h2>
      </div>
      <div className="cities-grid">
        {cities.map(city => (
          <div key={city.id} className="city-card">
            <div className="city-image">
              <img src={city.image} alt={city.name} loading="lazy" />
            </div>
            <div className="city-info">
              <h3 className="city-name">{city.name}</h3>
              <p className="city-properties">{city.properties}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="footer" style={{ backgroundColor: '#17596D' }}>
      <div className="footer-container">
        <div className="footer-logo">
          <img 
            src={imageMap['948ac9ea38441b7910b16d13c3a4e68d0aed76f5']} 
            alt="91 IDAM Logo" 
            className="footer-logo-image"
          />
        </div>
        <div className="footer-columns">
          <div className="footer-column">
            <h4 className="footer-heading">Company</h4>
            <ul className="footer-links">
              <li><a href="#" className="footer-link">About</a></li>
              <li><a href="#" className="footer-link">Contact</a></li>
              <li><a href="#" className="footer-link">Privacy Policy</a></li>
              <li><a href="#" className="footer-link">Terms & Condition</a></li>
              <li><a href="#" className="footer-link">Feedback</a></li>
              <li><a href="#" className="footer-link">Report a Problem</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4 className="footer-heading">Our Partners</h4>
            <ul className="footer-links">
              <li><a href="#" className="footer-link">VKV Realty</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h4 className="footer-heading">Contact Us</h4>
            <div className="contact-info">
              <p className="contact-item">
                <span className="contact-icon">📧</span>
                Email id
              </p>
              <p className="contact-item">
                <span className="contact-icon">📞</span>
                +1 (062) 109-9222
              </p>
            </div>
            <div className="social-section">
              <h4 className="footer-heading">Connect Us</h4>
              <div className="social-links">
                <a href="#" className="social-link" aria-label="Facebook">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M6 0C2.686 0 0 2.686 0 6s2.686 6 6 6 6-2.686 6-6-2.686-6-6-6z" fill="currentColor"/>
                  </svg>
                </a>
                <a href="#" className="social-link" aria-label="Twitter">
                  <svg width="12" height="9" viewBox="0 0 12 9" fill="none">
                    <path d="M12 1.07c-.44.195-.91.33-1.405.39A2.46 2.46 0 0 0 11.675.17c-.42.25-.88.43-1.38.53A2.44 2.44 0 0 0 8.46 0c-1.35 0-2.44 1.09-2.44 2.44 0 .19.02.38.06.56C3.87 2.89 2.05 1.92.84.45c-.21.36-.33.78-.33 1.23 0 .85.43 1.59 1.09 2.03-.4-.01-.78-.12-1.11-.3v.03c0 1.18.84 2.17 1.96 2.39-.2.06-.42.09-.64.09-.16 0-.31-.02-.46-.05.31.97 1.22 1.68 2.29 1.7A4.9 4.9 0 0 1 0 8.1 6.93 6.93 0 0 0 3.75 9c4.5 0 6.96-3.73 6.96-6.96 0-.11 0-.21-.01-.31A4.96 4.96 0 0 0 12 1.07z" fill="currentColor"/>
                  </svg>
                </a>
                <a href="#" className="social-link" aria-label="Instagram">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M6 1.08c1.6 0 1.79.006 2.42.035.58.027.9.124 1.11.206.28.109.48.24.69.45.21.21.341.41.45.69.082.21.179.53.206 1.11.029.63.035.82.035 2.42s-.006 1.79-.035 2.42c-.027.58-.124.9-.206 1.11-.109.28-.24.48-.45.69-.21.21-.41.341-.69.45-.21.082-.53.179-1.11.206-.63.029-.82.035-2.42.035s-1.79-.006-2.42-.035c-.58-.027-.9-.124-1.11-.206a1.856 1.856 0 0 1-.69-.45 1.856 1.856 0 0 1-.45-.69c-.082-.21-.179-.53-.206-1.11C1.086 7.79 1.08 7.6 1.08 6s.006-1.79.035-2.42c.027-.58.124-.9.206-1.11.109-.28.24-.48.45-.69.21-.21.41-.341.69-.45.21-.082.53-.179 1.11-.206C4.21 1.086 4.4 1.08 6 1.08zM6 0C4.37 0 4.17.007 3.52.038c-.65.03-1.09.133-1.48.284A2.99 2.99 0 0 0 .94.94c-.37.37-.6.79-.618 1.1-.151.39-.254.83-.284 1.48C.007 4.17 0 4.37 0 6s.007 1.83.038 2.48c.03.65.133 1.09.284 1.48.137.4.32.74.618 1.1.37.37.71.481 1.1.618.39.151.83.254 1.48.284C4.17 11.993 4.37 12 6 12s1.83-.007 2.48-.038c.65-.03 1.09-.133 1.48-.284.4-.137.74-.248 1.1-.618.37-.37.481-.71.618-1.1.151-.39.254-.83.284-1.48C11.993 7.83 12 7.63 12 6s-.007-1.83-.038-2.48c-.03-.65-.133-1.09-.284-1.48a2.99 2.99 0 0 0-.618-1.1 2.99 2.99 0 0 0-1.1-.618c-.39-.151-.83-.254-1.48-.284C7.83.007 7.63 0 6 0z" fill="currentColor"/>
                    <path d="M6 2.92A3.08 3.08 0 1 0 6 9.08 3.08 3.08 0 0 0 6 2.92zM6 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zM9.85 2.8a.72.72 0 1 1-1.44 0 .72.72 0 0 1 1.44 0z" fill="currentColor"/>
                  </svg>
                </a>
                <a href="#" className="social-link" aria-label="LinkedIn">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <rect width="12" height="12" fill="currentColor"/>
                    <path d="M2.7 4.5H4.5V9.3H2.7V4.5zM3.6 2.1C4.155 2.1 4.5 2.445 4.5 2.9S4.155 3.7 3.6 3.7 2.7 3.355 2.7 2.9 3.045 2.1 3.6 2.1zM6.3 4.5H8.1V5.4H8.15C8.4 4.9 9 4.35 9.9 4.35C11.7 4.35 12 5.55 12 7.05V9.3H10.2V7.35C10.2 6.6 10.05 6.15 9.45 6.15S8.1 6.6 8.1 7.35V9.3H6.3V4.5z" fill="white"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-divider"></div>
      </div>
    </footer>
  );
};

// Main App Component
const App = () => {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <HeroSection />
        <PropertyListings />
        <section className="additional-listings">
          <div className="section-header">
            <h2 className="section-title">Recently added</h2>
            <p className="section-subtitle">Handpicked Just for You</p>
          </div>
          <div className="properties-grid">
            <PropertyCard 
              image={imageMap['275a0daee60e09660ef4b047a9f00de52101fe0a']}
              title="Residential Land"
              price="7.95L - 96.59L"
              location="City name"
            />
            <PropertyCard 
              image={imageMap['610f374aa84820f15a2b30c0d21290a5815c4121']}
              title="Residential Land"
              price="7.95L - 96.59L"
              location="City name"
            />
            <PropertyCard 
              image={imageMap['b5239a76b6712c05e37b536b8c3bb8e5f3591146']}
              title="Residential Land"
              price="7.95L - 96.59L"
              location="City name"
            />
            <PropertyCard 
              image={imageMap['b5239a76b6712c05e37b536b8c3bb8e5f3591146']}
              title="Residential Land"
              price="7.95L - 96.59L"
              location="City name"
            />
          </div>
        </section>
        <PlacesSection />
        <SellerTypesSection />
        <CTASection />
        <CitiesSection />
      </main>
      <Footer />
    </div>
  );
};

export default App;