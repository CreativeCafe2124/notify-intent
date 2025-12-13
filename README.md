# notify-intent

Describe what happened. We handle the notification.

## Usage

```ts
import { notify } from 'notify-intent';

// Basic notification
notify("Payment failed");

// Promise-based notification
notify.promise(saveUser(), {
  pending: "Saving user",
  success: "User saved",
  error: "Save failed"
});
```

## Installation

```bash
npm install notify-intent
```

## Features

- Intent-first notification system
- Automatic intent inference from message text
- Promise-based notifications with pending/success/error states
- React provider for in-app notifications
- No configuration required
- No backend dependencies
- Accessible by default (ARIA roles)
- Small and deterministic

## API

### `notify(message: string): string`

Shows a notification with automatic intent inference.

```ts
notify("Payment failed"); // Shows as error
notify("User saved");    // Shows as success
```

### `notify.promise<T>(promise: Promise<T>, messages: PromiseMessages): Promise<T>`

Shows notifications for promise states:

```ts
notify.promise(fetchData(), {
  pending: "Loading data",
  success: "Data loaded",
  error: "Failed to load data"
});
```

## React Integration

Wrap your app with the provider:

```tsx
import { InAppProvider } from 'notify-intent';

function App() {
  return (
    <InAppProvider>
      <YourApp />
    </InAppProvider>
  );
}
```

## Intent Inference Rules

- Messages containing "error" or "fail" → `error`
- Messages containing "success" or "saved" → `success`
- Messages containing "warn" or "undo" → `warning`
- All other messages → `info`
