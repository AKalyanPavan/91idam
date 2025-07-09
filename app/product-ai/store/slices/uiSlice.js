import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeTab: 'details',
  searchMode: 'Buy',
  searchLocation: 'Coimbatore',
  searchFilters: '',
  selectedImageIndex: 0,
  isProfileMenuOpen: false,
  isLocationDropdownOpen: false,
  isGalleryModalOpen: false,
  descriptionExpanded: false,
  isMobileMenuOpen: false,
  notification: {
    show: false,
    message: '',
    type: 'info', // info, success, error, warning
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    setSearchMode: (state, action) => {
      state.searchMode = action.payload;
    },
    setSearchLocation: (state, action) => {
      state.searchLocation = action.payload;
    },
    setSearchFilters: (state, action) => {
      state.searchFilters = action.payload;
    },
    setSelectedImageIndex: (state, action) => {
      state.selectedImageIndex = action.payload;
    },
    toggleProfileMenu: (state) => {
      state.isProfileMenuOpen = !state.isProfileMenuOpen;
    },
    toggleLocationDropdown: (state) => {
      state.isLocationDropdownOpen = !state.isLocationDropdownOpen;
    },
    toggleGalleryModal: (state) => {
      state.isGalleryModalOpen = !state.isGalleryModalOpen;
    },
    toggleDescriptionExpanded: (state) => {
      state.descriptionExpanded = !state.descriptionExpanded;
    },
    toggleMobileMenu: (state) => {
      state.isMobileMenuOpen = !state.isMobileMenuOpen;
    },
    showNotification: (state, action) => {
      state.notification = {
        show: true,
        message: action.payload.message,
        type: action.payload.type || 'info',
      };
    },
    hideNotification: (state) => {
      state.notification.show = false;
    },
    resetUI: (state) => {
      return initialState;
    },
  },
});

export const {
  setActiveTab,
  setSearchMode,
  setSearchLocation,
  setSearchFilters,
  setSelectedImageIndex,
  toggleProfileMenu,
  toggleLocationDropdown,
  toggleGalleryModal,
  toggleDescriptionExpanded,
  toggleMobileMenu,
  showNotification,
  hideNotification,
  resetUI,
} = uiSlice.actions;

// Selectors
export const selectActiveTab = (state) => state.ui.activeTab;
export const selectSearchMode = (state) => state.ui.searchMode;
export const selectSearchLocation = (state) => state.ui.searchLocation;
export const selectSearchFilters = (state) => state.ui.searchFilters;
export const selectSelectedImageIndex = (state) => state.ui.selectedImageIndex;
export const selectIsProfileMenuOpen = (state) => state.ui.isProfileMenuOpen;
export const selectIsLocationDropdownOpen = (state) => state.ui.isLocationDropdownOpen;
export const selectIsGalleryModalOpen = (state) => state.ui.isGalleryModalOpen;
export const selectDescriptionExpanded = (state) => state.ui.descriptionExpanded;
export const selectIsMobileMenuOpen = (state) => state.ui.isMobileMenuOpen;
export const selectNotification = (state) => state.ui.notification;

export default uiSlice.reducer;