# notify-intent

**Intent-first notification system for modern web applications**

A lightweight, zero-configuration notification library that automatically infers intent from your message text and provides a clean API for both simple and promise-based notifications.

## Usage

```ts
import { notify } from 'notify-intent';

// Basic notification with automatic intent inference
notify("Payment failed");

// Explicit intent specification
notify("Custom message", { intent: "success" });

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

## React Integration (Required)

⚠️ **Important**: The `InAppProvider` is required for notifications to display in your React application.

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

## Available Intent Types

The library supports the following intent types:

- `info` - Informational messages (default)
- `success` - Success messages
- `warning` - Warning messages
- `error` - Error messages

## Intent Inference Rules

- Messages containing "error" or "fail" → `error`
- Messages containing "success" or "saved" → `success`
- Messages containing "warn" or "undo" → `warning`
- All other messages → `info`
