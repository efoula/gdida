import { create } from 'zustand';
import { ReplyHistory } from '../types';

interface HistoryState {
  replyHistory: ReplyHistory[];
  isLoading: boolean;
  error: string | null;
  fetchHistory: () => Promise<void>;
  addHistoryEntry: (entry: Omit<ReplyHistory, 'id'>) => Promise<void>;
}

// Generate demo history data
const generateDemoHistory = (): ReplyHistory[] => [
  {
    id: '1',
    emailId: 'email123',
    ruleId: '1',
    replyContent: "Hello, thank you for your email. I'm currently out of the office and will return on Monday, July 15th. For urgent matters, please contact support@example.com.",
    sentAt: new Date(Date.now() - 120 * 60000).toISOString(), // 2 hours ago
    successful: true
  },
  {
    id: '2',
    emailId: 'email456',
    ruleId: '2',
    replyContent: "Thank you for your email. I've received your message and will review it shortly. I typically respond within 24 hours.",
    sentAt: new Date(Date.now() - 240 * 60000).toISOString(), // 4 hours ago
    successful: true
  },
  {
    id: '3',
    emailId: 'email789',
    ruleId: '1',
    replyContent: "Hello, thank you for your email. I'm currently out of the office and will return on Monday, July 15th. For urgent matters, please contact support@example.com.",
    sentAt: new Date(Date.now() - 360 * 60000).toISOString(), // 6 hours ago
    successful: false,
    errorMessage: 'Failed to send: Rate limit exceeded'
  }
];

const useHistoryStore = create<HistoryState>((set) => ({
  replyHistory: [],
  isLoading: false,
  error: null,
  
  fetchHistory: async () => {
    set({ isLoading: true, error: null });
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 800));
      set({ 
        replyHistory: generateDemoHistory(), 
        isLoading: false 
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch reply history', 
        isLoading: false 
      });
    }
  },
  
  addHistoryEntry: async (entry) => {
    set({ isLoading: true, error: null });
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 300));
      const newEntry: ReplyHistory = {
        ...entry,
        id: Math.random().toString(36).substring(2, 9)
      };
      
      set(state => ({ 
        replyHistory: [newEntry, ...state.replyHistory], 
        isLoading: false 
      }));
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to add history entry', 
        isLoading: false 
      });
    }
  }
}));

export default useHistoryStore;