export type IntentType = 'info' | 'success' | 'warning' | 'error';

export interface Notification {
  id: string;
  message: string;
  intent: IntentType;
  timestamp: number;
}

export interface PromiseMessages {
  pending: string;
  success: string;
  error: string;
}

export interface NotifyOptions {
  variant?: IntentType;
}

export type NotifyFn = {
  (message: string, options?: NotifyOptions): string;

  promise<T>(
    promise: Promise<T>,
    messages: PromiseMessages
  ): Promise<T>;
};
