import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import Button from '../components/ui/Button';
import MainLayout from '../components/layout/MainLayout';

const NotFoundPage: React.FC = () => {
  return (
    <MainLayout>
      <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center py-12 px-4">
        <div className="text-center max-w-md">
          <h1 className="text-9xl font-bold text-primary mb-2">404</h1>
          <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
          <p className="text-text-secondary mb-8">
            The page you are looking for doesn't exist or has been moved.
          </p>
          <Link to="/">
            <Button
              icon={<Home size={18} />}
              iconPosition="left"
            >
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </MainLayout>
  );
};

export default NotFoundPage;