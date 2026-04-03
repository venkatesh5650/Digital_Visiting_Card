import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { downloadVCard } from '../utils/vcardGenerator';
import './LeadCaptureModal.css';

export default function LeadCaptureModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAction = (e) => {
    e.preventDefault();
    // In a real app, API call to save lead here
    downloadVCard();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="lead-capture-backdrop" onClick={onClose}>
          <motion.div
            className="lead-capture-drawer"
            onClick={(e) => e.stopPropagation()}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className="lead-capture-header">
              <h2 className="lead-capture-title">Connect with Ravi</h2>
              <p className="lead-capture-subtitle">Share your details before downloading the contact.</p>
            </div>

            <form className="lead-capture-form" onSubmit={handleAction}>
              <div className="input-group">
                <label htmlFor="lead-name">Full Name</label>
                <input
                  type="text"
                  id="lead-name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Jane Doe"
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="lead-email">Email Address</label>
                <input
                  type="email"
                  id="lead-email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="jane@example.com"
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="lead-phone">Phone Number</label>
                <input
                  type="tel"
                  id="lead-phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
                />
              </div>

              <div className="lead-capture-actions">
                <button type="submit" className="btn-submit">
                  Share & Download
                </button>
                <button type="button" className="btn-skip" onClick={handleAction}>
                  Skip and Download
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
