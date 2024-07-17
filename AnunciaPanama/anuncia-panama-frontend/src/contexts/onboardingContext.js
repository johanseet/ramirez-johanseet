"use client"
import { createContext, useContext, useState } from 'react';

const OnboardingContext = createContext();

export const OnboardingProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    dateOfBirth: ''
  });

  const [businessInfo, setBusinessInfo] = useState({
    businessName: '',
    businessDescription: '',
    address: '',
    contactEmail: '',
    contactPhone: '',
    websiteUrl: '',
    businessTypeId: '',
    facebookUrl: '',
    twitterUrl: '',
    instagramUrl: '',
    youtubeUrl: ''
  });

  const [selectedPlan, setSelectedPlan] = useState(null);
  const [businessId, setBusinessId] = useState(null);

  return (
    <OnboardingContext.Provider value={{ userInfo, setUserInfo, businessInfo, setBusinessInfo, selectedPlan, setSelectedPlan, businessId, setBusinessId }}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  return useContext(OnboardingContext);
};
