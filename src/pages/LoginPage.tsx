import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { Mail } from 'lucide-react';
import MainLayout from '../components/layout/MainLayout';
import useAuthStore from '../store/authStore';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { setUser, status } = useAuthStore();
  
  useEffect(() => {
    if (status === 'authenticated') {
      navigate('/dashboard');
    }
  }, [status, navigate]);
  
  const handleLoginSuccess = (credentialResponse: any) => {
    // For development/demo purposes only
    const mockUser = {
      id: 'user_123',
      email: 'user@example.com',
      name: 'Demo User',
      picture: 'https://randomuser.me/api/portraits/women/44.jpg',
      accessToken: credentialResponse.credential
    };
    
    localStorage.setItem('gmail_assistant_token', JSON.stringify(mockUser));
    setUser(mockUser);
    navigate('/dashboard');
  };
  
  const handleLoginError = () => {
    console.error('Google login failed');
    alert('Login failed. Please try again.');
  };
  
  return (
    <MainLayout>
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Mail className="h-10 w-10 text-primary" />
            </div>
            <h2 className="mt-6 text-3xl font-bold tracking-tight">
              Sign in to AutoReply
            </h2>
            <p className="mt-2 text-sm text-text-secondary">
              Connect your Gmail account to get started with intelligent auto-replies
            </p>
          </div>
          
          <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-gray-200">
            <div className="space-y-6">
              <p className="text-sm text-text-secondary text-center mb-6">
                Sign in with your Google account to allow access to your Gmail inbox.
                We'll only request the permissions necessary for auto-replies.
              </p>
              
              <div className="flex justify-center">
                <GoogleLogin
                  onSuccess={handleLoginSuccess}
                  onError={handleLoginError}
                  useOneTap
                  theme="outline"
                  size="large"
                  text="signin_with"
                  shape="rectangular"
                />
              </div>
              
              <div className="mt-4 text-center">
                <p className="text-xs text-text-secondary">
                  By signing in, you agree to our
                  <a href="#" className="text-primary hover:text-primary/80 ml-1">
                    Terms of Service
                  </a>
                  <span className="mx-1">and</span>
                  <a href="#" className="text-primary hover:text-primary/80">
                    Privacy Policy
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default LoginPage;