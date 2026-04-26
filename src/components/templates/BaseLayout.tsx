'use client';

import React from 'react';
import Navbar from '../organisms/Navbar';
import Footer from '../organisms/Footer';
import Contact from '../organisms/Contact';
import MasterScene from '../organisms/MasterScene';
import CustomCursor from '../atoms/CustomCursor';

const BaseLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <CustomCursor />
      <MasterScene />
      <div id="root-layout" className="min-h-screen selection:bg-primary/20 selection:text-primary relative z-10">
        <Navbar />
        <main>{children}</main>
        <Contact />
        <Footer />
      </div>
    </>
  );
};

export default BaseLayout;
