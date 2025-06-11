# Firebase Google Authentication Setup Guide

## Overview

This project has been updated to use Firebase Authentication with Google Sign-In instead of the previous direct Google Identity API implementation.

## Required Environment Variables

Add the following Firebase configuration variables to your `.env` file:

```bash
# API Configuration
VITE_API_URL=http://localhost:5000/api/v1

# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id

# Legacy Google Sign-In (can be removed after Firebase migration)
VITE_GOOGLE_CLIENT_ID=your_legacy_google_client_id
```

## Firebase Project Setup

### 1. Create a Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Follow the setup wizard

### 2. Enable Authentication

1. In your Firebase project, go to "Authentication" in the left sidebar
2. Click on the "Sign-in method" tab
3. Enable "Google" as a sign-in provider
4. Configure the OAuth consent screen if prompted

### 3. Add Web App to Firebase Project

1. In your Firebase project settings, click "Add app" and select "Web"
2. Register your app with a nickname
3. Copy the Firebase configuration object
4. Add the configuration values to your `.env` file

### 4. Configure OAuth Settings

1. In the Google Cloud Console for your project
2. Go to "APIs & Services" > "Credentials"
3. Add `http://localhost:5173` to authorized origins for development
4. Add your production domain when deploying

## Backend Integration

### Google ID Token Verification

Your backend should verify the Firebase ID token sent from the frontend:

```javascript
// Example Node.js backend verification
const admin = require("firebase-admin");

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  // or use service account key
});

// Verify ID token
async function verifyIdToken(idToken) {
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    return decodedToken;
  } catch (error) {
    throw new Error("Invalid token");
  }
}
```

## Code Changes Made

### 1. Firebase Configuration (`src/lib/firebase.ts`)

- Initialized Firebase app with environment variables
- Configured Google Auth Provider
- Exported auth instance and provider

### 2. Authentication Hooks (`src/hooks/use-auth.ts`)

- Added `useFirebaseGoogleLogin()` hook
- Maintains existing `useGoogleLogin()` for backend communication
- Imports Firebase auth functions

### 3. Login/Signup Forms

- Replaced Google Identity API button with Firebase button
- Added proper loading states and error handling
- Consistent styling with custom button design

### 4. Auth Context (`src/contexts/AuthContext.tsx`)

- Added Firebase auth state management
- Provides current user state across the app
- Handles sign-out functionality

## Features

### ✅ What Works

- **Firebase Google Sign-In**: Popup-based authentication
- **Custom Button Design**: Styled Google sign-in buttons
- **Loading States**: Proper feedback during authentication
- **Error Handling**: User-friendly error messages
- **Backend Integration**: Sends Firebase ID tokens to your API
- **Auth State Management**: React context for auth state

### 🔧 Development Notes

- The old Google Identity API code has been replaced
- Environment variables are properly structured
- Firebase SDK handles token refresh automatically
- Auth state persists across page refreshes

### 🚀 Deployment Checklist

1. Set up Firebase project with proper domain configuration
2. Add production domain to OAuth authorized origins
3. Configure environment variables in your hosting platform
4. Test Google Sign-In on staging environment
5. Update backend to verify Firebase ID tokens

## Troubleshooting

### Common Issues

1. **"Auth domain not configured"**: Check `VITE_FIREBASE_AUTH_DOMAIN`
2. **"Origin not authorized"**: Add your domain to OAuth settings
3. **"Invalid API key"**: Verify `VITE_FIREBASE_API_KEY`
4. **Backend errors**: Ensure your API can verify Firebase ID tokens

### Testing

1. Start the development server: `npm run dev`
2. Navigate to `/authentification`
3. Click "Continuer avec Google"
4. Check browser console for any errors
5. Verify token is sent to your backend API

## Next Steps

1. Add your Firebase configuration to `.env`
2. Test the authentication flow
3. Update your backend to handle Firebase ID tokens
4. Remove the legacy `VITE_GOOGLE_CLIENT_ID` once confirmed working
