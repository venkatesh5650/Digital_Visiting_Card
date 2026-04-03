import { contacts } from '../data/profile';
import './QuickActions.css';

// Import Lucide icons
import {
  Phone,
  MessageSquare,
  Mail,
  Globe,
  MapPin,
  CalendarDays,
} from 'lucide-react';

const actions = [
  { id: 'phone',    label: 'Call',     href: contacts.phoneTel,  Icon: Phone,         color: '#14b8a6' },
  { id: 'sms',      label: 'SMS',      href: contacts.sms,       Icon: MessageSquare, color: '#6366f1' },
  { id: 'email',    label: 'Email',    href: `mailto:${contacts.email}`,  Icon: Mail,  color: '#f59e0b' },
  { id: 'website',  label: 'Website',  href: contacts.website,   Icon: Globe,         color: '#3b82f6' },
  { id: 'location', label: 'Location', href: contacts.location,  Icon: MapPin,        color: '#ef4444' },
  { id: 'calendar', label: 'Book',     href: contacts.calendar,  Icon: CalendarDays,  color: '#10b981' },
];

export default function QuickActions() {
  return (
    <section className="quick-actions-section" aria-label="Quick Contact Actions">
      <div className="quick-actions-grid">
        {actions.map(({ id, label, href, Icon, color }) => (
          <a
            key={id}
            id={`quick-action-${id}`}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="quick-action-btn"
            aria-label={label}
          >
            <div className="quick-action-icon" style={{ '--btn-color': color }}>
              <Icon size={22} strokeWidth={1.8} />
            </div>
            <span className="quick-action-label">{label}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
