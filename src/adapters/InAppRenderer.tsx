import React from 'react';
import { Notification } from '../core/types';
import '../styles/inApp.css';

interface InAppRendererProps {
  notifications: Notification[];
}

export function InAppRenderer({ notifications }: InAppRendererProps): JSX.Element {
  if (notifications.length === 0) {
    return null;
  }

  return (
    <div className="notify-intent-container">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`notify-intent-notification notify-intent-${notification.intent}`}
          role={notification.intent === 'error' ? 'alert' : 'status'}
          aria-live="polite"
        >
          {notification.message}
        </div>
      ))}
    </div>
  );
}
