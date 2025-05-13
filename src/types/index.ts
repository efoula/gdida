// Auth types
export interface User {
  id: string;
  email: string;
  name: string;
  picture: string;
  accessToken: string;
}

export type AuthStatus = 'authenticated' | 'unauthenticated' | 'loading';

// Email types
export type EmailSenderType = 'client' | 'friend' | 'family' | 'unknown';

export interface Email {
  id: string;
  threadId: string;
  from: string;
  to: string;
  subject: string;
  snippet: string;
  body: string;
  receivedAt: string;
  labels: string[];
  senderType?: EmailSenderType;
  hasCTA?: boolean;
}

// Rule types
export interface Rule {
  id: string;
  name: string;
  active: boolean;
  conditions: RuleCondition[];
  action: RuleAction;
  createdAt: string;
  updatedAt: string;
}

export interface RuleCondition {
  type: 'sender' | 'domain' | 'subject' | 'content' | 'senderType';
  value: string;
  operator: 'contains' | 'equals' | 'startsWith' | 'endsWith' | 'matches';
}

export interface RuleAction {
  type: 'reply' | 'forward' | 'label' | 'archive';
  template: string;
  tone?: 'professional' | 'friendly' | 'urgent';
  forwardTo?: string;
  label?: string;
  notifyBefore?: boolean;
  notifyAfter?: boolean;
}

// Notification types
export interface Notification {
  id: string;
  type: 'reply_sent' | 'rule_matched' | 'error';
  title: string;
  message: string;
  emailId?: string;
  ruleId?: string;
  createdAt: string;
  read: boolean;
}

// Reply history
export interface ReplyHistory {
  id: string;
  emailId: string;
  ruleId: string;
  replyContent: string;
  sentAt: string;
  successful: boolean;
  errorMessage?: string;
}

// Settings
export interface Settings {
  notifyBeforeReply: boolean;
  notifyAfterReply: boolean;
  defaultReplyTone: 'professional' | 'friendly' | 'urgent';
  maxDailyReplies: number;
  enableCTAHandling: boolean;
  ctaHandlingPreference: 'accept' | 'forward' | 'escalate' | 'delay';
}