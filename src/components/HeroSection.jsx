import { profile } from '../data/profile';
import './HeroSection.css';

// Initials fallback avatar when no photo is available
function AvatarFallback({ name }) {
  const initials = name
    .split(' ')
    .slice(0, 2)
    .map(n => n[0])
    .join('');
  return (
    <div className="avatar-fallback" aria-label={`${name} initials`}>
      {initials}
    </div>
  );
}

export default function HeroSection() {
  return (
    <section className="hero-section" aria-label="Profile Header">
      {/* Animated Background Banner */}
      <div className="hero-banner">
        {profile.cover
          ? <img src={profile.cover} alt="Cover" className="hero-cover-img" />
          : <div className="hero-cover-gradient" />
        }
        {/* Decorative floating orb animations */}
        <div className="orb orb-1" aria-hidden="true" />
        <div className="orb orb-2" aria-hidden="true" />
      </div>

      {/* Profile Avatar with glowing ring */}
      <div className="avatar-wrapper">
        <div className="avatar-glow-ring" aria-hidden="true" />
        {profile.avatar
          ? <img src={profile.avatar} alt={profile.name} className="avatar-img" />
          : <AvatarFallback name={profile.name} />
        }
      </div>

      {/* Identity Info */}
      <div className="hero-identity">
        <h1 className="hero-name">{profile.name}</h1>
        <p className="hero-pronouns">{profile.pronouns}</p>
        <p className="hero-title">{profile.title}</p>
        <p className="hero-company">{profile.company}</p>
        <span className="hero-tagline-badge">{profile.tagline}</span>
      </div>
    </section>
  );
}
