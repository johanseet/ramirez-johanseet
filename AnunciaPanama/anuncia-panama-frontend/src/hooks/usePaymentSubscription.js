import { useState } from 'react';
import { useAuth } from '@contexts/authContext';

const useBusinessRegister = () => {
  const { registerBusiness } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const businessRegister = async (userInfo, businessInfo) => {
    setLoading(true);
    setError(null);

    const requestData = {
      username: userInfo.username,
      email: userInfo.email,
      password: userInfo.password,
      fullName: userInfo.fullName,
      dateOfBirth: userInfo.dateOfBirth,
      gender: userInfo.gender,
      businessName: businessInfo.businessName,
      businessTypeId: businessInfo.businessTypeId,
      businessDescription: businessInfo.businessDescription,
      address: businessInfo.address,
      contactEmail: businessInfo.contactEmail,
      contactPhone: businessInfo.contactPhone,
      websiteUrl: businessInfo.websiteUrl,
      socialNetworksUrl: {
        instagram_url: businessInfo.instagramUrl,
        facebook_url: businessInfo.facebookUrl,
        twitter_url: businessInfo.twitterUrl,
        youtube_url: businessInfo.youtubeUrl
      }
    };

    try {
      const response = await registerBusiness(requestData);
      setLoading(false);
      return response;
    } catch (err) {
      setLoading(false);
      setError(err.message);
      throw err;
    }
  };

  return { businessRegister, loading, error };
};

export default useBusinessRegister;
