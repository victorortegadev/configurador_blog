'use client';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

const ProviderBarra = ({ children }) => {
  return (
    <>
        <ProgressBar
            height="5px"
            color="#6DC8C9"
            options={{ showSpinner: false }}
            shallowRouting
        />
        {children}
    </>
  );
};

export default ProviderBarra;