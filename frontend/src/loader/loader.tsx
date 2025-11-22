
"use client";

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import lottieLoader from './lottieLoader.json';

// Dynamically import lottie-react on the client only to avoid server-side document usage
const Lottie = dynamic(() => import('lottie-react').then((mod) => mod.default), { ssr: false });

const Loader = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center" style={{ height: 'calc(100vh - 200px)' }}>
      <Suspense fallback={<div style={{ height: 120 }} />}> 
        <Lottie animationData={lottieLoader} loop autoplay />
      </Suspense>
    </div>
  );
};

export default Loader;
