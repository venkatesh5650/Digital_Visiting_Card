import { useRef, useState, useEffect, useCallback } from 'react';
import { media } from '../data/profile';
import { Download, CalendarDays, Play, Pause, RotateCcw, RotateCw, Volume2, VolumeX } from 'lucide-react';
import './MediaHub.css';

function formatTime(seconds) {
  if (isNaN(seconds)) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function VideoCard({ item }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [muted, setMuted] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);
  const hideTimer = useRef(null);

  const showControls = useCallback(() => {
    setControlsVisible(true);
    clearTimeout(hideTimer.current);
    if (playing) {
      hideTimer.current = setTimeout(() => setControlsVisible(false), 2800);
    }
  }, [playing]);

  useEffect(() => () => clearTimeout(hideTimer.current), []);

  function togglePlay() {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
      setControlsVisible(true);
    } else {
      videoRef.current.play();
      hideTimer.current = setTimeout(() => setControlsVisible(false), 2800);
    }
    setPlaying(!playing);
  }

  function seek(e) {
    if (!videoRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = ratio * duration;
    setCurrentTime(ratio * duration);
  }

  function skip(seconds) {
    if (!videoRef.current) return;
    videoRef.current.currentTime = Math.min(
      Math.max(0, videoRef.current.currentTime + seconds),
      duration
    );
  }

  function toggleMute() {
    if (!videoRef.current) return;
    videoRef.current.muted = !muted;
    setMuted(!muted);
  }

  const progress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div
      className="media-card media-card--video"
      id={`media-${item.id}`}
      onMouseMove={showControls}
      onTouchStart={showControls}
    >
      <div className="video-wrapper" onClick={togglePlay}>
        <video
          ref={videoRef}
          src={item.src}
          className="video-el"
          preload="metadata"
          playsInline
          muted={muted}
          onTimeUpdate={() => setCurrentTime(videoRef.current?.currentTime ?? 0)}
          onLoadedMetadata={() => setDuration(videoRef.current?.duration ?? 0)}
          onEnded={() => { setPlaying(false); setControlsVisible(true); }}
        />

        {/* Big centered play icon when paused */}
        {!playing && (
          <div className="play-center-icon" aria-hidden="true">
            <Play size={40} strokeWidth={1.5} />
          </div>
        )}
      </div>

      {/* Controls bar — fades when playing */}
      <div className={`video-controls ${controlsVisible ? 'video-controls--visible' : ''}`}>
        {/* Progress / Seek bar */}
        <div className="seek-bar-track" role="slider" aria-label="Seek" onClick={seek}>
          <div className="seek-bar-fill" style={{ width: `${progress}%` }} />
          <div className="seek-bar-thumb" style={{ left: `${progress}%` }} />
        </div>

        <div className="controls-row">
          {/* Time */}
          <span className="video-time">{formatTime(currentTime)} / {formatTime(duration)}</span>

          {/* Centre: rewind | play/pause | forward */}
          <div className="controls-centre">
            <button className="ctrl-btn" onClick={() => skip(-10)} aria-label="Rewind 10s">
              <RotateCcw size={17} strokeWidth={2} />
              <span className="ctrl-skip-label">10</span>
            </button>
            <button className="ctrl-btn ctrl-btn--play" onClick={togglePlay} aria-label={playing ? 'Pause' : 'Play'}>
              {playing ? <Pause size={20} strokeWidth={2} /> : <Play size={20} strokeWidth={2} />}
            </button>
            <button className="ctrl-btn" onClick={() => skip(10)} aria-label="Forward 10s">
              <RotateCw size={17} strokeWidth={2} />
              <span className="ctrl-skip-label">10</span>
            </button>
          </div>

          {/* Mute */}
          <button className="ctrl-btn ctrl-btn--mute" onClick={toggleMute} aria-label={muted ? 'Unmute' : 'Mute'}>
            {muted ? <VolumeX size={17} strokeWidth={2} /> : <Volume2 size={17} strokeWidth={2} />}
          </button>
        </div>
      </div>

      <div className="media-card-info">
        <p className="media-card-title">{item.title}</p>
        <p className="media-card-sub">{item.subtitle}</p>
      </div>
    </div>
  );
}

function DownloadCard({ item }) {
  const Icon = item.type === 'booking' ? CalendarDays : Download;
  return (
    <a
      href={item.downloadUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="media-card media-card--download"
      id={`media-${item.id}`}
      aria-label={item.title}
    >
      {item.thumbnail && (
        <div className="media-thumbnail-wrap">
          <img src={item.thumbnail} alt={item.title} className="media-thumbnail" />
          <div className="media-thumbnail-overlay" />
        </div>
      )}
      <div className="media-card-info">
        <p className="media-card-title">{item.title}</p>
        <p className="media-card-sub">{item.subtitle}</p>
        <span className="media-cta-badge">
          <Icon size={13} />
          {item.cta}
        </span>
      </div>
    </a>
  );
}

export default function MediaHub() {
  return (
    <section className="media-hub-section" aria-label="Products and Media">
      <h2 className="media-hub-heading">Products & Media</h2>
      <div className="media-hub-grid">
        {media.map((item) =>
          item.type === 'video'
            ? <VideoCard key={item.id} item={item} />
            : <DownloadCard key={item.id} item={item} />
        )}
      </div>
    </section>
  );
}
