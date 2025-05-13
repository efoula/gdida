import { create } from 'zustand';
import { Notification } from '../types';

interface NotificationState {
  notifications: Notification[];
  isLoading: boolean;
  error: string | null;
  unreadCount: number;
  fetchNotifications: () => Promise<void>;
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt' | 'read'>) => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  deleteNotification: (id: string) => Promise<void>;
  clearAll: () => Promise<void>;
}

// Demo notifications for the UI
const generateDemoNotifications = (): Notification[] => [
  {
    id: '1',
    type: 'reply_sent',
    title: 'Auto-reply sent',
    message: 'Auto-reply was sent to john@example.com regarding your Out of Office rule',
    emailId: 'email123',
    ruleId: '1',
    createdAt: new Date(Date.now() - 30 * 60000).toISOString(), // 30 minutes ago
    read: false
  },
  {
    id: '2',
    type: 'rule_matched',
    title: 'Rule matched',
    message: 'Your "Client Email Response" rule matched an email from client@example.com',
    emailId: 'email456',
    ruleId: '2',
    createdAt: new Date(Date.now() - 120 * 60000).toISOString(), // 2 hours ago
    read: true
  },
  {
    id: '3',
    type: 'error',
    title: 'Failed to send reply',
    message: 'There was an error sending your auto-reply to jane@example.com',
    emailId: 'email789',
    createdAt: new Date(Date.now() - 240 * 60000).toISOString(), // 4 hours ago
    read: false
  }
];

const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],
  isLoading: false,
  error: null,
  unreadCount: 0,
  
  fetchNotifications: async () => {
    set({ isLoading: true, error: null });
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 800));
      const notifications = generateDemoNotifications();
      const unreadCount = notifications.filter(n => !n.read).length;
      
      set({ 
        notifications, 
        unreadCount,
        isLoading: false 
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch notifications', 
        isLoading: false 
      });
    }
  },
  
  addNotification: async (notification) => {
    set({ isLoading: true, error: null });
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 300));
      const newNotification: Notification = {
        ...notification,
        id: Math.random().toString(36).substring(2, 9),
        createdAt: new Date().toISOString(),
        read: false
      };
      
      set(state => ({ 
        notifications: [newNotification, ...state.notifications], 
        unreadCount: state.unreadCount + 1,
        isLoading: false 
      }));
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to add notification', 
        isLoading: false 
      });
    }
  },
  
  markAsRead: async (id) => {
    set({ isLoading: true, error: null });
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 300));
      let wasUnread = false;
      
      set(state => {
        const updatedNotifications = state.notifications.map(notification => {
          if (notification.id === id && !notification.read) {
            wasUnread = true;
            return { ...notification, read: true };
          }
          return notification;
        });
        
        return { 
          notifications: updatedNotifications, 
          unreadCount: wasUnread ? state.unreadCount - 1 : state.unreadCount,
          isLoading: false 
        };
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to mark notification as read', 
        isLoading: false 
      });
    }
  },
  
  markAllAsRead: async () => {
    set({ isLoading: true, error: null });
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      set(state => {
        const updatedNotifications = state.notifications.map(notification => ({
          ...notification,
          read: true
        }));
        
        return { 
          notifications: updatedNotifications, 
          unreadCount: 0,
          isLoading: false 
        };
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to mark all notifications as read', 
        isLoading: false 
      });
    }
  },
  
  deleteNotification: async (id) => {
    set({ isLoading: true, error: null });
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 300));
      let wasUnread = false;
      
      set(state => {
        const notification = state.notifications.find(n => n.id === id);
        if (notification && !notification.read) {
          wasUnread = true;
        }
        
        return { 
          notifications: state.notifications.filter(n => n.id !== id), 
          unreadCount: wasUnread ? state.unreadCount - 1 : state.unreadCount,
          isLoading: false 
        };
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to delete notification', 
        isLoading: false 
      });
    }
  },
  
  clearAll: async () => {
    set({ isLoading: true, error: null });
    try {
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 500));
      set({ 
        notifications: [], 
        unreadCount: 0,
        isLoading: false 
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to clear notifications', 
        isLoading: false 
      });
    }
  }
}));

export default useNotificationStore;