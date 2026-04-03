import { motion, AnimatePresence } from 'framer-motion';
import QRCode from 'react-qr-code';
import { X, Share2, Copy, Check, Phone, Mail, Globe, MapPin } from 'lucide-react';
import { useState } from 'react';
import { profile, contacts } from '../data/profile';
import { generateVCardString } from '../utils/vcardGenerator';
import './QRModal.css';

const CARD_URL = 'https://computerport.in/vcard/ravikumar/';

const contactDetails = [
  { Icon: Phone,  label: contacts.phone,               href: contacts.phoneTel },
  { Icon: Mail,   label: contacts.email,               href: `mailto:${contacts.email}` },
  { Icon: Globe,  label: 'computerport.in',            href: contacts.website },
  { Icon: MapPin, label: 'Hyderabad, Telangana, India',href: contacts.location },
];

export default function QRModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(CARD_URL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch { /* silent */ }
  }

  async function handleShare() {
    if (navigator.share) {
      navigator.share({
        title: `${profile.name} | Digital Business Card`,
        text: 'Connect with me — Head Operations & Sales at Computer Port IT Solutions',
        url: CARD_URL,
      });
    } else {
      handleCopy();
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="qr-backdrop"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className="qr-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Share QR Code"
            initial={{ opacity: 0, scale: 0.85, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 50 }}
            transition={{ type: 'spring', stiffness: 280, damping: 24 }}
          >
            {/* Close */}
            <button className="qr-close-btn" onClick={onClose} aria-label="Close">
              <X size={18} strokeWidth={2.5} />
            </button>

            {/* Header */}
            <div className="qr-header">
              {/* Avatar */}
              <div className="qr-avatar">
                <span>RK</span>
              </div>
              <div className="qr-header-text">
                <p className="qr-eyebrow">Scan to Connect</p>
                <h2 className="qr-name">{profile.name}</h2>
                <p className="qr-title-role">{profile.title}</p>
                <p className="qr-company">{profile.company}</p>
              </div>
            </div>

            {/* Divider */}
            <div className="qr-divider" />

            {/* QR Code — large and prominent */}
            <div className="qr-code-wrapper">
              {/* Animated scanning line */}
              <div className="qr-scan-line" aria-hidden="true" />
              {/* Corner brackets */}
              <div className="qr-corner qr-corner-tl" />
              <div className="qr-corner qr-corner-tr" />
              <div className="qr-corner qr-corner-bl" />
              <div className="qr-corner qr-corner-br" />
              <div className="qr-code-inner">
                <QRCode
                  value={generateVCardString()}
                  size={190}
                  bgColor="#ffffff"
                  fgColor="#050a15"
                  level="M"
                />
              </div>
            </div>

            <p className="qr-hint">Point camera to scan • No app needed</p>

            {/* Company contact info */}
            <div className="qr-contacts">
              {contactDetails.map(({ Icon, label, href }) => (
                <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="qr-contact-item">
                  <Icon size={13} strokeWidth={2} />
                  <span>{label}</span>
                </a>
              ))}
            </div>

            {/* Action buttons */}
            <div className="qr-actions">
              <button id="qr-share-btn" className="qr-action-btn qr-action-btn--primary" onClick={handleShare}>
                <Share2 size={15} />
                Share Card
              </button>
              <button id="qr-copy-btn" className="qr-action-btn" onClick={handleCopy} aria-live="polite">
                {copied ? <Check size={15} /> : <Copy size={15} />}
                {copied ? 'Copied!' : 'Copy Link'}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
