"use client";

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { handleLogin } from '../../utils/auth-util';
import { useRouter } from 'next/navigation';

interface AuthSessionHandlerProps {
  children: React.ReactNode;
}

const AuthSessionHandler: React.FC<AuthSessionHandlerProps> = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    const processSession = async () => {
      // Only proceed if we have a session with JWT token
      if (status === 'authenticated' && session?.jwt) {
        try {
          // Call our API to validate the token and get user details
          const loginSuccess = await handleLogin(session.jwt as string);
          
          if (loginSuccess) {
            // Optionally redirect or update UI state
            console.log('User authenticated successfully');
          } else {
            console.error('Failed to validate session token with backend');
          }
        } catch (error) {
          console.error('Error processing auth session:', error);
        }
      }
    };

    processSession();
  }, [session, status, router]);

  return <>{children}</>;
};

export default AuthSessionHandler; 