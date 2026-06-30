'use client';

import React, { useState, useEffect, createContext, useContext } from 'react';
import Navbar from '../organisms/Navbar';
import Footer from '../organisms/Footer';

import MasterScene from '../organisms/MasterScene';
import CustomCursor from '../atoms/CustomCursor';
import Loader from '../organisms/loader/Loader';
import { AnimatePresence, motion } from 'framer-motion';

interface LoadingContextType {
  isLoading: boolean;
}

const LoadingContext = createContext<LoadingContextType>({ isLoading: true });

export const useLoading = () => useContext(LoadingContext);

const BaseLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAppLoaded, setIsAppLoaded] = useState(false);

  useEffect(() => {
    // Check if the document has already fully loaded
    const handleLoad = () => setIsAppLoaded(true);
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  useEffect(() => {
    if (isLoading) {
      // Disable scrolling while loading
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    } else {
      // Restore scrolling and force top of the page when loaded
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }

    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, [isLoading]);


  return (
    <LoadingContext.Provider value={{ isLoading }}>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="fixed inset-0 z-[9999]"
          >
            <Loader isLoaded={isAppLoaded} onComplete={() => setIsLoading(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      <CustomCursor />
      <MasterScene />
      <div id="root-layout" className="min-h-screen selection:bg-primary/20 selection:text-primary relative z-10">
        <Navbar />
        <main>{children}</main>

        <Footer />
      </div>
    </LoadingContext.Provider>
  );
};

export default BaseLayout;
