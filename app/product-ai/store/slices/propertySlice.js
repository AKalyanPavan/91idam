import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for fetching property details
export const fetchPropertyDetails = createAsyncThunk(
  'property/fetchDetails',
  async (propertyId) => {
    // Simulate API call
    const response = await fetch(`/api/properties/${propertyId}`);
    if (!response.ok) throw new Error('Failed to fetch property');
    return response.json();
  }
);

// Async thunk for saving property
export const saveProperty = createAsyncThunk(
  'property/save',
  async (propertyId) => {
    const response = await fetch(`/api/properties/${propertyId}/save`, {
      method: 'POST',
    });
    if (!response.ok) throw new Error('Failed to save property');
    return response.json();
  }
);

// Async thunk for submitting contact form
export const submitContactForm = createAsyncThunk(
  'property/submitContact',
  async ({ propertyId, formData }) => {
    const response = await fetch(`/api/properties/${propertyId}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (!response.ok) throw new Error('Failed to submit contact form');
    return response.json();
  }
);

const initialState = {
  currentProperty: {
    id: null,
    price: "19.50 Lac",
    pricePerSqft: "3,330",
    title: "Residential Plots/Land in Thudiyalur, Coimbatore",
    area: "588",
    areaType: "Plot Area",
    type: "Plot/Land",
    approved: true,
    publishDate: "December 27, 2018",
    images: [
      { url: "/property-1.jpg", alt: "Property view 1" },
      { url: "/property-2.jpg", alt: "Property view 2" },
      { url: "/property-3.jpg", alt: "Property view 3" },
      { url: "/property-4.jpg", alt: "Property view 4" }
    ],
    plotDetails: {
      "Plot Size(sqft)": "₹3,330 /sqft",
      "Length(ft)": "1,428 sq.m.",
      "Breadth(ft)": "1,428 sq.m.",
      "Road width": "12"
    },
    description: "This extremely spacious two/three bedroom duplex apartment occupies a desirable position to the South-West of Harrogate's town centre and offers a huge amount of scope to update and re-model to suit the individual including a large eaves storage room ripe for conversion into a second bathroom.",
    priceDetails: {
      "Selling Price": "19.50 Lac",
      "Maintenance Charges": "19.50 Lac",
      "Negotiable": "17.50 Lac"
    },
    facilities: [
      { id: 1, name: 'Restaurant', icon: '🍽️' },
      { id: 2, name: 'Water', icon: '💧' },
      { id: 3, name: 'Internal street light', icon: '💡' },
      { id: 4, name: '24/7 Security', icon: '🔒' }
    ],
    location: {
      state: "Tamil Nadu",
      city: "Coimbatore",
      area: "Thudiyalur",
      colony: "NGGO Colony",
      pincode: "641034"
    }
  },
  savedProperties: [],
  loading: false,
  error: null,
  contactFormStatus: 'idle', // idle, loading, success, error
};

const propertySlice = createSlice({
  name: 'property',
  initialState,
  reducers: {
    setCurrentProperty: (state, action) => {
      state.currentProperty = action.payload;
    },
    addToSavedProperties: (state, action) => {
      const exists = state.savedProperties.find(p => p.id === action.payload.id);
      if (!exists) {
        state.savedProperties.push(action.payload);
      }
    },
    removeFromSavedProperties: (state, action) => {
      state.savedProperties = state.savedProperties.filter(
        p => p.id !== action.payload
      );
    },
    clearError: (state) => {
      state.error = null;
    },
    resetContactFormStatus: (state) => {
      state.contactFormStatus = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch property details
      .addCase(fetchPropertyDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPropertyDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProperty = action.payload;
      })
      .addCase(fetchPropertyDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Save property
      .addCase(saveProperty.fulfilled, (state, action) => {
        state.savedProperties.push(state.currentProperty);
      })
      // Submit contact form
      .addCase(submitContactForm.pending, (state) => {
        state.contactFormStatus = 'loading';
      })
      .addCase(submitContactForm.fulfilled, (state) => {
        state.contactFormStatus = 'success';
      })
      .addCase(submitContactForm.rejected, (state) => {
        state.contactFormStatus = 'error';
      });
  },
});

export const {
  setCurrentProperty,
  addToSavedProperties,
  removeFromSavedProperties,
  clearError,
  resetContactFormStatus,
} = propertySlice.actions;

// Selectors
export const selectCurrentProperty = (state) => state.property.currentProperty;
export const selectSavedProperties = (state) => state.property.savedProperties;
export const selectPropertyLoading = (state) => state.property.loading;
export const selectPropertyError = (state) => state.property.error;
export const selectContactFormStatus = (state) => state.property.contactFormStatus;

export default propertySlice.reducer;