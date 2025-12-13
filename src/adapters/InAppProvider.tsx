import React, { useState, useEffect, ReactNode } from 'react';
import { InAppRenderer } from './InAppRenderer';
import { intentStore } from '../store/intentStore';
import { Notification } from '../core/types';

export interface InAppProviderProps {
  children: ReactNode;
}

export function InAppProvider({ children }: InAppProviderProps) {
  const [notifications, setNotifications] = useState<Notification[]>(intentStore.get());

  useEffect(() => {
    const unsubscribe = intentStore.subscribe((updatedNotifications) => {
      setNotifications(updatedNotifications);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <>
      {children}
      <InAppRenderer notifications={notifications} />
    </>
  );
}
