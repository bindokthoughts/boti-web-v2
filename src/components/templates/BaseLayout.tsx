'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '../organisms/Navbar';
import Footer from '../organisms/Footer';

import MasterScene from '../organisms/MasterScene';
import CustomCursor from '../atoms/CustomCursor';
import Loader from '../organisms/loader/Loader';
import { AnimatePresence, motion } from 'framer-motion';

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

  return (
    <>
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
    </>
  );
};

export default BaseLayout;
