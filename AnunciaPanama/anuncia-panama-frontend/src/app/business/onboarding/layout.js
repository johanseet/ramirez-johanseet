import { OnboardingProvider } from '@contexts/onboardingContext';

const OnboardingLayout = ({ children }) => {
  return (
    <OnboardingProvider>
      {children}
    </OnboardingProvider>
  );
};

export default OnboardingLayout;
