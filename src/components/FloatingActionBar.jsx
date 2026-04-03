import { useState, useEffect } from 'react';
import { Phone, Mail, Download, QrCode } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './FloatingActionBar.css';

export default function FloatingActionBar({ onSaveContact, onShowQR }) {
  const [visible, setVisible] = useState(false);

  // Fade bar in after a short delay on load
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 600);
    return () => clearTimeout(t);
  }, []);

  const actions = [
    {
      id: 'fab-call',
      label: 'Call',
      Icon: Phone,
      href: 'tel:+919701161982',
      color: '#14b8a6',
      isLink: true,
    },
    {
      id: 'fab-email',
      label: 'Email',
      Icon: Mail,
      href: 'mailto:ravikumar@computerport.in',
      color: '#f59e0b',
      isLink: true,
    },
    {
      id: 'fab-save',
      label: 'Save',
      Icon: Download,
      color: '#6366f1',
      isLink: false,
      onClick: onSaveContact,
      primary: true,
    },
    {
      id: 'fab-qr',
      label: 'QR',
      Icon: QrCode,
      color: '#10b981',
      isLink: false,
      onClick: onShowQR,
    },
  ];

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          className="fab-bar"
          role="navigation"
          aria-label="Primary Actions"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 22, delay: 0.1 }}
        >
          <div className="fab-inner">
            {actions.map(({ id, label, Icon, href, color, isLink, onClick, primary }) => (
              <div key={id} className="fab-item">
                {isLink ? (
                  <motion.a
                    id={id}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="fab-btn"
                    aria-label={label}
                    style={{ '--fab-color': color }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="fab-icon"><Icon size={18} strokeWidth={2} /></span>
                    <span className="fab-label">{label}</span>
                  </motion.a>
                ) : (
                  <motion.button
                    id={id}
                    className={`fab-btn ${primary ? 'fab-btn--primary' : ''}`}
                    aria-label={label}
                    style={{ '--fab-color': color }}
                    onClick={onClick}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="fab-icon"><Icon size={18} strokeWidth={2} /></span>
                    <span className="fab-label">{label}</span>
                  </motion.button>
                )}
              </div>
            ))}
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
