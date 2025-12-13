import { IntentType } from './types';

export function inferIntent(message: string): IntentType {
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes('error') || lowerMessage.includes('fail')) {
    return 'error';
  }

  if (lowerMessage.includes('success') || lowerMessage.includes('saved')) {
    return 'success';
  }

  if (lowerMessage.includes('warn') || lowerMessage.includes('undo')) {
    return 'warning';
  }

  return 'info';
}
