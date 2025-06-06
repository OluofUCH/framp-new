"use client";
import React from 'react';
import Navbar from "@/components/Navbar";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

export default RootLayout;
