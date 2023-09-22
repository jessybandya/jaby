"use client"

import Footer from '@components/Footer'
import './globals.css'
import Header from '@components/Header'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from 'react-redux';
import { store, persistor  } from '@redux/configureStore';
import { PersistGate } from 'redux-persist/integration/react'


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <Header />
      <ToastContainer />
      {children}
      <Footer />
      </PersistGate>
      </Provider>
      </body>
    </html>
  )
}
