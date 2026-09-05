import type { ReactNode } from 'react';
import Footer from './Footer';
import GrainOverlay from './GrainOverlay';
import SiteHeader from './SiteHeader';

interface PageWrapperProps {
  children: ReactNode;
  className?: string;
}

export default function PageWrapper({ children, className = '' }: PageWrapperProps) {
  return (
    <div className={`site-page min-h-screen bg-charcoal ${className}`}>
      <GrainOverlay />
      <SiteHeader />
      <main id="main" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </div>
  );
}