import { inferIntent } from './inferIntent';
import { intentStore } from '../store/intentStore';
import { IntentType, NotifyOptions, PromiseMessages, NotifyFn } from './types';

/* -----------------------------
   notify implementation
----------------------------- */

export const notify: NotifyFn = ((message: string, options?: NotifyOptions) => {
  const intent =
    options?.intent ?? inferIntent(message);

  return intentStore.add({
    message,
    intent
  });
}) as NotifyFn;

/* -----------------------------
   notify.promise implementation
----------------------------- */

notify.promise = async function <T>(
  promise: Promise<T>,
  messages: PromiseMessages
): Promise<T> {
  const id = notify(messages.pending, { intent: 'info' });

  try {
    const result = await promise;
    intentStore.update(id, {
      message: messages.success,
      intent: 'success'
    });
    return result;
  } catch (error) {
    intentStore.update(id, {
      message: messages.error,
      intent: 'error'
    });
    throw error;
  }
};
