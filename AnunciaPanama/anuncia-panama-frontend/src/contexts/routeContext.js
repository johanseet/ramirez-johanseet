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
      dashboard: '/business/dashboard'
    }
  };

  return (
    <RouteContext.Provider value={routes}>
      {children}
    </RouteContext.Provider>
  );
};

export const useRoutes = () => useContext(RouteContext);
