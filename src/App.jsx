import { useState } from 'react';
import './index.css';

// Step 2: Core Layout Components
import HeroSection from './components/HeroSection';
import QuickActions from './components/QuickActions';
import SocialDock from './components/SocialDock';
import AchievementsCarousel from './components/AchievementsCarousel';

// Step 3: Mind-Blowing Interactive Features
import FloatingActionBar from './components/FloatingActionBar';
import MediaHub from './components/MediaHub';
import QRModal from './components/QRModal';

// Step 4: Lead Capture
import LeadCaptureModal from './components/LeadCaptureModal';

function App() {
  const [showQR, setShowQR] = useState(false);
  const [showLeadCapture, setShowLeadCapture] = useState(false);

  function handleSaveContact() {
    setShowLeadCapture(true);
  }

  return (
    <main id="vcard-root" aria-label="Ravi Kumar Tenneti Digital Business Card">
      {/* ---- Step 2: Core Visual Hierarchy ---- */}
      <HeroSection />
      <QuickActions />
      <SocialDock />
      <AchievementsCarousel />

      {/* ---- Step 3: Embedded Media Hub ---- */}
      <MediaHub />

      {/* Bottom spacer so content isn't hidden behind FAB */}
      <div style={{ height: '6rem' }} aria-hidden="true" />

      {/* ---- Step 3: Sticky Floating Action Bar ---- */}
      <FloatingActionBar
        onSaveContact={handleSaveContact}
        onShowQR={() => setShowQR(true)}
      />

      {/* ---- Step 3: Dynamic QR Code Modal ---- */}
      <QRModal isOpen={showQR} onClose={() => setShowQR(false)} />

      {/* ---- Step 4: Lead Capture Modal ---- */}
      <LeadCaptureModal isOpen={showLeadCapture} onClose={() => setShowLeadCapture(false)} />
    </main>
  );
}

export default App;
