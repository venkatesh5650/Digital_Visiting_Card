import { achievements } from '../data/profile';
import './AchievementsCarousel.css';

export default function AchievementsCarousel() {
  return (
    <section className="achievements-section" aria-label="Awards and Achievements">
      <h2 className="achievements-heading">Recognition & Awards</h2>
      <div className="achievements-track">
        {achievements.map(({ id, icon, title, description }) => (
          <div key={id} className="achievement-card" id={`achievement-${id}`}>
            <div className="achievement-icon" aria-hidden="true">{icon}</div>
            <div className="achievement-content">
              <p className="achievement-title">{title}</p>
              <p className="achievement-desc">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
