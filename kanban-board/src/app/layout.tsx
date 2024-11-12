"use client";
import "./globals.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "@/store/store";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        <Provider store={store}>
          <PersistGate loading={<p>Loading...</p>} persistor={persistor}>
          
            <main>{children}</main>
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
