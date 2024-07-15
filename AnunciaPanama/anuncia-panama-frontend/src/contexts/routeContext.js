// src/contexts/RouteContext.js
"use client"
import React, { createContext, useContext } from 'react';

const RouteContext = createContext();

export const RouteProvider = ({ children }) => {
  const routes = {
    home: "/",
    auth: {
      login: '/auth/login',
      forgotPassword: '/auth/forgot-password',
    },
    user: {
      register: '/user/register',
      profile: '/user/profile',
    },
    business:{
      home: '/business',
      dashboard: '/business/dashboard',
      onboarding:{
        businessInfo: '/business/onboarding/business-info',
        userInfo: '/business/onboarding/user-info',
        selectPlan: '/business/onboarding/select-plan',
        payment: '/business/onboarding/payment'
      }
    }
  };

  return (
    <RouteContext.Provider value={routes}>
      {children}
    </RouteContext.Provider>
  );
};

export const useRoutes = () => useContext(RouteContext);
