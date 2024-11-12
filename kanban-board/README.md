
## Getting Started

First, install the dependencies:

```bash
npm install --legacy-peer-deps

Note: Use the --legacy-peer-deps flag due to compatibility issues between react-redux and the current React version.

Then, run the development server:

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Firebase Setup
Create a Firebase Project
Go to Firebase Console and create a new project.

Enable Email Authentication
Navigate to Authentication > Sign-in method in the Firebase Console and enable the Email/Password provider.

Set Up Environment Variables
Create a .env.local file in the root of the project and configure it as follows:

NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id

Set Firestore Security Rules
Use the following security rules to ensure only authenticated users can access the tasks:

rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /tasks/{taskId} {
      allow read, write: if request.auth != null;
    }
  }
}

Features
Task Management: Create, edit, delete, and update tasks.
Firebase Integration: Syncs tasks in real-time with Firestore.
Authentication: Protects routes to ensure only authenticated users can access the task board.
State Management: Uses Redux Toolkit with persisted state for tasks and user authentication.