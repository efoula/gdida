import { create } from 'zustand';
import { User, AuthStatus } from '../types';

interface AuthState {
  user: User | null;
  status: AuthStatus;
  isInitialized: boolean;
  setUser: (user: User | null) => void;
  setStatus: (status: AuthStatus) => void;
  logout: () => void;
  initialize: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  status: 'loading',
  isInitialized: false,
  
  setUser: (user) => set({ user, status: user ? 'authenticated' : 'unauthenticated' }),
  
  setStatus: (status) => set({ status }),
  
  logout: () => {
    // Remove any stored tokens
    localStorage.removeItem('gmail_assistant_token');
    set({ user: null, status: 'unauthenticated' });
  },
  
  initialize: () => {
    // Check for stored credentials
    const storedToken = localStorage.getItem('gmail_assistant_token');
    if (storedToken) {
      try {
        const userData = JSON.parse(storedToken);
        set({ 
          user: userData, 
          status: 'authenticated',
          isInitialized: true
        });
      } catch (error) {
        console.error('Failed to parse stored auth data', error);
        set({ 
          user: null, 
          status: 'unauthenticated',
          isInitialized: true
        });
      }
    } else {
      set({ 
        user: null, 
        status: 'unauthenticated',
        isInitialized: true
      });
    }
  }
}));

export default useAuthStore;