import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, MessageSquare, ShieldCheck, Clock } from 'lucide-react';
import Button from '../components/ui/Button';
import MainLayout from '../components/layout/MainLayout';
import useAuthStore from '../store/authStore';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { status } = useAuthStore();
  
  const features = [
    {
      icon: <Mail className="h-8 w-8 text-primary mb-3" />,
      title: 'Gmail OAuth Integration',
      description: 'Securely connect your Gmail account with OAuth2 authentication.',
    },
    {
      icon: <MessageSquare className="h-8 w-8 text-primary mb-3" />,
      title: 'Smart Email Classification',
      description: 'Automatically classify emails as client, friend, family, or unknown.',
    },
    {
      icon: <ShieldCheck className="h-8 w-8 text-primary mb-3" />,
      title: 'Privacy Focused',
      description: 'Your data stays private. We only store essential metadata to power the features.',
    },
    {
      icon: <Clock className="h-8 w-8 text-primary mb-3" />,
      title: 'Save Time',
      description: 'Automate repetitive email responses with customizable templates.',
    },
  ];
  
  return (
    <MainLayout>
      <section className="py-12 md:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Automate Your Gmail Replies with Intelligence
          </h1>
          
          <p className="text-lg md:text-xl text-text-secondary mb-10 max-w-3xl mx-auto">
            Set intelligent rules to automatically reply to your emails,
            classify senders, and handle important requests without constant monitoring.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {status === 'authenticated' ? (
              <Button
                size="lg"
                onClick={() => navigate('/dashboard')}
              >
                Go to Dashboard
              </Button>
            ) : (
              <>
                <Button
                  size="lg"
                  onClick={() => navigate('/login')}
                >
                  Sign in with Gmail
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => {
                    const featuresSection = document.getElementById('features');
                    featuresSection?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Learn More
                </Button>
              </>
            )}
          </div>
        </div>
      </section>
      
      <section 
        id="features" 
        className="py-16 bg-gray-50 border-y border-gray-200"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col items-center text-center">
                  {feature.icon}
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-text-secondary">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-16">
        <div className="max-w-5xl mx-auto">
          <div className="bg-primary/5 rounded-2xl p-8 md:p-12 border border-primary/20">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Save hours of email management time
                </h2>
                <p className="text-text-secondary mb-6">
                  Set up custom reply rules once and let our system handle repetitive responses automatically.
                  Customize your auto-replies based on sender type, email content, and more.
                </p>
                <Button 
                  size="lg"
                  onClick={() => navigate(status === 'authenticated' ? '/dashboard' : '/login')}
                >
                  {status === 'authenticated' ? 'Get Started' : 'Sign in with Gmail'}
                </Button>
              </div>
              <div className="order-first md:order-last flex justify-center">
                <div className="w-64 h-64 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <Mail className="h-24 w-24 text-primary" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default HomePage;