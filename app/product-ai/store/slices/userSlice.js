import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for user login
export const loginUser = createAsyncThunk(
  'user/login',
  async (credentials) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    if (!response.ok) throw new Error('Login failed');
    return response.json();
  }
);

// Async thunk for user logout
export const logoutUser = createAsyncThunk(
  'user/logout',
  async () => {
    const response = await fetch('/api/auth/logout', {
      method: 'POST',
    });
    if (!response.ok) throw new Error('Logout failed');
    return response.json();
  }
);

// Async thunk for user registration
export const registerUser = createAsyncThunk(
  'user/register',
  async (userData) => {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    if (!response.ok) throw new Error('Registration failed');
    return response.json();
  }
);

// Async thunk for updating user profile
export const updateUserProfile = createAsyncThunk(
  'user/updateProfile',
  async (profileData) => {
    const response = await fetch('/api/user/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profileData),
    });
    if (!response.ok) throw new Error('Profile update failed');
    return response.json();
  }
);

const initialState = {
  currentUser: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  preferences: {
    savedSearches: [],
    recentlyViewed: [],
    notifications: true,
    emailAlerts: true,
    smsAlerts: false,
  },
  profile: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload;
      state.isAuthenticated = true;
    },
    clearUser: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
      state.preferences = initialState.preferences;
      state.profile = initialState.profile;
    },
    updatePreferences: (state, action) => {
      state.preferences = { ...state.preferences, ...action.payload };
    },
    addToRecentlyViewed: (state, action) => {
      const property = action.payload;
      state.preferences.recentlyViewed = [
        property,
        ...state.preferences.recentlyViewed.filter(p => p.id !== property.id)
      ].slice(0, 10); // Keep only last 10
    },
    addToSavedSearches: (state, action) => {
      const search = action.payload;
      state.preferences.savedSearches.push({
        ...search,
        id: Date.now(),
        createdAt: new Date().toISOString(),
      });
    },
    removeSavedSearch: (state, action) => {
      state.preferences.savedSearches = state.preferences.savedSearches.filter(
        s => s.id !== action.payload
      );
    },
    updateProfile: (state, action) => {
      state.profile = { ...state.profile, ...action.payload };
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload.user;
        state.isAuthenticated = true;
        if (action.payload.profile) {
          state.profile = action.payload.profile;
        }
        if (action.payload.preferences) {
          state.preferences = action.payload.preferences;
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Logout
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.currentUser = null;
        state.isAuthenticated = false;
        state.preferences = initialState.preferences;
        state.profile = initialState.profile;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload.user;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Update Profile
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  setUser,
  clearUser,
  updatePreferences,
  addToRecentlyViewed,
  addToSavedSearches,
  removeSavedSearch,
  updateProfile,
  clearError,
} = userSlice.actions;

// Selectors
export const selectCurrentUser = (state) => state.user.currentUser;
export const selectIsAuthenticated = (state) => state.user.isAuthenticated;
export const selectUserLoading = (state) => state.user.loading;
export const selectUserError = (state) => state.user.error;
export const selectUserPreferences = (state) => state.user.preferences;
export const selectUserProfile = (state) => state.user.profile;
export const selectRecentlyViewed = (state) => state.user.preferences.recentlyViewed;
export const selectSavedSearches = (state) => state.user.preferences.savedSearches;

export default userSlice.reducer;