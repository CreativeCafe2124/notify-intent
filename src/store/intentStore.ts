import { Notification, IntentType } from '../core/types';

let notifications: Notification[] = [];
let subscribers: ((notifications: Notification[]) => void)[] = [];
let idCounter = 0;

function generateId(): string {
  return (idCounter++).toString();
}

function notifySubscribers(): void {
  subscribers.forEach(callback => callback(intentStore.get()));
}

export const intentStore = {
  add: (notification: Omit<Notification, 'id' | 'timestamp'>): string => {
    const id = generateId();
    const fullNotification: Notification = {
      ...notification,
      id,
      timestamp: Date.now()
    };
    notifications = [...notifications, fullNotification];
    notifySubscribers();
    return id;
  },

  update: (id: string, updates: Partial<Omit<Notification, 'id' | 'timestamp'>>): void => {
    notifications = notifications.map(notif =>
      notif.id === id ? { ...notif, ...updates, timestamp: Date.now() } : notif
    );
    notifySubscribers();
  },

  get: (): Notification[] => {
    return [...notifications];
  },

  subscribe: (callback: (notifications: Notification[]) => void): () => void => {
    subscribers = [...subscribers, callback];
    return () => {
      subscribers = subscribers.filter(sub => sub !== callback);
    };
  }
};
