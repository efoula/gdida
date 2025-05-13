import { create } from 'zustand';
import { Rule } from '../types';

interface RuleState {
  rules: Rule[];
  isLoading: boolean;
  error: string | null;
  fetchRules: () => Promise<void>;
  addRule: (rule: Omit<Rule, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Rule>;
  updateRule: (id: string, updates: Partial<Rule>) => Promise<Rule>;
  deleteRule: (id: string) => Promise<void>;
  toggleRuleStatus: (id: string) => Promise<void>;
}

// For demo purposes, we're generating demo rules
const generateDemoRules = (): Rule[] => [
  {
    id: '1',
    name: 'Out of Office Auto-Reply',
    active: true,
    conditions: [
      { type: 'sender', value: '', operator: 'contains' }
    ],
    action: {
      type: 'reply',
      template: "Hello, thank you for your email. I'm currently out of the office and will return on Monday, July 15th. For urgent matters, please contact support@example.com.",
      tone: 'professional',
      notifyAfter: true
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Client Email Response',
    active: true,
    conditions: [
      { type: 'senderType', value: 'client', operator: 'equals' }
    ],
    action: {
      type: 'reply',
      template: "Thank you for your email. I've received your message and will review it shortly. I typically respond within 24 hours.",
      tone: 'professional',
      notifyBefore: true,
      notifyAfter: true
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Forward Invoices',
    active: false,
    conditions: [
      { type: 'subject', value: 'invoice', operator: 'contains' }
    ],
    action: {
      type: 'forward',
      template: "Forwarding invoice for processing.",
      forwardTo: 'accounting@example.com'
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

const useRuleStore = create<RuleState>((set, get) => ({
  rules: [],
  isLoading: false,
  error: null,
  
  fetchRules: async () => {
    set({ isLoading: true, error: null });
    try {
      // In a real app, this would be an API call
      // For demo purposes, we're using a timeout and demo data
      await new Promise(resolve => setTimeout(resolve, 800));
      set({ rules: generateDemoRules(), isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch rules', 
        isLoading: false 
      });
    }
  },
  
  addRule: async (rule) => {
    set({ isLoading: true, error: null });
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 800));
      const newRule: Rule = {
        ...rule,
        id: Math.random().toString(36).substring(2, 9),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      set(state => ({ 
        rules: [...state.rules, newRule], 
        isLoading: false 
      }));
      return newRule;
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to add rule', 
        isLoading: false 
      });
      throw error;
    }
  },
  
  updateRule: async (id, updates) => {
    set({ isLoading: true, error: null });
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 800));
      let updatedRule: Rule | undefined;
      
      set(state => {
        const updatedRules = state.rules.map(rule => {
          if (rule.id === id) {
            updatedRule = {
              ...rule,
              ...updates,
              updatedAt: new Date().toISOString()
            };
            return updatedRule;
          }
          return rule;
        });
        return { rules: updatedRules, isLoading: false };
      });
      
      if (!updatedRule) {
        throw new Error('Rule not found');
      }
      
      return updatedRule;
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to update rule', 
        isLoading: false 
      });
      throw error;
    }
  },
  
  deleteRule: async (id) => {
    set({ isLoading: true, error: null });
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 800));
      set(state => ({ 
        rules: state.rules.filter(rule => rule.id !== id), 
        isLoading: false 
      }));
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to delete rule', 
        isLoading: false 
      });
      throw error;
    }
  },
  
  toggleRuleStatus: async (id) => {
    const rule = get().rules.find(rule => rule.id === id);
    if (rule) {
      await get().updateRule(id, { active: !rule.active });
    }
  }
}));

export default useRuleStore;